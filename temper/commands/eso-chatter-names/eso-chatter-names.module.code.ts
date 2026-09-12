export interface ChatterNamesModule {
  readonly chatter: readonly string[]
  readonly interaction: readonly string[]
  readonly text: string
}

function namesWithPrefix(source: string, prefix: string): readonly string[] {
  const pattern = new RegExp(`^declare const (${prefix}[A-Z0-9_]+):\\s*number`, "gm")
  const found = new Set<string>()
  for (const match of source.matchAll(pattern)) {
    const name = match[1]
    if (name !== undefined) found.add(name)
  }
  return [...found].sort()
}

function renderArray(exportName: string, names: readonly string[]): string {
  const body = names.map((one) => `  ${JSON.stringify(one)},`).join("\n")
  return `export const ${exportName}: readonly string[] = [\n${body}\n]`
}

export function chatterNamesModule(source: string): ChatterNamesModule {
  const chatter = namesWithPrefix(source, "CHATTER_")
  const interaction = namesWithPrefix(source, "INTERACTION_")

  const text = `${renderArray("CHATTER_OPTION_TYPE_NAMES", chatter)}

${renderArray("INTERACTION_TYPE_NAMES", interaction)}
`

  return { chatter, interaction, text }
}
