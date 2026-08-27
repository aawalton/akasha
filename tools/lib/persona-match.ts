
export interface PersonaMatchCandidate {
  readonly id: string
  readonly slug: string
}

export function toPersonaSlug(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, "-")
}

export function matchPersonaForAgent(
  agentName: string | null,
  agentPersona: string | null,
  personas: readonly PersonaMatchCandidate[]
): string | null {
  const candidates = [agentPersona ?? "", agentName ?? ""].filter((s) => s !== "")
  for (const candidate of candidates) {
    const target = toPersonaSlug(candidate)
    const hit = personas.find((p) => toPersonaSlug(p.slug) === target)
    if (hit) return hit.id
  }
  return null
}
