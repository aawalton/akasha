import type { NamedSource } from "@akasha/temper-formula-framework/effect-source"

export function filterEffectsBySearch(
  effects: readonly NamedSource[],
  searchTerm: string
): readonly NamedSource[] {
  if (searchTerm.trim() === "") return effects

  const lowerSearch = searchTerm.toLowerCase()
  return effects.filter((effect) => effect.name.toLowerCase().includes(lowerSearch))
}

export function groupEffectsBySubcategory(effects: readonly NamedSource[]): {
  major: NamedSource[]
  minor: NamedSource[]
  other: NamedSource[]
} {
  const major = effects.filter((e) => e.id.startsWith("major-"))
  const minor = effects.filter((e) => e.id.startsWith("minor-"))
  const other = effects.filter((e) => !e.id.startsWith("major-") && !e.id.startsWith("minor-"))
  return { major, minor, other }
}
