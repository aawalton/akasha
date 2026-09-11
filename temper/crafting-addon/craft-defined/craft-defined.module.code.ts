export function defined<T>(value: T | undefined): T {
  if (value === undefined) {
    error("TemperCrafting: unexpected nil value")
  }
  return value
}
