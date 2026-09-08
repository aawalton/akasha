export function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

export function namesIn(
  argv: readonly string[],
  takingAValue: readonly string[]
): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at]
    if (word === undefined) continue
    if (takingAValue.includes(word)) {
      at += 1
      continue
    }
    if (word.startsWith("-")) continue
    found.push(word)
  }
  return found
}
