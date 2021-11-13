import { arg, decarg } from '../src'

class Options {
  @arg('<file> [<file>, ...]', 'Files to process')
  file!: string[]

  @arg('--', '[...rest]', 'The rest of the arguments')
  passArgs = []

  @arg('-f', '--flag', 'Flag about something')
  flag = false

  @arg('-c', '--count', 'How many times')
  count = 42

  @arg('-C', 'Choose color', ['blue', 'red', 'yellow'])
  color = 'blue'

  @arg('-s', '--string', 'Some string')
  string = 'hmm'

  @arg('--meh', 'Meh')
  meh: string[] = []

  static examples = {
    '-f foo': 'Convert foo by force',
    '-f foo -s': 'Convert foo by force smoothly',
  }
}

const options = decarg(new Options())

// these fail:

// const options = decarg(new Options(), ['exec'])
// const options = decarg(new Options(), ['exec', '-C'])
// const options = decarg(new Options(), ['exec', '-C=green'])
// const options = decarg(new Options(), ['exec', '-c=not a number'])

// this passes:

// const options = decarg(new Options(), ['exec', 'foo'])

console.log(options)
