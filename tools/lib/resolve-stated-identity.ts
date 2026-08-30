
import { SEAT_COMMAND_REL } from "../aw/init/state-seat.ts"
import { ASSIGNMENTS, ATTRIBUTES } from "./attributes.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
import { type SeatCall, callSeatAt, seatCallIn } from "./supervisor-seat-defaults.ts"

export interface StatedIdentity {
  readonly persona?: string
  readonly domain?: string
  readonly role?: string
}

export function resolveCall(stated: StatedIdentity): SeatCall | null {
  const held = stated as Readonly<Record<string, unknown>>
  const slots: Record<string, string> = {}
  for (const key of [...ATTRIBUTES, ...ASSIGNMENTS]) {
    const slug = held[key]
    if (typeof slug === "string") slots[key] = slug
  }
  if (Object.keys(slots).length === 0) return null
  return { ...slots, resolve: true }
}

export async function resolveStatedIdentity(stated: StatedIdentity): Promise<string | null> {
  const call = resolveCall(stated)
  if (call === null) return null
  const entry = seatCallIn(rootFor(resolveRoots(), AKASHA))
  if (entry === null) {
    return (
      `an identity was stated, and ${SEAT_COMMAND_REL} is what checks a slug against ` +
      "the pages. It is not there, so the seat would boot holding none of what was named."
    )
  }
  const outcome = await callSeatAt(entry, call)
  if (outcome.code === 0) return null
  const said = outcome.stderr.trim()
  return said === "" ? `${entry} refused the stated identity` : said
}
