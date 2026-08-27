import type { Initiatives, InitiativeDoc, Node } from "../lib/work-tree.ts"

export function initiative(slug: string, fields: Partial<InitiativeDoc> = {}): InitiativeDoc {
  return {
    slug,
    relPath: `initiatives/p/${slug}.md`,
    parent: null,
    persona: "p",
    ...fields,
  }
}

export function initiatives(over: Partial<Initiatives> = {}): Initiatives {
  return { initiatives: [], ...over }
}

export function at(roots: readonly Node[], ...keys: readonly string[]): Node | undefined {
  let here: readonly Node[] = roots
  let found: Node | undefined
  for (const key of keys) {
    found = here.find((one) => one.key === key)
    if (found === undefined) return undefined
    here = found.children
  }
  return found
}
