import { parse } from './parse'

export { arg } from './arg'
export * from './errors'
export { parse }

/**
 * Process an options object and handle errors.
 *
 * @param target The decorated options object.
 * @param argv Arguments values.
 * @param overrides
 * @param overrides.exit The exit function to use.
 * @param overrides.log The log function to use.
 * @returns The populated options object when successful, otherwise prints help and exits.
 */
export const decarg = <T>(
  target: T,
  argv = process.argv.slice(1),
  { exit = process.exit, log = console.error } = {},
) => {
  try {
    return parse(target, argv)
  } catch (error) {
    const e = error as AggregateError
    if (e.errors) log('\x1b[31m' + e.errors.map(e => e.message).join('\n\n'), '\x1b[0m\n')
    log(e.message)
    exit(1)
  }
}
