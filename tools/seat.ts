export const tool = {
  summary: "State what a seat is, so a compaction cannot take it away",
  path: "seat set",
} as const

import { ATTRIBUTES, DECLARATIONS, type Attribute, type AttributeKey, type Declaration, attributesOf, recordedModeOf } from "./lib/attributes.ts"
import { attributeFor } from "./lib/seat-attribute.ts"
import { SEAT_HELP } from "./lib/seat-help.ts"
import { type Args, parseArgs } from "./lib/seat-args.ts"
import { refuseInitiative } from "./lib/seat-initiative.ts"
import { launchOf, launchStating, refuseFlex } from "./lib/seat-flex.ts"
import { principalOf } from "./lib/seat-principal.ts"
import { handlerDerives, personaIsHers, refuseAnswering } from "./lib/seat-answering.ts"
import { roleGrantsOnCall } from "./lib/seat-on-call.ts"
import { defaultFor, defaultSlots, type Found, resolveAttributes, scan } from "./lib/seat-resolve.ts"
import { defaultLines } from "./lib/seat-defaults.ts"
import { seatId } from "./lib/read-record.ts"
import { AKASHA, akashaRoot, resolveRoots, rootFor } from "../repo/roots/roots.ts"
import { composeSeatName, personPrincipals } from "./lib/compose-seat-name.ts"
import { composedNameOf, followName } from "./lib/seat-rename.ts"
import { nameStanding } from "./lib/seat-name-stands.ts"
import { statedFromHistory } from "./lib/seat-page-history.ts"
import { writeSeatPage } from "./lib/seat-page.ts"
import { statedNow } from "./lib/seat-stated.ts"
import { nameableFrom, nameableStated } from "./lib/seat-nameable.ts"
import { fromSeat, showLines, statedLines } from "./lib/seat-show.ts"
import { seatPageRel } from "./lib/seat-presence-read.ts"
import { fail } from "./lib/command.ts"

