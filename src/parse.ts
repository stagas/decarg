import { OptionExpectedValueError, OptionHelpRequested } from './errors'
import { Options } from './options'
import { isDefault, isLong, split, strip } from './util'

/**
 * Process an options object and throw errors so that they can be
 * managed manually.
 *
 * @param target The decorated options object.
 * @param argv Arguments values.
 * @throws An AggregateError with {@link OptionValidationError} when there are multiple errors
 *  or an {@link OptionHelpRequested} error.
 *  The `.message` property can be printed and is the same as the managed version {@link decarg}.
 * @returns The populated options object when successful, otherwise throws.
 */

export const parse = <T>(target: T, argv = process.argv.slice(1)) => {
  const [[exec, ...args], rest] = split('--', argv)

  const options = new Options(target, exec)

  if (rest) options.find('--')?.set(...rest)

  if (args.includes('-h') || args.includes('--help')) {
    throw new OptionHelpRequested(options)
  }

  const errors: Error[] = []

  for (let i = 0; i < args.length; i++) {
    try {
      const arg = args[i]

      if (isDefault(arg)) {
        options.default?.set(arg)
        continue
      }

      const [name, value] = split('=', strip(arg)) as [string, string]

      // --long
      if (isLong(arg)) {
        const opt = options.find(name)
        if (!opt) continue
        if (opt.arg.type === Boolean) opt.set(value ?? true)
        else opt.set(value ?? args[++i])
        continue
      }

      // shorts -cFg
      const shorts = name.split('')

      // when there is -cFg=value try to set g=value and eat 'g'
      if (value != null) {
        options.find(shorts.pop())?.set(value)
      }

      // iterate rest of the shorts
      for (const short of shorts) {
        const opt = options.find(short)
        if (!opt) continue
        if (opt.arg.type === Boolean) opt.set(true)
        else opt.set(args[++i])
      }
    } catch (error) {
      errors.push(error as Error)
    }
  }

  for (const arg of options.options) {
    if (target[arg.arg.property as keyof T] == null) {
      errors.push(new OptionExpectedValueError(arg))
    }
  }

  if (errors.length) {
    throw new AggregateError(errors, options.help())
  }

  return target
}
