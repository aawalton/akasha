export function isString(this: void, value: unknown): value is string {
  return typeof value === "string"
}

export function isNumber(this: void, value: unknown): value is number {
  return typeof value === "number"
}

export function isStringOrNumber(this: void, value: unknown): value is string | number {
  return typeof value === "string" || typeof value === "number"
}
