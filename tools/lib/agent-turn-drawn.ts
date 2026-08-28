import { agentStands, agentTurnStateOf } from "./agent-turn-state.ts"
import { colorOfState } from "./seat-turn-color.ts"

export function colorDrawnFor(agent: string): string | null {
  if (!agentStands(agent)) return null
  return colorOfState(agentTurnStateOf(agent).state)
}

export function colorsOf(
  agents: readonly string[],
  colorOf: (agent: string) => string | null = colorDrawnFor
): Record<string, string> {
  const found: Record<string, string> = {}
  for (const agent of agents) {
    const color = colorOf(agent)
    if (color !== null) found[agent] = color
  }
  return found
}
