
/**
 * The colour each agent's turn is drawn in, keyed by the id it was asked under.
 *
 * ONE ANSWER FOR TWO READERS. `tools/agent-turn-colors.ts` prints it for whoever asks from a shell,
 * and the editor's tab strip reads it in its own process. Worked out in each place separately it
 * would be two answers to one question, and the one nobody watches would be the strip's — where a
 * tab drawn in the wrong turn's colour looks exactly like a right one.
 *
 * A NAME, NOT A SHADE. `colorOfState` answers the colour that state's own domain page states, so
 * whatever draws it picks the value out of its own palette. Nothing here knows what green looks
 * like, and nothing here should: the tab strip is the furthest place in the system from where that
 * is written down.
 *
 * ABSENCE IS ORDINARY AND IS SAID BY LEAVING THE ID OUT. An id no seat ever held is not a fault —
 * a caller asking about a terminal that turned out to hold no seat wants no colour rather than a
 * refusal — so `agentStands` is asked first and a `null` never reaches the record.
 */

import { agentStands, agentTurnStateOf } from "./agent-turn-state.ts"
import { colorOfState } from "./seat-turn-color.ts"

export function colorDrawnFor(agent: string): string | null {
  if (!agentStands(agent)) return null
  return colorOfState(agentTurnStateOf(agent).state)
}

/**
 * The colour of every agent named, omitting each one drawn in none.
 *
 * THE SECOND ARGUMENT IS A SEAM AND NOT A SETTING. It exists so what this does with a colour can be
 * exercised without a checkout of seats on disk; every caller in the system takes the default.
 */
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
