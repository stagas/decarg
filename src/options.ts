import {
  OptionValidationError,
  OptionExpectedValueError,
  OptionInvalidValueError,
} from './errors'
import * as path from 'path'
import { strip, isLong } from './util'
import { getArg, Arg } from './arg'

// help text spacings
const left = 5
const middle = 22

export class Option<T> {
  arg: Arg<T>

  long?: string
  short?: string
  choices?: string[]
  rest?: string
  default?: string

  text?: string

  constructor(arg: Arg<T>) {
    this.arg = arg

    const desc = arg.description.slice() as string[]

    if (Array.isArray(desc.at(-1)))
      this.choices = desc.pop()! as unknown as string[]

    for (let i = 0; i < desc.length; i++) {
      const value = desc[i]

      if (value === '--') {
        this.rest = desc[++i]
        this.text = desc[++i]
      } else if (isLong(value)) {
        this.long = strip(value)
        this.text = desc[++i]
      } else if (value[0] === '-') {
        this.short = strip(value)
      } else if (!this.short && !this.long && !this.rest) {
        this.default = value
        this.text = desc[++i]
      } else {
        this.text = value
      }
    }
  }

  get id() {
    return this.long ?? this.short ?? this.arg.property
  }

  get help() {
    return this.default
      ? this.default.padStart(left + middle) + '  ' + this.text
      : this.rest
      ? `-- ${this.rest}`.padStart(left + middle) + '  ' + this.text
      : `${this.short ? '-' + this.short : ''}`.padStart(left) +
        (
          (this.long ? (this.short ? ', ' : '  ') + '--' + this.long : '') +
          (this.arg.type === Boolean
            ? ''
            : this.arg.type === Number
            ? '=n'
            : '=...')
        ).padEnd(middle) +
        '  ' +
        this.text +
        (this.choices ? ' [' + this.choices.join(',') + ']' : '')
  }

  set(...values: (string | boolean)[]) {
    const arg = this.arg
    const target = this.arg.target as Record<string, unknown>
    const prop = this.arg.property
    const value = values[0]

    // best effort to set value with correct type
    if (arg.type === Array) {
      target[prop] ??= []
      ;(target[prop] as string[]).push(...(values as string[]))
    } else if (arg.type === Boolean) {
      if (typeof value === 'boolean') target[prop] = value
      else if (value === 'true') target[prop] = true
      else target[prop] = false
    } else if (value == null) {
      throw new OptionExpectedValueError(this)
    } else if (arg.type === String) {
      if (this.choices && !this.choices.includes(value as string))
        throw new OptionInvalidValueError(this, value)
      target[prop] = value
    } else if (arg.type === Number) {
      const number = parseFloat(value as string)
      if (isNaN(number)) throw new OptionInvalidValueError(this, value)
      target[prop] = parseFloat(value as string)
    }
  }
}

export class Options<T> {
  target: T & { examples: Record<string, string> }
  exec: string
  map: Map<string, Option<T>>
  options: Option<T>[]
  default?: Option<T>
  rest?: Option<T>
  errors: OptionValidationError[] = []

  constructor(target: T, exec: string) {
    this.target = target as T & { examples: Record<string, string> }
    this.exec = path.basename(exec ?? '(command)')

    // gather decorated props from options object
    this.options = [
      ...new Set([
        ...Object.keys(target),
        ...Object.keys(Object.getPrototypeOf(target)),
      ]),
    ]
      .map(property => getArg(target, property))
      .filter(Boolean)
      .map(arg => new Option<T>(arg as Arg<T>))

    this.map = new Map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.options
        .map(option =>
          [option.short, option.long, option.rest && '--']
            .filter(Boolean)
            .map(key => [key, option]),
        )
        .flat(),
    )

    this.default = this.options.find(option => option.default)
    this.rest = this.options.find(option => option.rest)
  }

  get examples() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.target.constructor.examples
  }

  // finds an argument in props
  find(arg?: string) {
    return this.map.get(arg!)
  }

  help() {
    const out = []

    out.push(
      `\x1b[1mUsage:\x1b[0m ${this.exec} ${[
        this.options.length && '[options]',
        this.default?.default,
        this.find('--')?.rest && '-- ' + this.find('--')!.rest,
      ]
        .filter(Boolean)
        .join(' ')}`,
      '',
    )

    if (this.default) out.push(this.default.help)
    if (this.rest) out.push(this.rest.help)

    if (this.default || this.rest) out.push('')

    for (const opt of this.options)
      if (!opt.default && !opt.rest) out.push(opt.help)
    if (this.options.length) out.push('')

    if (this.examples) {
      out.push('\x1b[1mExamples:\x1b[0m')
      for (const cmd in this.examples) {
        out.push('\x1b[90m  # ' + this.examples[cmd] + '\x1b[0m')
        out.push(
          '  ' +
            (cmd.includes('$')
              ? cmd.replace('$', this.exec)
              : this.exec + ' ' + cmd),
          '',
        )
      }
    }

    return out.join('\n')
  }
}
