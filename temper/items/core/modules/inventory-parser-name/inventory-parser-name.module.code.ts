import { stripEsoNameSuffix } from "akasha/temper/player/character/build/build-support/modules/eso-name/eso-name.module.code.ts"

const TITLE_CASE_LOWERCASE = new Set([
  "of",
  "the",
  "a",
  "an",
  "and",
  "or",
  "in",
  "on",
  "at",
  "to",
  "for",
  "with",
])

export function cleanItemName(name: string): string {
  const stripped = stripEsoNameSuffix(name)
  return stripped.replace(/\S+/g, (word, offset: number) => {
    if (offset > 0 && TITLE_CASE_LOWERCASE.has(word.toLowerCase())) return word.toLowerCase()
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
}
