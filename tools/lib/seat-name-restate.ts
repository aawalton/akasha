import { resolveRoots, targetRoot } from "@akasha/pages-system/checkout-roots"
import { seatByName } from "@akasha/seat-system/seat-by-name"
import { refuseSeatName } from "@akasha/seat-system/seat-name-bind"
import { movesWithTheAttributes } from "../../akasha/seat-system/compose-seat-name/compose-seat-name.module.code.ts"
import { pageTextOf } from "../../akasha/seat-system/seat-page-values/seat-page-values.module.code.ts"
import { isValidSeatName } from "./seat-handle.ts"

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

function composedFromAttributes(name: string): boolean {
  return movesWithTheAttributes(name, targetRoot(resolveRoots()))
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
  // Through the funnel rather than off the old page, so a seat whose old page has gone is read as
  // holding the name it holds rather than as holding none — which would restate a name that is
  // already right, and take it off whatever seat answers to it.
  const held = pageTextOf(agentId, "title")

  if (held === name) return { kind: "unchanged", name }
  if (held !== null && !composedFromAttributes(held)) return { kind: "left-alone", held }

  const holder = seatByName(name)
  const priorHolderPresence: SeatPresence =
    holder !== null && holder.id !== agentId ? holder.presence : "absent"

  try {
    await refuseSeatName(agentId, name, {
      priorHolderPresence,
      ...(args.takeLiveName === undefined ? {} : { takeLiveName: args.takeLiveName }),
    })
  } catch (err) {
    return { kind: "refused", reason: err instanceof Error ? err.message : String(err) }
  }
  return { kind: "bound", held, name }
}
