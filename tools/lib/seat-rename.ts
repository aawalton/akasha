import { basename } from "node:path"
import { renameSeatSession, sessionNote } from "@akasha/seat-system/seat-session-rename"
import {
  composeSeatName,
  FLEET,
  type NameableSeat,
} from "../../akasha/seat-system/compose-seat-name/compose-seat-name.module.code.ts"
import { pageValuesOf } from "../../akasha/seat-system/seat-page-values/seat-page-values.module.code.ts"
import { seatNameForAgent } from "../../akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import { restateSeatName } from "./seat-name-restate.ts"

const SLOT_JOINER = "|"

function slotsOf(seat: NameableSeat): string {
  return [seat.attributes.persona, seat.attributes.domain, seat.attributes.role, seat.principal]
    .map((one) => one ?? "")
    .join(SLOT_JOINER)
}

export const SEAT_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const PAGE_SUFFIX = ".md"

export function composedNameOf(agent: string): string | null {
  return seatNameForAgent(agent)
}

const PAGE_SLOTS = ["persona-slug", "domain-slug", "role-slug"] as const

const PERSON_KEY = "person-slug"

export function pushedSlotsOf(agent: string): string | null {
  const values = pageValuesOf(agent)
  if (values === null) return null
  const person = values[PERSON_KEY]
  const said = (one: unknown): string => (one === undefined || one === null ? "" : String(one))
  return [
    ...PAGE_SLOTS.map((key) => said(values[key])),
    typeof person === "string" && person !== "" ? person : FLEET,
  ].join(SLOT_JOINER)
}

export type Following =
  | { readonly kind: "unchanged"; readonly name: string | null }
  | { readonly kind: "renamed"; readonly name: string; readonly note: string }
  | { readonly kind: "refused"; readonly reason: string }

export async function followName(
  agent: string,
  root: string,
  next: NameableSeat,
  takeLiveName = false
): Promise<Following> {
  if (!SEAT_ID.test(agent)) return { kind: "unchanged", name: null }
  const name = composeSeatName(next, root)
  if (name === null) return { kind: "unchanged", name: null }
  const slots = slotsOf(next)
  if (name === composedNameOf(agent) && slots === pushedSlotsOf(agent)) {
    return { kind: "unchanged", name }
  }
  const restated = await restateSeatName({ agentId: agent, name, takeLiveName })
  if (restated.kind === "refused") return { kind: "refused", reason: `refused: ${restated.reason}` }
  if (restated.kind === "left-alone") return { kind: "unchanged", name: null }
  if (restated.kind === "unchanged") return { kind: "unchanged", name }
  const was = restated.held
  const session = renameSeatSession(was, name)
  const answered = `bound ${was ?? "(nameless)"} -> ${name}`
  return { kind: "renamed", name, note: `${answered}${sessionNote(session, was, name)}` }
}
