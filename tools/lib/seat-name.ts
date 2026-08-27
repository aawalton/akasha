
import { personaDefaultsOf } from "./compose-seat-name.ts"

export function championedDomainOf(root: string, persona: string): string | null {
  return personaDefaultsOf(root, persona)?.domain ?? null
}
