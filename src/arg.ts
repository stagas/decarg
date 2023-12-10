import 'reflect-metadata'

const A = Symbol.for('arg')

type ArgDescription = (string | string[])[]

export function arg(...description: ArgDescription) {
  return Reflect.metadata(A, description)
}

export interface Arg<T> {
  target: T
  property: string
  description: ArgDescription
  type: new<X>() => X
}

export function getArg<T extends object>(target: T, property: string) {
  const description = Reflect.getMetadata(A, target, property)
  if (!description) return

  const type = Object.getOwnPropertyDescriptor(target, property)?.value?.constructor
    ?? Reflect.getMetadata('design:type', target, property)

  return { target, property, description, type } as Arg<T>
}
