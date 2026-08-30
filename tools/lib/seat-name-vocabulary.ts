
import { readCorpora } from "./subjects.ts"

export const UNNAMEABLE_ROLES: ReadonlySet<string> = new Set(["human", "unknown"])

export interface NameVocabulary {
  readonly personas: readonly string[]
  readonly persons: readonly string[]
  readonly domains: readonly string[]
  readonly roles: readonly string[]
  readonly rolesLongestFirst: readonly string[]
}

const heldByRoot = new Map<string, NameVocabulary>()

function readVocabulary(root: string): NameVocabulary {
  const readings = readCorpora(root, ["personas", "persons", "domains", "roles"])
  const slugsOf = (
    subject: "personas" | "persons" | "domains" | "roles"
  ): readonly string[] => readings.get(subject)?.records.map((record) => record.slug) ?? []
  const roles = slugsOf("roles").filter((role) => !UNNAMEABLE_ROLES.has(role))
  return {
    personas: slugsOf("personas"),
    persons: slugsOf("persons"),
    domains: slugsOf("domains"),
    roles,
    rolesLongestFirst: [...roles].sort((a, b) => b.length - a.length),
  }
}

export function nameVocabularyOf(root: string): NameVocabulary {
  const held = heldByRoot.get(root)
  if (held !== undefined) return held
  const read = readVocabulary(root)
  heldByRoot.set(root, read)
  return read
}
