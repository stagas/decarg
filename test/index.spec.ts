/* eslint-disable @typescript-eslint/no-explicit-any */
import { arg, decarg, parse } from '../src'

describe('parse()', () => {
  it('empty', () => {
    class Options {}
    const opts = parse(new Options(), [])
    expect(opts).toEqual({})
  })

  it('infer process.argv', () => {
    class Options {}
    const opts = parse(new Options())
    expect(opts).toEqual({})
  })

  it('only exec', () => {
    class Options {}
    const opts = parse(new Options(), ['exec'])
    expect(opts).toEqual({})
  })

  it('-f --flag: pass none', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false
    }
    const opts = parse(new Options(), ['exec'])
    expect(opts).toEqual({ flag: false })
  })

  it('-f --flag: -f', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false
    }
    const opts = parse(new Options(), ['exec', '-f'])
    expect(opts).toEqual({ flag: true })
  })

  it('-f --flag: --flag', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false
    }
    const opts = parse(new Options(), ['exec', '--flag'])
    expect(opts).toEqual({ flag: true })
  })

  it('-f --flag: --flag=true', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false
    }
    const opts = parse(new Options(), ['exec', '--flag=true'])
    expect(opts).toEqual({ flag: true })
  })

  it('-f --flag: --flag=false', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false
    }
    const opts = parse(new Options(), ['exec', '--flag=false'])
    expect(opts).toEqual({ flag: false })
  })

  it('-f --flag: --flag=xxx', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false
    }
    const opts = parse(new Options(), ['exec', '--flag=xxx'])
    expect(opts).toEqual({ flag: false })
  })

  it('-f --flag: --flag=', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = true
    }
    const opts = parse(new Options(), ['exec', '--flag='])
    expect(opts).toEqual({ flag: false })
  })

  it('-f --flag no default', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag!: boolean
    }
    let error: AggregateError
    try {
      parse(new Options(), ['exec'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Expected value for "flag".')
    expect(output).toContain('--flag')
  })

  it('-f --flag no default: -f', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag!: boolean
    }
    const opts = parse(new Options(), ['exec', '-f'])
    expect(opts).toEqual({ flag: true })
  })

  it('-f --flag no default: -f=', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag!: boolean
    }
    const opts = parse(new Options(), ['exec', '-f='])
    expect(opts).toEqual({ flag: false })
  })

  it('-f --flag no default: -f=false', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag!: boolean
    }
    const opts = parse(new Options(), ['exec', '-f=false'])
    expect(opts).toEqual({ flag: false })
  })

  it('-fGk: -fGk', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false

      @arg('-G', '--Great', 'Great')
      great = false

      @arg('-k', '--Kay', 'Kay')
      kay = true
    }
    const opts = parse(new Options(), ['exec', '-fGk'])
    expect(opts).toEqual({ flag: true, great: true, kay: true })
  })

  it('-fGk: -fGk=hello', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false

      @arg('-G', '--Great', 'Great')
      great = false

      @arg('-k', '--Kay', 'Kay')
      kay!: string
    }
    const opts = parse(new Options(), ['exec', '-fGk=hello'])
    expect(opts).toEqual({ flag: true, great: true, kay: 'hello' })
  })

  it('-fGk: -fGk hello', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false

      @arg('-G', '--Great', 'Great')
      great = false

      @arg('-k', '--Kay', 'Kay')
      kay!: string
    }
    const opts = parse(new Options(), ['exec', '-fGk', 'hello'])
    expect(opts).toEqual({ flag: true, great: true, kay: 'hello' })
  })

  it('-fGk: -fGk (none)', () => {
    class Options {
      @arg('-f', '--flag', 'Something')
      flag = false

      @arg('-G', '--Great', 'Great')
      great = false

      @arg('-k', '--Kay', 'Kay')
      kay!: string
    }

    let error: AggregateError
    try {
      parse(new Options(), ['exec', '-fGk'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Expected value for "Kay".')
    expect(output).toContain('--Kay')
  })

  it('--flag: --flag', () => {
    class Options {
      @arg('--flag', 'Something')
      flag = false
    }
    const opts = parse(new Options(), ['exec', '--flag'])
    expect(opts).toEqual({ flag: true })
  })

  it('-n, --number: --number', () => {
    class Options {
      @arg('-n', '--number', 'Number')
      number!: number
    }
    let error: AggregateError
    try {
      parse(new Options(), ['exec', '--number'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Expected value for "number".')
    expect(output).toContain('--number')
  })

  it('-n, --number: --number=42', () => {
    class Options {
      @arg('-n', '--number', 'Number')
      number!: number
    }
    const opts = parse(new Options(), ['exec', '--number=42'])
    expect(opts).toEqual({ number: 42 })
  })

  it('-n, --number: --number=invalid', () => {
    class Options {
      @arg('-n', '--number', 'Number')
      number!: number
    }
    let error: AggregateError
    try {
      parse(new Options(), ['exec', '--number=invalid'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Invalid value for "number": "invalid"')
    expect(output).toContain('--number')
  })

  it('-x non existant', () => {
    class Options {
      @arg('-n', '--number', 'Number')
      number = 42
    }
    const opts = parse(new Options(), ['exec', '-x'])
    expect(opts).toEqual({ number: 42 })
  })

  it('-x=value non existant', () => {
    class Options {
      @arg('-n', '--number', 'Number')
      number = 42
    }
    const opts = parse(new Options(), ['exec', '-x=value'])
    expect(opts).toEqual({ number: 42 })
  })

  it('-x value non existant', () => {
    class Options {
      @arg('-n', '--number', 'Number')
      number = 42
    }
    const opts = parse(new Options(), ['exec', '-x', 'value'])
    expect(opts).toEqual({ number: 42 })
  })

  it('-n, --number: --number 42', () => {
    class Options {
      @arg('-n', '--number', 'Number')
      number!: number
    }
    const opts = parse(new Options(), ['exec', '--number', '42'])
    expect(opts).toEqual({ number: 42 })
  })

  it('-s, --string: --string', () => {
    class Options {
      @arg('-s', '--string', 'Something')
      string = 'xxx'
    }
    let error: AggregateError
    try {
      parse(new Options(), ['exec', '--string'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Expected value for "string".')
    expect(output).toContain('--string')
  })

  it('-s: only short', () => {
    class Options {
      @arg('-s', 'Something')
      string = 'xxx'
    }
    let error: AggregateError
    try {
      parse(new Options(), ['exec', '-s'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Expected value for "s".')
    expect(output).toContain('-s')
  })

  it('-s, --string: --string=foo', () => {
    class Options {
      @arg('-s', '--string', 'Something')
      string = ''
    }
    const opts = parse(new Options(), ['exec', '--string=foo'])
    expect(opts).toEqual({ string: 'foo' })
  })

  it('-s, --string: --string=foo bar', () => {
    class Options {
      @arg('-s', '--string', 'Something')
      string = ''
    }
    const opts = parse(new Options(), ['exec', '--string=foo bar'])
    expect(opts).toEqual({ string: 'foo bar' })
  })

  it('-s, --string: -s=foo bar', () => {
    class Options {
      @arg('-s', '--string', 'Something')
      string = ''
    }
    const opts = parse(new Options(), ['exec', '-s=foo bar'])
    expect(opts).toEqual({ string: 'foo bar' })
  })

  it('-s, --string: -s=', () => {
    class Options {
      @arg('-s', '--string', 'Something')
      string = 'xxx'
    }
    const opts = parse(new Options(), ['exec', '-s='])
    expect(opts).toEqual({ string: '' })
  })

  it('--string: --string=', () => {
    class Options {
      @arg('--string', 'Something')
      string = 'xxx'
    }
    const opts = parse(new Options(), ['exec', '--string='])
    expect(opts).toEqual({ string: '' })
  })

  it('--string: --string=foo', () => {
    class Options {
      @arg('--string', 'Something')
      string = 'xxx'
    }
    const opts = parse(new Options(), ['exec', '--string=foo'])
    expect(opts).toEqual({ string: 'foo' })
  })

  it('--string: --string=foo bar', () => {
    class Options {
      @arg('--string', 'Something')
      string = 'xxx'
    }
    const opts = parse(new Options(), ['exec', '--string=foo bar'])
    expect(opts).toEqual({ string: 'foo bar' })
  })

  it('--string[]: --string=foo --string=bar', () => {
    class Options {
      @arg('--string', 'Something')
      string: string[] = []
    }
    const opts = parse(new Options(), ['exec', '--string=foo', '--string=bar'])
    expect(opts).toEqual({ string: ['foo', 'bar'] })
  })

  it('--string[]: --string=foo --string=bar non-initialized', () => {
    class Options {
      @arg('--string', 'Something')
      string!: string[]
    }
    const opts = parse(new Options(), ['exec', '--string=foo', '--string=bar'])
    expect(opts).toEqual({ string: ['foo', 'bar'] })
  })

  it('-c, --choices: --choices', () => {
    class Options {
      @arg('-c', '--choices', 'Something', ['one', 'two'])
      choices = 'xxx'
    }
    let error: AggregateError
    try {
      parse(new Options(), ['exec', '--choices'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Expected value for "choices"')
    expect(output).toContain('[one,two]')
  })

  it('-c, --choices: invalid', () => {
    class Options {
      @arg('-c', '--choices', 'Something', ['one', 'two'])
      choices = 'xxx'
    }
    let error: AggregateError
    try {
      parse(new Options(), ['exec', '--choices=three'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Invalid value for "choices"')
    expect(output).toContain('[one,two]')
  })

  it('just text', () => {
    class Options {
      @arg('Something')
      arg = ''
    }
    const opts = parse(new Options(), ['exec', 'foo'])
    expect(opts).toEqual({ arg: 'foo' })
  })

  it('<arg>: foo', () => {
    class Options {
      @arg('<arg>', 'Something')
      arg = ''
    }
    const opts = parse(new Options(), ['exec', 'foo'])
    expect(opts).toEqual({ arg: 'foo' })
  })

  it('<arg>: required', () => {
    class Options {
      @arg('<arg>', 'Something')
      arg!: string
    }
    let error: AggregateError
    try {
      parse(new Options(), ['exec'])
    } catch (e) {
      error = e as AggregateError
    }
    const output = error!.errors[0].message
    expect(output).toContain('Expected value for "arg"')
  })

  it('<arg>: foo bar', () => {
    class Options {
      @arg('<arg>', 'Something')
      arg = ''
    }
    const opts = parse(new Options(), ['exec', 'foo', 'bar'])
    expect(opts).toEqual({ arg: 'bar' })
  })

  it('<arg[]>: (none)', () => {
    class Options {
      @arg('<arg>', 'Something')
      arg = []
    }
    const opts = parse(new Options(), ['exec'])
    expect(opts).toEqual({ arg: [] })
  })

  it('<arg[]>: foo', () => {
    class Options {
      @arg('<arg>', 'Something')
      arg = []
    }
    const opts = parse(new Options(), ['exec', 'foo'])
    expect(opts).toEqual({ arg: ['foo'] })
  })

  it('<arg[def]>: foo', () => {
    class Options {
      @arg('<arg>', 'Something')
      arg = ['def']
    }
    const opts = parse(new Options(), ['exec', 'foo'])
    expect(opts).toEqual({ arg: ['def', 'foo'] })
  })

  it('<arg[]>: foo bar', () => {
    class Options {
      @arg('<arg>', 'Something')
      arg = []
    }
    const opts = parse(new Options(), ['exec', 'foo', 'bar'])
    expect(opts).toEqual({ arg: ['foo', 'bar'] })
  })

  it('-- rest non existant', () => {
    class Options {}
    const opts = parse(new Options(), ['exec', 'foo', '--', 'bar'])
    expect(opts).toEqual({})
  })

  it('-- rest non existant should be ignored', () => {
    class Options {
      @arg('<foo>', 'Foo')
      foo = []
    }
    const opts = parse(new Options(), ['exec', 'foo', '--', 'bar'])
    expect(opts).toEqual({ foo: ['foo'] })
  })

  it('--: rest foo -- bar', () => {
    class Options {
      @arg('--', 'Rest')
      rest = []
    }
    const opts = parse(new Options(), ['exec', 'foo', '--', 'bar'])
    expect(opts).toEqual({ rest: ['bar'] })
  })

  it('--: rest foo --', () => {
    class Options {
      @arg('--', 'Rest')
      rest = []
    }
    const opts = parse(new Options(), ['exec', 'foo', '--'])
    expect(opts).toEqual({ rest: [] })
  })

  it('--: rest -- foo', () => {
    class Options {
      @arg('--', 'Rest')
      rest = []
    }
    const opts = parse(new Options(), ['exec', '--', 'foo'])
    expect(opts).toEqual({ rest: ['foo'] })
  })

  it('-h', () => {
    class Options {}
    expect(() => {
      parse(new Options(), ['exec', '-h'])
    }).toThrow('Usage')
  })

  it('--help', () => {
    class Options {}
    expect(() => {
      parse(new Options(), ['exec', '--help'])
    }).toThrow('Usage')
  })

  it('--help output', () => {
    class Options {
      @arg('<file>', 'Filename')
      file = ''

      @arg('-f', '--flag', 'A flag')
      flag = false

      @arg('-e', '--choices', 'Something', ['one', 'two'])
      choices = 'xxx'

      @arg('--long-choices', 'Long choices', ['blue', 'yellow'])
      longchoices = 'xxx'

      @arg('--long', 'Long')
      long = false

      @arg('--string', 'String')
      string = ''

      @arg('--', '[rest]', 'Rest parameters')
      rest = []
    }
    let error: Error
    try {
      parse(new Options(), ['exec', '-h'])
    } catch (e) {
      error = e as Error
    }
    const output = error!.message
    expect(output).toContain('Usage')
    expect(output).toContain('-f, --flag')
    expect(output).toContain('A flag')
    expect(output).toContain('-e, --choices')
    expect(output).toContain('Something')
    expect(output).toContain('--long-choices')
    expect(output).toContain('Long choices')
    expect(output).toContain('[blue,yellow]')
    expect(output).toContain('-- [rest]')
    expect(output).toContain('Rest parameters')
    expect(output).toContain('--long')
    expect(output).toContain('Long')
    expect(output).toContain('--string=...')
    expect(output).toContain('String')
    expect(output).toContain('<file>')
    expect(output).toContain('Filename')
  })

  it('--help examples', () => {
    class Options {
      @arg('-f', '--flag', 'A flag')
      flag = false

      static examples = {
        one: 'One example',
        '-f two': 'Two example',
        'pipe | $ > something': 'Pipe stdin',
      }
    }
    let error: Error
    try {
      parse(new Options(), ['exec', '-h'])
    } catch (e) {
      error = e as Error
    }
    const output = error!.message
    expect(output).toContain('exec one')
    expect(output).toContain('One example')
    expect(output).toContain('exec -f two')
    expect(output).toContain('Two example')
    expect(output).toContain('pipe | exec > something')
  })

  it('ignores non decorated args', () => {
    class Options {
      @arg('-i', 'Include me')
      include = true

      ignore = 'me'
    }
    let error: Error
    try {
      parse(new Options(), ['exec', '-h'])
    } catch (e) {
      error = e as Error
    }
    const output = error!.message
    expect(output).toContain('Include me')
    expect(output).not.toContain('ignore')
  })
})

describe('decarg(options)', () => {
  it('uses process.argv', () => {
    class Options {
      @arg('-s', 'Something')
      string = ''
    }
    process.argv = ['', 'exec', '-s=foo']
    const opts = decarg(new Options())
    expect(opts).toEqual({
      string: 'foo',
    })
  })

  it('returns the options when successful', () => {
    class Options {
      @arg('-s', 'Something')
      string = ''
    }
    const opts = decarg(new Options(), ['exec', '-s=foo'])
    expect(opts).toEqual({
      string: 'foo',
    })
  })

  it('logs and exits on help', () => {
    class Options {
      @arg('-s', 'Something')
      string = ''
    }
    let out = ''
    const log = (s: string) => (out += s)
    const exit = jest.fn() as any
    decarg(new Options(), ['exec', '-h'], { exit, log })
    expect(out).toContain('Usage')
    expect(exit).toHaveBeenCalledWith(1)
  })

  it('logs error and exits on error', () => {
    class Options {
      @arg('-s', 'Something')
      string = ''
    }
    let out = ''
    const log = (s: string) => (out += s)
    const exit = jest.fn() as any
    decarg(new Options(), ['exec', '-s'], { exit, log })
    expect(out).toContain('Usage')
    expect(out).toContain('Expected value')
    expect(exit).toHaveBeenCalledWith(1)
  })
})
