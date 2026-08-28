import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { AsyncCheck } from "../lib/check.ts"
import {
  applyRatchet,
  censusFlagReferences,
  liveCarriers,
  nextRatchet,
  referenceCarrier,
  referenceKey,
  refusals,
  splitBySubject,
  surfaceOf,
  UNIVERSAL_FLAGS,
  type CliHelpViolation,
  type FlagSurface,
} from "../lib/cli-help-flag-references.ts"
import { commandSurface } from "../lib/command-surface.ts"
import { judge, over } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "cli-help-flag-references"

const RATCHET = "tools/lib/cli-help-flag-references.ratchet.json"

class RatchetUnreadable extends Error {
  constructor(
    readonly path: string,
    readonly detail: string
  ) {
    super(`${path}: ${detail}`)
  }
}

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

function acceptedFrom(text: string): readonly string[] {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch (err) {
    throw new RatchetUnreadable(RATCHET, messageOf(err))
  }
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    throw new RatchetUnreadable(RATCHET, "the whole file is not an object")
  }
  const held = raw as Record<string, unknown>
  const surplus = Object.keys(held).filter((key) => key !== "accepted")
  if (surplus.length > 0) {
    throw new RatchetUnreadable(
      RATCHET,
      `it states ${surplus.map((key) => `\`${key}\``).join(", ")} beside \`accepted\`, and nothing reads those`
    )
  }
  const accepted = held.accepted
  if (!Array.isArray(accepted)) {
    throw new RatchetUnreadable(RATCHET, "`accepted` is not an array of entry keys")
  }
  const entries: string[] = []
  for (const entry of accepted) {
    if (typeof entry !== "string") {
      throw new RatchetUnreadable(
        RATCHET,
        `an entry under \`accepted\` states ${JSON.stringify(entry)} rather than an entry key`
      )
    }
    entries.push(entry)
  }
  return entries
}

function refusalFor(one: CliHelpViolation, root: string): string {
  if (one.refusal === "accepted-subject-departed") {
    return refusalText(
      "cli-help-accepted-subject-departed",
      { entry: one.departed.entry, carrier: one.departed.carrier },
      root
    )
  }
  const reference = one.reference
  if (reference.spanLedBy !== null) {
    return refusalText(
      "cli-help-reference-unattributable",
      {
        command: reference.command,
        kind: reference.kind,
        field: reference.field,
        token: reference.token,
        span: reference.spanLedBy,
      },
      root
    )
  }
  return refusalText(
    "cli-help-reference-added",
    {
      command: reference.command,
      kind: reference.kind,
      field: reference.field,
      token: reference.token,
    },
    root
  )
}

export const cliHelpFlagReferences: AsyncCheck = async (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const empty = over(0, "command surface(s)")

  let accepted: readonly string[]
  try {
    accepted = acceptedFrom(repo.read(RATCHET))
  } catch (err) {
    const said =
      err instanceof RatchetUnreadable ? err : new RatchetUnreadable(RATCHET, messageOf(err))
    return {
      ...judge(NAME, `${said.path} could not be read as an accepted list`, [
        refusalText("cli-help-ratchet-unreadable", { path: said.path, detail: said.detail }, root),
      ]),
      population: empty,
    }
  }

  const { verbs, unreadable } = await commandSurface()
  if (unreadable.length > 0) {
    return {
      ...judge(
        NAME,
        `${unreadable.length} command(s) would not load, so this was measured over a short surface`,
        unreadable.map((detail) => refusalText("command-surface-unread", { detail }, root))
      ),
      population: empty,
    }
  }

  const surfaces: readonly FlagSurface[] = verbs.map((verb) =>
    surfaceOf(verb.command, verb.help, verb.document?.help)
  )
  const census = censusFlagReferences({ surfaces, universalFlags: UNIVERSAL_FLAGS })
  const verdict = applyRatchet(census.unattributed, accepted)
  const split = splitBySubject({
    stale: verdict.stale,
    carrierOf: referenceCarrier,
    liveCarriers: liveCarriers(surfaces),
  })
  const shrink = nextRatchet(census.unattributed.map(referenceKey), accepted)
  const tightening =
    shrink.kind === "tightened" && shrink.dropped > 0
      ? `; ${split.repaired.length} accepted entry(ies) whose reference is gone and ` +
        `${split.departed.length} whose command surface left could be dropped, leaving ${shrink.accepted.length}`
      : ""

  return {
    ...judge(
      NAME,
      `${census.commandsScanned} command surface(s) and ${census.proseSites} prose site(s) read, ` +
        `${census.tokens} flag token(s): ${census.byVerdict.own} own, ${census.byVerdict.other} other, ` +
        `${census.byVerdict.foreign} foreign, ${census.byVerdict.unattributed} unattributed; ` +
        `${verdict.grandfathered.length} accepted in ${RATCHET}${tightening}`,
      refusals({ added: verdict.failures, departed: split.departed }).map((one) =>
        refusalFor(one, root)
      )
    ),
    population: over(census.commandsScanned, "command surface(s)"),
  }
}
