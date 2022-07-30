<h1>
decarg <a href="https://npmjs.org/package/decarg"><img src="https://img.shields.io/badge/npm-v1.2.1-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-278-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/decarg@1.2.1/dist/decarg.min.js"><img src="https://img.shields.io/badge/brotli-3.9K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

decorator based cli arguments parser

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i decarg </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add decarg </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add decarg</code>
</td></tr></table>
</h4>

## Examples

<details id="example$basic" title="basic" open><summary><span><a href="#example$basic">#</a></span>  <code><strong>basic</strong></code></summary>  <ul>    <details id="source$basic" title="basic source code" ><summary><span><a href="#source$basic">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/basic.ts">example/basic.ts</a>  <p>

```ts
import { arg, decarg } from 'decarg'

class Options {
  @arg('<file> [<file>, decarg.]', 'Files to process') file!: string[]

  @arg('--', '[decarg.rest]', 'The rest of the arguments') passArgs = []

  @arg('-f', '--flag', 'Flag about something') flag = false

  @arg('-c', '--count', 'How many times') count = 42

  @arg('-C', 'Choose color', ['blue', 'red', 'yellow']) color = 'blue'

  @arg('-s', '--string', 'Some string') string = 'hmm'

  @arg('--meh', 'Meh') meh: string[] = []

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
```

</p>
</details></ul></details>

## API

<p>  <details id="OptionExpectedValueError$39" title="Class" ><summary><span><a href="#OptionExpectedValueError$39">#</a></span>  <code><strong>OptionExpectedValueError</strong></code>     &ndash; OptionExpectedValueError.</summary>  <a href="src/errors.ts#L20">src/errors.ts#L20</a>  <ul>  <p>

Thrown when an argument expects a value and it was not given.

</p>
      <p>  <details id="constructor$40" title="Constructor" ><summary><span><a href="#constructor$40">#</a></span>  <code><strong>constructor</strong></code><em>(option)</em>    </summary>  <a href="src/errors.ts#L22">src/errors.ts#L22</a>  <ul>    <p>  <details id="new OptionExpectedValueError$41" title="ConstructorSignature" ><summary><span><a href="#new OptionExpectedValueError$41">#</a></span>  <code><strong>new OptionExpectedValueError</strong></code><em>()</em>    </summary>    <ul><p><a href="#OptionExpectedValueError$39">OptionExpectedValueError</a>&lt;<a href="#T$42">T</a>&gt;</p>      <p>  <details id="option$43" title="Parameter" ><summary><span><a href="#option$43">#</a></span>  <code><strong>option</strong></code>    </summary>    <ul><p><span>Option</span>&lt;<a href="#T$42">T</a>&gt;</p>        </ul></details></p>  </ul></details></p>    </ul></details><details id="option$44" title="Property" ><summary><span><a href="#option$44">#</a></span>  <code><strong>option</strong></code>    </summary>  <a href="src/errors.ts#L21">src/errors.ts#L21</a>  <ul><p><span>Option</span>&lt;<a href="#T$42">T</a>&gt;</p>        </ul></details></p></ul></details><details id="OptionHelpRequested$54" title="Class" ><summary><span><a href="#OptionHelpRequested$54">#</a></span>  <code><strong>OptionHelpRequested</strong></code>     &ndash; OptionHelpRequested.</summary>  <a href="src/errors.ts#L49">src/errors.ts#L49</a>  <ul>  <p>

Not an error per se, but thrown anyway when `--help` is passed in the arguments.