export async function run(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(SEAT_HELP)
    return
  }
  const args = parseArgs(argv)
  const roots = resolveRoots()
  const pages = akashaRoot()

  if (args.resolve) {
    if (args.asDefault) {
      process.stdout.write(defaultLines(pages).join("\n") + "\n")
      return
    }
    const resolved = resolveAttributes(args.set, args.tokens, pages, scan(pages))
    if ("refusals" in resolved) {
      process.stderr.write(["refused:", ...resolved.refusals.map((one) => `  ${one}`), "nothing was resolved"].join("\n") + "\n")
      process.exit(1)
    }
    process.stdout.write(resolved.assigned.map((one) => `${one.slot}=${one.slug}`).join("\n") + "\n")
    return
  }
  if (args.name) {
    const nameable = nameableStated(args.set, args.flex, args.principal)
    const spelled = composeSeatName(nameable, pages)
    if (spelled === null) {
      process.stderr.write(
        "refused: these attributes spell no name — state a persona, a domain or a role\n"
      )
      process.exit(1)
    }
    process.stdout.write(`${spelled}\n`)
    return
  }
  if (args.tokens.length > 0) {
    fail("--token is sorted against the pages and states nothing — it needs --resolve")
  }

  const own = seatId()
  const agent = args.agent ?? own
  if (agent === null) {
    fail(
      "neither AGENT_ID nor CLAUDE_CODE_SESSION_ID is set, so nothing stated could be attributed to you — " +
        "set one, or name it with --agent"
    )
  }

  if (args.show) {
    process.stdout.write(showLines(agent, args).join("\n") + "\n")
    return
  }

  const set: Partial<Record<Declaration, string>> = { ...args.set }
  const notes: string[] = []
  if (args.fromSeat) {
    const proposed = fromSeat(agent, pages)
    if ("note" in proposed) notes.push(`note:   ${proposed.note}`)
    else {
      for (const key of DECLARATIONS) {
        const value = proposed.set[key]
        if (value !== undefined && set[key] === undefined) set[key] = value
      }
    }
  }

  let initiative = args.initiative
  let onCall = args.onCall
  let fromHistoryPrincipal: string | null = null
  if (args.fromHistory) {
    const name = composedNameOf(agent)
    const held = name === null ? null : statedFromHistory(name, roots)
    if (name === null) {
      notes.push("note:   this seat has no name yet, so no page of its own stands in history")
    } else if (held === null) {
      notes.push(`note:   no page for \`${name}\` stands in akasha's history`)
    } else {
      for (const key of DECLARATIONS) {
        const value = held.set[key]
        if (value !== undefined && set[key] === undefined) set[key] = value
      }
      if (initiative === null) initiative = held.initiative
      if (!onCall) onCall = held.onCall
      fromHistoryPrincipal = held.principal
      notes.push(`note:   read back from ${held.commit.slice(0, 8)}, the commit that last held \`${name}\`'s page`)
    }
  }

  let scanned: Found | null = null
  const slugsInTree = (): Found => (scanned ??= scan(pages))

  const stands = attributesOf(agent)

  let mode = args.mode
  if (args.asDefault) {
    if (args.clear.length > 0) {
      fail("--default writes where nothing is held and --clear unsets what is, so one call cannot mean both")
    }
    for (const key of ATTRIBUTES) {
      const standing = stands[key]
      if (standing === undefined || set[key] === undefined) continue
      notes.push(`note:   ${key} stands at \`${standing.slug}\` — a default does not replace what is held`)
      delete set[key]
    }
    for (const slot of defaultSlots(pages)) {
      if (stands[slot] !== undefined || set[slot] !== undefined) continue
      const slug = defaultFor(slot, pages)
      if (slug !== null) set[slot] = slug
    }
    if (mode !== null && recordedModeOf(agent) !== null) mode = null
  }

  const shaping = set["role"] !== undefined || set["domain"] !== undefined
  const derived = handlerDerives(
    pages,
    set["role"] ?? stands["role"]?.slug ?? null,
    set["domain"] ?? stands["domain"]?.slug ?? null
  )
  if (shaping && derived.persona !== null) {
    const heldPersona = set["persona"] ?? stands["persona"]?.slug ?? null
    if (!personaIsHers(pages, heldPersona)) {
      set["persona"] = derived.persona
      notes.push(`note:   persona \`${derived.persona}\` is who \`${derived.principal}\` hears from`)
    }
  }
  let principal = args.principal ?? fromHistoryPrincipal
  if (principal === null && shaping && derived.principal !== null && principalOf(agent) === null) {
    principal = derived.principal
    notes.push(`note:   principal \`${derived.principal}\`, the person this handler serves`)
  }

  const named = DECLARATIONS.filter((key) => set[key] !== undefined)
  const quiet = args.clear.length === 0 && mode === null && initiative === null && args.flex === null && args.principal === null && args.errand === null && args.registration === null && !onCall
  if (named.length === 0 && quiet) {
    if (args.asDefault) {
      process.stdout.write(
        [...notes, `seat:   ${agent}`, ...statedLines(agent)].join("\n") + "\n"
      )
      return
    }
    process.stderr.write(
      [...notes, "error: nothing to state — name at least one attribute or --mode, or --show what stands"].join("\n") + "\n"
    )
    process.exit(1)
  }

  const heldPrincipal = principal ?? principalOf(agent)?.value ?? null
  const openedByPerson =
    heldPrincipal !== null && personPrincipals(pages).includes(heldPrincipal)
  const refused = [
    ...(initiative === null ? [] : refuseInitiative(initiative, rootFor(roots, AKASHA))),
    ...(args.flex === null
      ? []
      : refuseFlex(args.flex, agent, own, (at) =>
          launchStating(launchOf(at), openedByPerson, args.parentName)
        )),
  ]
  const found: Found = slugsInTree()
  const resolved = resolveAttributes(set, [], pages, found)
  const stop = (all: readonly string[]): void => {
    process.stderr.write(
      [...notes, "refused:", ...all.map((one) => `  ${one}`), "nothing was stated"].join("\n") + "\n"
    )
    process.exit(1)
  }
  if ("refusals" in resolved) {
    stop([...resolved.refusals, ...refused])
    return
  }
  if (refused.length > 0) {
    stop(refused)
    return
  }
  const held: { -readonly [K in AttributeKey]?: Attribute } = {}
  for (const one of resolved.assigned) {
    const key = ATTRIBUTES.find((slot) => slot === one.slot)
    if (key !== undefined) held[key] = attributeFor(one.slug)
  }

  const standing: { -readonly [K in AttributeKey]?: Attribute } = { ...stands, ...held }
  for (const key of args.clear) {
    const which = ATTRIBUTES.find((slot) => slot === key)
    if (which !== undefined) delete standing[which]
  }
  if (set["persona"] !== undefined || principal !== null || args.clear.includes("persona")) {
    const wrong = refuseAnswering(pages, {
      persona: standing["persona"]?.slug ?? null,
      principal: principal ?? principalOf(agent)?.value ?? null,
    })
    if (wrong.length > 0) {
      stop(wrong)
      return
    }
  }
  const nameable = nameableFrom(agent, standing, args.flex, principal, args.clear)
  const seatName = nameStanding(agent, pages, nameable)
  const followed = await followName(agent, pages, nameable, args.takeLiveName)
  if (followed.kind === "refused") {
    stop([followed.reason])
    return
  }
  if (followed.kind === "renamed") notes.push(`name:   ${followed.name}`)

  const nowOnCall = onCall || roleGrantsOnCall(standing["role"]?.slug ?? null, pages, found)
  if (seatName !== null) {
    const said = {
      clear: args.clear,
      errand: args.errand,
      flex: args.flex,
      initiative,
      mode,
      onCall: nowOnCall,
      principal,
      registration: args.registration,
    }
    const page = writeSeatPage(
      statedNow(agent, standing, said),
      seatName,
      args.parentName
    )
    if (page.kind === "refused") {
      stop([
        `${seatPageRel(seatName)} was not written, so it stands at what it last held until the next heartbeat — ${(page.detail.split("\n")[0] ?? "").trim()}`,
      ])
      return
    }
    if (page.kind === "unstated") {
      stop([
        `${seatPageRel(seatName)} was not written: a seat page needs a domain, a role and a principal, ` +
          "and a seat whose principal is not a person also needs the seat above it",
      ])
      return
    }
  }
  const cleared = args.clear.length > 0 ? [`clear:  ${args.clear.join(", ")}`] : []
  process.stdout.write(
    [...notes, ...cleared, `seat:   ${agent}`, ...statedLines(agent), "", "Read every document above; until you do, an armed gate refuses everything but Read, Grep and Glob."].join("\n") + "\n"
  )
}

if (import.meta.main) await run(process.argv.slice(2))
