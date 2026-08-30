
import { patchState } from "./page-write.ts"
import { matchPersonaForAgent } from "./persona-match.ts"
import { listPersonaTargets } from "./persona-wake-slugs.ts"
import { isAlanAuthoredPrompt } from "./prompt-shape.ts"
import { resolveRoots } from "../../repo/roots/roots"
import { seatRecord } from "./seat-facts.ts"
import { shape } from "./shape.ts"

const HookPayload = shape.looseObject({ prompt: shape.string() })

export interface MatchedPersona {
  readonly id: string
  readonly slug: string
}

export async function matchPersonaByAgentId(agentId: string): Promise<MatchedPersona | null> {
  const seat = seatRecord(agentId)
  if (seat === null) return null
  const personas = await listPersonaTargets()
  const personaId = matchPersonaForAgent(seat.name, seat.persona, personas)
  if (personaId === null) return null
  const hit = personas.find((p) => p.id === personaId)
  return hit === undefined ? null : { id: personaId, slug: hit.slug }
}

export function stampLastMessaged(slug: string): void {
  patchState(resolveRoots(), "persona", slug, {
    "last-messaged-at": new Date().toISOString(),
  })
}

export function promptFromHookPayload(raw: string): string | undefined {
  if (raw.trim() === "") return undefined
  try {
    const parsed = HookPayload.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data.prompt : undefined
  } catch {
    return undefined
  }
}

export function stampsForPrompt(prompt: string | undefined): boolean {
  return prompt === undefined ? true : isAlanAuthoredPrompt(prompt)
}

export async function stampByAgentId(agentId: string): Promise<MatchedPersona | null> {
  const matched = await matchPersonaByAgentId(agentId)
  if (matched === null) return null
  stampLastMessaged(matched.slug)
  return matched
}

export async function stampFromHookPayload(
  agentId: string | undefined,
  payload: string
): Promise<MatchedPersona | null> {
  if (agentId === undefined || agentId === "") return null
  if (!stampsForPrompt(promptFromHookPayload(payload))) return null
  return await stampByAgentId(agentId)
}

async function main(): Promise<void> {
  const agentId = process.argv[2] ?? process.env.AGENT_ID
  const payload = process.stdin.isTTY === true ? "" : await Bun.stdin.text()
  await stampFromHookPayload(agentId, payload).catch(() => null)
  process.exit(0)
}

if (import.meta.main) await main()