</p>
      <p>  <details id="constructor$55" title="Constructor" ><summary><span><a href="#constructor$55">#</a></span>  <code><strong>constructor</strong></code><em>(options)</em>    </summary>  <a href="src/errors.ts#L50">src/errors.ts#L50</a>  <ul>    <p>  <details id="new OptionHelpRequested$56" title="ConstructorSignature" ><summary><span><a href="#new OptionHelpRequested$56">#</a></span>  <code><strong>new OptionHelpRequested</strong></code><em>()</em>    </summary>    <ul><p><a href="#OptionHelpRequested$54">OptionHelpRequested</a>&lt;<a href="#T$57">T</a>&gt;</p>      <p>  <details id="options$58" title="Parameter" ><summary><span><a href="#options$58">#</a></span>  <code><strong>options</strong></code>    </summary>    <ul><p><span>Options</span>&lt;<a href="#T$57">T</a>&gt;</p>        </ul></details></p>  </ul></details></p>    </ul></details></p></ul></details><details id="OptionInvalidValueError$46" title="Class" ><summary><span><a href="#OptionInvalidValueError$46">#</a></span>  <code><strong>OptionInvalidValueError</strong></code>     &ndash; OptionInvalidValueError.</summary>  <a href="src/errors.ts#L35">src/errors.ts#L35</a>  <ul>  <p>

Thrown when an invalid option was passed, i.e not in choices when a multiple
choices argument or not a number when a Number argument.

</p>
      <p>  <details id="constructor$47" title="Constructor" ><summary><span><a href="#constructor$47">#</a></span>  <code><strong>constructor</strong></code><em>(option, value)</em>    </summary>  <a href="src/errors.ts#L37">src/errors.ts#L37</a>  <ul>    <p>  <details id="new OptionInvalidValueError$48" title="ConstructorSignature" ><summary><span><a href="#new OptionInvalidValueError$48">#</a></span>  <code><strong>new OptionInvalidValueError</strong></code><em>()</em>    </summary>    <ul><p><a href="#OptionInvalidValueError$46">OptionInvalidValueError</a>&lt;<a href="#T$49">T</a>&gt;</p>      <p>  <details id="option$50" title="Parameter" ><summary><span><a href="#option$50">#</a></span>  <code><strong>option</strong></code>    </summary>    <ul><p><span>Option</span>&lt;<a href="#T$49">T</a>&gt;</p>        </ul></details><details id="value$51" title="Parameter" ><summary><span><a href="#value$51">#</a></span>  <code><strong>value</strong></code>    </summary>    <ul><p>unknown</p>        </ul></details></p>  </ul></details></p>    </ul></details><details id="option$52" title="Property" ><summary><span><a href="#option$52">#</a></span>  <code><strong>option</strong></code>    </summary>  <a href="src/errors.ts#L36">src/errors.ts#L36</a>  <ul><p><span>Option</span>&lt;<a href="#T$49">T</a>&gt;</p>        </ul></details></p></ul></details><details id="OptionValidationError$35" title="Class" ><summary><span><a href="#OptionValidationError$35">#</a></span>  <code><strong>OptionValidationError</strong></code>     &ndash; OptionValidationError.</summary>  <a href="src/errors.ts#L8">src/errors.ts#L8</a>  <ul>  <p>

Thrown when the arguments input was somehow invalid.

