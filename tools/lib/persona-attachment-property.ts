import { personaAt } from "./akasha-personas.ts"
import { ownRepoRoot } from "../../repo/roots/roots.ts"

const VOICE_REFERENCE_SHA256_KEY = "voice-reference-sha256"

export function personaFrontmatter(slug: string): Record<string, string> {
  const persona = personaAt(ownRepoRoot(), slug)
  if (persona === null) return {}
  const sha = persona.voiceReferenceSha256
  return sha === null ? {} : { [VOICE_REFERENCE_SHA256_KEY]: sha }
}
