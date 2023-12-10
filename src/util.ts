export function isDefault(arg: string) {
  return arg.charAt(0) !== '-'
}
export function isLong(arg: string) {
  return arg.slice(0, 2) === '--'
}
export function strip(arg: string) {
  return arg.replace(/^-+/, '')
}
export function split(del: string, s: string | string[]) {
  const index = s.indexOf(del)
  let pre, post
  if (index >= 0) {
    pre = s.slice(0, index)
    post = s.slice(index + 1)
    return [pre, post]
  } else {
    return [s]
  }
}
