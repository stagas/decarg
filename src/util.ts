export const isDefault = (arg: string) => arg.charAt(0) !== '-'
export const isLong = (arg: string) => arg.slice(0, 2) === '--'
export const strip = (arg: string) => arg.replace(/^-+/, '')
export const split = (del: string, s: string | string[]) => {
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
