
import { peopleStanding } from "./akasha-people.ts"
import { readCorpora } from "./subjects.ts"

export interface NameVocabulary {
  readonly personas: readonly string[]
  readonly persons: readonly string[]
  readonly domains: readonly string[]
}

const heldByRoot = new Map<string, NameVocabulary>()

function readVocabulary(root: string): NameVocabulary {
  const readings = readCorpora(root, ["personas", "domains"])
  const slugsOf = (subject: "personas" | "domains"): readonly string[] =>
    readings.get(subject)?.records.map((record) => record.slug) ?? []
  return {
    personas: slugsOf("personas"),
    persons: peopleStanding(root).map((one) => one.slug),
    domains: slugsOf("domains"),
  }
}

export function nameVocabularyOf(root: string): NameVocabulary {
  const held = heldByRoot.get(root)
  if (held !== undefined) return held
  const read = readVocabulary(root)
  heldByRoot.set(root, read)
  return read
}
