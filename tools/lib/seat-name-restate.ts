import { admitSeatName } from "./admit-seat-name.ts"
import { resolveRoots, targetRoot } from "../../repo/roots/roots"
import { seatByName } from "./seat-by-name.ts"
import { isValidSeatName } from "./seat-handle.ts"
import { seatNameAdmission } from "./seat-name-admission.ts"
import { refuseSeatName } from "./seat-name-bind.ts"
import { nameVocabularyOf } from "./seat-name-vocabulary.ts"
import { frontmatterOf, seatPageForAgent } from "./seat-presence-read.ts"

export type SeatPresence = "present" | "absent" | "unknown"

export type Restated =
  | { readonly kind: "bound"; readonly held: string | null; readonly name: string }
  | { readonly kind: "unchanged"; readonly name: string }
  | { readonly kind: "left-alone"; readonly held: string }
  | { readonly kind: "refused"; readonly reason: string }

function seatTextOf(values: Record<string, unknown> | null, key: string): string | null {
  const held = values?.[key]
  return typeof held === "string" && held !== "" ? held : null
}

function movesWithTheAttributes(family: string | null): boolean {
  if (family === null) return true
  if (family === "composed-identity") return true
  return family === "bare-persona"
}

function composedFromAttributes(name: string): boolean {
  const named = nameVocabularyOf(targetRoot(resolveRoots()))
  const { family } = admitSeatName(name, {
    personas: new Set(named.personas),
    persons: new Set(named.persons),
    domains: new Set(named.domains),
  })
  return movesWithTheAttributes(family)
}

export async function restateSeatName(args: {
  readonly agentId: string
  readonly name: string
  readonly takeLiveName?: boolean
}): Promise<Restated> {
  const { agentId, name } = args
  if (!isValidSeatName(name)) {
    return {
      kind: "refused",
      reason: `invalid seat name '${name}' (expected lowercase kebab-case, length 2-128, must contain non-hex letter)`,
    }
  }
  const page = seatPageForAgent(agentId)
  const held = seatTextOf(page === null ? null : frontmatterOf(page), "title")

  if (held === name) return { kind: "unchanged", name }
  if (held !== null && !composedFromAttributes(held)) return { kind: "left-alone", held }

  const holder = seatByName(name)
  const priorHolderPresence: SeatPresence =
    holder !== null && holder.id !== agentId ? holder.presence : "absent"

  try {
    await refuseSeatName(agentId, name, seatNameAdmission(name), {
      priorHolderPresence,
      ...(args.takeLiveName === undefined ? {} : { takeLiveName: args.takeLiveName }),
    })
  } catch (err) {
    return { kind: "refused", reason: err instanceof Error ? err.message : String(err) }
  }
  return { kind: "bound", held, name }
}
