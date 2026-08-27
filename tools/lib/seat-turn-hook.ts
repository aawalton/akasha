
import { hookAgentId } from "./read-log.ts"
import { setTurnState } from "./seat-turn.ts"
import type { SeatTurnStamp } from "./seat-turn-state.ts"

export async function fromHook(
  act: (agent: string, fields: Record<string, unknown>) => void
): Promise<void> {
  let fields: Record<string, unknown> = {}
  try {
    const parsed: unknown = JSON.parse(await Bun.stdin.text())
    if (parsed !== null && typeof parsed === "object") fields = parsed as Record<string, unknown>
  } catch {
    fields = {}
  }
  const agent = hookAgentId(fields)
  if (agent === null) return
  try {
    act(agent, fields)
  } catch {
  }
}

export async function stampFromHookWhen(
  chosen: (fields: Record<string, unknown>) => SeatTurnStamp | null,
  beside?: (agent: string) => void
): Promise<void> {
  await fromHook((agent, fields) => {
    const state = chosen(fields)
    if (state === null) return
    beside?.(agent)
    setTurnState(agent, state)
  })
}

export async function stampFromHook(
  state: SeatTurnStamp,
  beside?: (agent: string) => void
): Promise<void> {
  await stampFromHookWhen(() => state, beside)
}
