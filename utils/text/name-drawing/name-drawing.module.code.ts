export function namesDrawn(names: Iterable<string>, between = ", "): string {
  return [...names].map((one) => `\`${one}\``).join(between)
}
