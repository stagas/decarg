import { Option, Options } from './options'

/**
 * OptionValidationError.
 *
 * Thrown when the arguments input was somehow invalid.
 */
export class OptionValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * OptionExpectedValueError.
 *
 * Thrown when an argument expects a value and it was not given.
 */
export class OptionExpectedValueError<T> extends OptionValidationError {
  option: Option<T>
  constructor(option: Option<T>) {
    super(`Expected value for "${option.id}".\n${option.help}`)
    this.name = 'OptionExpectedValueError'
    this.option = option
  }
}

/**
 * OptionInvalidValueError.
 *
 * Thrown when an invalid option was passed, i.e not in choices when a multiple
 * choices argument or not a number when a Number argument.
 */
export class OptionInvalidValueError<T> extends OptionValidationError {
  option: Option<T>
  constructor(option: Option<T>, value: unknown) {
    super(`Invalid value for "${option.id}": "${value}"\n${option.help}`)
    this.name = 'OptionInvalidValueError'
    this.option = option
  }
}

/**
 * OptionHelpRequested.
 *
 * Not an error per se, but thrown anyway when `--help` is passed in the arguments.
 */
export class OptionHelpRequested<T> extends Error {
  constructor(options: Options<T>) {
    super(options.help())
    this.name = 'OptionHelpRequested'
  }
}