</p>
      <p>  <details id="constructor$36" title="Constructor" ><summary><span><a href="#constructor$36">#</a></span>  <code><strong>constructor</strong></code><em>(message)</em>    </summary>  <a href="src/errors.ts#L9">src/errors.ts#L9</a>  <ul>    <p>  <details id="new OptionValidationError$37" title="ConstructorSignature" ><summary><span><a href="#new OptionValidationError$37">#</a></span>  <code><strong>new OptionValidationError</strong></code><em>()</em>    </summary>    <ul><p><a href="#OptionValidationError$35">OptionValidationError</a></p>      <p>  <details id="message$38" title="Parameter" ><summary><span><a href="#message$38">#</a></span>  <code><strong>message</strong></code>    </summary>    <ul><p>string</p>        </ul></details></p>  </ul></details></p>    </ul></details></p></ul></details><details id="arg$21" title="Function" ><summary><span><a href="#arg$21">#</a></span>  <code><strong>arg</strong></code><em>(description)</em>    </summary>  <a href="src/arg.ts#L7">src/arg.ts#L7</a>  <ul>    <p>    <details id="description$23" title="Parameter" ><summary><span><a href="#description$23">#</a></span>  <code><strong>description</strong></code>    </summary>    <ul><p><span>ArgDescription</span></p>        </ul></details>  <p><strong>arg</strong><em>(description)</em>  &nbsp;=&gt;  <ul>{<p>    <details id="target$26" title="Parameter" ><summary><span><a href="#target$26">#</a></span>  <code><strong>target</strong></code>    </summary>    <ul><p><span>Function</span></p>        </ul></details>  <p><strong></strong><em>(target)</em>  &nbsp;=&gt;  <ul>void</ul></p>  <details id="target$28" title="Parameter" ><summary><span><a href="#target$28">#</a></span>  <code><strong>target</strong></code>    </summary>    <ul><p><span>Object</span></p>        </ul></details><details id="propertyKey$29" title="Parameter" ><summary><span><a href="#propertyKey$29">#</a></span>  <code><strong>propertyKey</strong></code>    </summary>    <ul><p>string | symbol</p>        </ul></details>  <p><strong></strong><em>(target, propertyKey)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>}</ul></p></p>    </ul></details><details id="decarg$1" title="Function" ><summary><span><a href="#decarg$1">#</a></span>  <code><strong>decarg</strong></code><em>(target, argv, { exit, log })</em>     &ndash; Process an options object and handle errors.</summary>  <a href="src/index.ts#L17">src/index.ts#L17</a>  <ul>    <p>    <details id="target$4" title="Parameter" ><summary><span><a href="#target$4">#</a></span>  <code><strong>target</strong></code>     &ndash; The decorated options object.</summary>    <ul><p><a href="#T$3">T</a></p>        </ul></details><details id="argv$5" title="Parameter" ><summary><span><a href="#argv$5">#</a></span>  <code><strong>argv</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>   &ndash; Arguments values.</summary>    <ul><p>string  []</p>        </ul></details><details id="overrides$6" title="Parameter" ><summary><span><a href="#overrides$6">#</a></span>  <code><strong>overrides</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>{}</code></span>  </summary>    <ul><p>{<p>  <details id="exit$8" title="Property" ><summary><span><a href="#exit$8">#</a></span>  <code><strong>exit</strong></code>     &ndash; The exit function to use.</summary>    <ul><p>undefined | <details id="__type$9" title="Function" ><summary><span><a href="#__type$9">#</a></span>  <em>(code)</em>     &ndash; The <code>process.exit()</code> method instructs Node.js to terminate the process
synchronously with an exit status of <code>code</code>. If <code>code</code> is omitted, exit uses
either the 'success' code <code>0</code> or the value of <code>process.exitCode</code> if it has been
set. Node.js will not terminate until all the <code>'exit'</code> event listeners are
called.</summary>    <ul>    <p>  <p>

To exit with a 'failure' code:

```js
import { exit } from 'process'

exit(1)
```

The shell that executed Node.js should see the exit code as `1`.

Calling `process.exit()` will force the process to exit as quickly as possible
even if there are still asynchronous operations pending that have not yet
completed fully, including I/O operations to `process.stdout` and`process.stderr`.

In most situations, it is not actually necessary to call `process.exit()`explicitly. The Node.js process will exit on its own _if there is no additional_
_work pending_ in the event loop. The `process.exitCode` property can be set to
tell the process which exit code to use when the process exits gracefully.

For instance, the following example illustrates a _misuse_ of the`process.exit()` method that could lead to data printed to stdout being
truncated and lost:

```js
import { exit } from 'process'

// This is an example of what *not* to do:
if (someConditionNotMet()) {
  printUsageToStdout()
  exit(1)
}
```

The reason this is problematic is because writes to `process.stdout` in Node.js
are sometimes _asynchronous_ and may occur over multiple ticks of the Node.js
event loop. Calling `process.exit()`, however, forces the process to exit_before_ those additional writes to `stdout` can be performed.

