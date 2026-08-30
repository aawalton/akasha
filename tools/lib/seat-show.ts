
import { ATTRIBUTES, type Attributes, type Declaration, type Mode, type ModeRecord, ownAttributesOf } from "./attributes.ts"
import { documentsOnDemand } from "./documents-on-demand.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
import { declaredSeatReading } from "./declared-seat-reading.ts"
import { documentNamed } from "./seat-attribute.ts"
import type { Args } from "./seat-args.ts"
import { initiativeLine } from "./seat-initiative.ts"
import { personaDefaultsOf } from "./compose-seat-name.ts"
import { composedNameOf } from "./seat-rename.ts"
import { flexLine } from "./seat-flex.ts"
import { principalLine } from "./seat-principal.ts"
import { registrationAccountLine } from "./seat-registration-account.ts"
import { onCallLine } from "./seat-on-call.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"
import { type Stated, statedOf } from "./seat-stated.ts"
import { seatTurnStateLine, seatTurnStateOf } from "./seat-turn-state.ts"
import { pendingLines, pendingOf } from "./seat-turn-pending.ts"
import { workingLines, workingOf } from "./seat-turn-working.ts"
import {
  turnEndReadingLine,
  turnEndReadingOf,
  turnPendingSourceLine,
  turnPendingSourceOf,
} from "./seat-turn.ts"
import { readSeatName, vocabulariesOf } from "./read-seat-name.ts"
import { vocabularyOf } from "./seat-vocabulary.ts"
import { fail } from "./command.ts"

export function showLines(agent: string, args: Args): readonly string[] {
  const setting = [
    Object.keys(args.set).length > 0 ? "an attribute" : null,
    args.initiative !== null ? "--initiative" : null,
    args.flex !== null ? "--flex" : null,
    args.clear.length > 0 ? "--clear" : null,
    args.mode !== null ? "--mode" : null,
    args.principal !== null ? "--principal" : null,
    args.onCall ? "--on-call" : null,
    args.fromSeat ? "--from-seat" : null,
  ].filter((one): one is string => one !== null)
  if (setting.length > 0) {
    fail(
      `--show reads what this seat states and writes nothing, so one call carrying it and ${setting.join(" and ")} ` +
        "would print what already stands and drop the set — run them as two calls"
    )
  }
  const stated = statedOf(agent)
  const own = ownAttributesOf(agent)
  const inherited: string[] = ATTRIBUTES.filter(
    (key) => stated.attributes[key] !== undefined && own[key] === undefined
  )
  if (seatPageForAgent(agent) === null) {
    if (stated.initiative !== null) inherited.push("initiative")
  }
  return [
    `seat:   ${agent}`,
    ...linesOf(stated),
    seatTurnStateLine(seatTurnStateOf(agent)),
    turnEndReadingLine(turnEndReadingOf(agent)),
    turnPendingSourceLine(turnPendingSourceOf(agent)),
    ...workingLines(workingOf(agent)),
    ...pendingLines(pendingOf(agent)),
    ...(inherited.length > 0 ? [`  (${inherited.join(", ")} inherited from the seat)`] : []),
  ]
}

export function statedLines(agent: string): readonly string[] {
  return linesOf(statedOf(agent))
}

function linesOf(stated: Stated): readonly string[] {
  return [
    ...describe(stated.attributes),
    flexLine(stated.flex),
    modeLine(stated.mode, stated.recordedMode),
    principalLine(stated.principal),
    onCallLine(stated.onCall),
    initiativeLine(stated.initiative),
    registrationAccountLine(stated.registration),
  ]
}

export function describe(attributes: Attributes): readonly string[] {
  const lines: string[] = []
  const roots = resolveRoots()
  const root = rootFor(roots, AKASHA)
  const documents = documentsOnDemand(root)
  const stated = {
    attributes,
    initiative: null,
    mode: null,
    onCall: false,
    principal: null,
  }
  const shown = new Map(declaredSeatReading(stated, roots, documents).map((one) => [one.claimant, one]))
  for (const key of ATTRIBUTES) {
    const held = attributes[key]
    if (held === undefined) {
      lines.push(`  ${key.padEnd(8)} — not stated`)
      continue
    }
    lines.push(`  ${key.padEnd(8)} ${held.slug}`)
    for (const at of shown.get(key)?.documents ?? []) {
      lines.push(`           ${documentNamed(at, root)}`)
    }
  }
  return lines
}

export function modeLine(applies: Mode, recorded: ModeRecord | null): string {
  const said = recorded === null ? `${applies} — nothing recorded one` : applies
  return `  ${"mode".padEnd(8)} ${said}`
}

export function fromSeat(
  agent: string,
  root: string
): { readonly set: Partial<Record<Declaration, string>> } | { readonly note: string } {
  const name = composedNameOf(agent)
  if (name === null) {
    return {
      note:
        `no seat page stands for ${agent}, and a seat is named by the page it holds, so there is ` +
        `no name here to read attributes out of. Name them yourself: --persona <slug> ` +
        `--domain <slug> --role <slug>`,
    }
  }
  const read = readSeatName(name, vocabulariesOf(vocabularyOf(root)))
  if ("unreadable" in read) {
    return {
      note:
        `the seat is named \`${name}\` and ` +
        (read.unreadable.length === 0
          ? "no division of it is drawn from the vocabularies this repository declares"
          : `${read.unreadable.length} readings of it tie — ${read.unreadable.join("; ")}`) +
        `, so nothing was proposed. Name the attributes yourself`,
    }
  }
  const spelled = read.reading
  const defaults = spelled.persona === null ? null : personaDefaultsOf(root, spelled.persona)
  const set: Partial<Record<Declaration, string>> = {}
  for (const [slot, slug] of [
    ["persona", spelled.persona],
    ["domain", spelled.domain ?? defaults?.domain ?? null],
    ["role", defaults?.role ?? null],
  ] as const) {
    if (slug !== null) set[slot] = slug
  }
  return { set }
}