Rather than calling `process.exit()` directly, the code _should_ set the`process.exitCode` and allow the process to exit naturally by avoiding
scheduling any additional work for the event loop:

```js
import process from 'process'

// How to properly set the exit code while letting
// the process exit gracefully.
if (someConditionNotMet()) {
  printUsageToStdout()
  process.exitCode = 1
}
```

If it is necessary to terminate the Node.js process due to an error condition,
throwing an _uncaught_ error and allowing the process to terminate accordingly
is safer than calling `process.exit()`.

In `Worker` threads, this function stops the current thread rather
than the current process.

</p>
  <details id="code$11" title="Parameter" ><summary><span><a href="#code$11">#</a></span>  <code><strong>code</strong></code>    </summary>    <ul><p>number</p>        </ul></details>  <p><strong></strong><em>(code)</em>  &nbsp;=&gt;  <ul>never</ul></p></p>    </ul></details></p>        </ul></details><details id="log$12" title="Property" ><summary><span><a href="#log$12">#</a></span>  <code><strong>log</strong></code>     &ndash; The log function to use.</summary>    <ul><p>undefined | {<p>    <details id="data$15" title="Parameter" ><summary><span><a href="#data$15">#</a></span>  <code><strong>data</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details>  <p><strong></strong><em>(data)</em>  &nbsp;=&gt;  <ul>void</ul></p>  <details id="data$17" title="Parameter" ><summary><span><a href="#data$17">#</a></span>  <code><strong>data</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details>  <p><strong></strong><em>(data)</em>  &nbsp;=&gt;  <ul>void</ul></p><p>

```js
const code = 5
console.error('error #%d', code)
// Prints: error #5, to stderr
console.error('error', code)
// Prints: error 5, to stderr
```

If formatting elements (e.g. `%d`) are not found in the first string then `util.inspect()` is called on each argument and the resulting string
values are concatenated. See `util.format()` for more information.

</p>
  <details id="message$19" title="Parameter" ><summary><span><a href="#message$19">#</a></span>  <code><strong>message</strong></code>    </summary>    <ul><p>any</p>        </ul></details><details id="optionalParams$20" title="Parameter" ><summary><span><a href="#optionalParams$20">#</a></span>  <code><strong>optionalParams</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details>  <p><strong></strong><em>(message, optionalParams)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>}</p>        </ul></details></p>}</p>        </ul></details>  <p><strong>decarg</strong>&lt;<span>T</span>&gt;<em>(target, argv, { exit, log })</em>  &nbsp;=&gt;  <ul>undefined | <a href="#T$3">T</a></ul></p></p>    </ul></details><details id="parse$30" title="Function" ><summary><span><a href="#parse$30">#</a></span>  <code><strong>parse</strong></code><em>(target, argv)</em>     &ndash; Process an options object and throw errors so that they can be
managed manually.</summary>  <a href="src/parse.ts#L17">src/parse.ts#L17</a>  <ul>    <p>    <details id="target$33" title="Parameter" ><summary><span><a href="#target$33">#</a></span>  <code><strong>target</strong></code>     &ndash; The decorated options object.</summary>    <ul><p><a href="#T$32">T</a></p>        </ul></details><details id="argv$34" title="Parameter" ><summary><span><a href="#argv$34">#</a></span>  <code><strong>argv</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>   &ndash; Arguments values.</summary>    <ul><p>string  []</p>        </ul></details>  <p><strong>parse</strong>&lt;<span>T</span>&gt;<em>(target, argv)</em>  &nbsp;=&gt;  <ul><a href="#T$32">T</a></ul></p></p>    </ul></details></p>

## Credits

- [reflect-metadata](https://npmjs.org/package/reflect-metadata) by [Ron Buckton](https://github.com/github.com) &ndash; Polyfill for Metadata Reflection API

## Contributing

[Fork](https://github.com/stagas/decarg/fork) or [edit](https://github.dev/stagas/decarg) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
