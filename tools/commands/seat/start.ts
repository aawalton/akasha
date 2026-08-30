export const summary = "Start a seat: create it under a name, state what it is, and launch it where asked"

import { dataError, inputError } from "../../lib/exit.ts"
import { seatNameAdmission } from "../../lib/seat-name-admission.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { readStdinOrFile } from "../../lib/read-stdin-or-file.ts"
import {
  FLEET,
  FLEX,
  composeSeatName,
  personaDefaultsOf,
  principals,
} from "../../lib/compose-seat-name.ts"
import { compositionOf, decideSpawnName } from "../../lib/decide-spawn-name.ts"
import { DEFAULT_ACCOUNT } from "../../lib/default-account.ts"
import { refuseParentless } from "../../lib/refuse-parentless.ts"
import { refuseStatedName } from "../../lib/refuse-stated-name.ts"
import { refuseStatedParent } from "../../lib/refuse-stated-parent.ts"
import { isValidSeatName, resolveOptionalSeatId } from "../../lib/seat-handle.ts"
import { launchSeatUnderTmux } from "../../lib/launch-seat-tmux.ts"
import { seatByName } from "../../lib/seat-by-name.ts"
import { mintNamedAgent } from "../../lib/seat-name-bind.ts"
import { resolveStatedIdentity } from "../../lib/resolve-stated-identity.ts"
import { refuseHeldName } from "../../lib/seat-name-claim.ts"
import { AKASHA, resolveRoots, rootFor } from "../../../repo/roots/roots"
import { defaultFor } from "../../lib/seat-resolve.ts"
import { handlerDerives, principalIsPerson, refuseAnswering } from "../../lib/seat-answering.ts"
import {
  SEAT_MODES,
  SEAT_MODE_HEADLESS,
  SEAT_MODE_INTERACTIVE,
  isSeatMode,
} from "../../lib/seat-modes.ts"
import { composedNameOf } from "../../lib/seat-rename.ts"
import { setTurnState } from "../../lib/seat-turn.ts"
import { spawnSeat, type StatedIdentity } from "../../lib/spawn-seat.ts"
import { stateSpawnedSeat } from "../../lib/state-spawned-seat.ts"
import type { StatedAgentSlots } from "../../lib/supervisor-rebind-deps.ts"
import { help } from "../../lib/seat-start-help.ts"

export { help }

async function readFlexFlag(raw: string | undefined): Promise<string | null> {
  if (raw === undefined) return null
  if (!FLEX.test(raw)) {
    throw inputError(
      `invalid --flex '${raw}': a flex value is \`flex-\` and a number, which is what keeps it out of every vocabulary`
    )
  }
  return raw
}

export default async function seatStart(args: readonly string[]): Promise<void> {
  const statedParent = refuseStatedParent(args)
  if (statedParent !== null) throw inputError(statedParent)
  const statedName = refuseStatedName(args)
  if (statedName !== null) throw inputError(statedName)
  const parsed = parseArgs(help, args)

  const startMode = parsed.string("--start-mode") ?? SEAT_MODE_INTERACTIVE
  if (!isSeatMode(startMode)) {
    throw inputError(
      `invalid --start-mode '${startMode}' (expected ${SEAT_MODES.map((one) => `'${one}'`).join(" or ")})`
    )
  }
  const headless = startMode === SEAT_MODE_HEADLESS

  const root = rootFor(resolveRoots(), AKASHA)
  const stated: { -readonly [K in keyof StatedAgentSlots]: StatedAgentSlots[K] } = {}
  for (const slot of ["persona", "role", "domain"] as const) {
    const value = parsed.string(`--${slot}`)?.trim()
    if (value !== undefined && value !== "") stated[slot] = value
  }

  const derived = handlerDerives(root, stated.role ?? null, stated.domain ?? null)
  if (stated.persona === undefined && derived.persona !== null) stated.persona = derived.persona

  const askedPrincipal = parsed.string("--principal")?.trim()
  if (askedPrincipal !== undefined && !principals(root).includes(askedPrincipal)) {
    throw inputError(
      `invalid --principal '${askedPrincipal}': a seat's output is produced for one of ${principals(root).join(", ")}`
    )
  }
  const principal = askedPrincipal ?? derived.principal ?? (headless ? FLEET : undefined)

  const answering = refuseAnswering(root, {
    persona: stated.persona ?? null,
    principal: principal ?? null,
  })
  if (answering.length > 0) throw inputError(answering.join(" "))
  if (principal !== undefined) stated.principal = principal

  const parent = await resolveOptionalSeatId(undefined)
  const orphaned = refuseParentless(parent, !principalIsPerson(root, principal ?? null))
  if (orphaned !== null) throw inputError(orphaned)

  if (stated.persona !== undefined) {
    const defaults = personaDefaultsOf(root, stated.persona)
    if (defaults !== null) {
      if (stated.role === undefined && defaults.role !== null) stated.role = defaults.role
      if (stated.domain === undefined && defaults.domain !== null) stated.domain = defaults.domain
    }
  }

  let roleIsDefault = false
  if (stated.role === undefined) {
    const fallback = defaultFor("role", root)
    if (fallback !== null) {
      stated.role = fallback
      roleIsDefault = true
    }
  }

  const flex = await readFlexFlag(parsed.string("--flex"))

  const statedIdentity: StatedIdentity = {
    persona: stated.persona,
    domain: stated.domain,
    role: stated.role,
  }
  const unresolved = await resolveStatedIdentity(statedIdentity)
  if (unresolved !== null) throw inputError(unresolved)

  const spelled = composeSeatName(
    {
      attributes: {
        persona: stated.persona ?? null,
        domain: stated.domain ?? null,
        role: stated.role ?? null,
      },
      flex,
      principal: principal ?? null,
    },
    root
  )
  const composed = compositionOf({ spelled, role: stated.role ?? null, roleIsDefault })
  const named = decideSpawnName({ composed })
  if (named.kind === "reject") throw inputError(named.reason)
  const name = named.name
  if (!isValidSeatName(name)) {
    throw inputError(
      `invalid seat name '${name}' (expected lowercase kebab-case, length 2-128, must contain non-hex letter)`
    )
  }

  const account = parsed.string("--account") ?? DEFAULT_ACCOUNT
  const json = parsed.boolean("--json")

  if (headless) {
    const promptFile = parsed.string("--prompt-file")
    const prompt =
      promptFile === undefined ? parsed.requireString("--prompt") : await readStdinOrFile(promptFile)
    if (prompt.length === 0) throw inputError("--prompt / --prompt-file payload is empty")
    const handle = await spawnSeat({
      name,
      prompt,
      account,
      parent,
      statedIdentity,
      principal: principal ?? null,
      flex,
      initiative: parsed.string("--initiative") ?? null,
      modelOverride: parsed.string("--model"),
      anthropicBaseUrl: parsed.string("--anthropic-base-url"),
      anthropicAuthToken: parsed.string("--anthropic-auth-token"),
    })
    if (json) {
      process.stdout.write(
        `${JSON.stringify({ agent_id: handle.agentId, name: handle.name, start_mode: startMode, pid: handle.pid })}\n`
      )
      return
    }
    process.stdout.write(`${handle.agentId}\t${handle.name}\t${startMode}\n`)
    return
  }

  const held = refuseHeldName(seatByName(name))
  if (held !== null) throw dataError(held)

  const agentId = await mintNamedAgent(name, seatNameAdmission(name))

  const unstated = await stateSpawnedSeat({
    agentId,
    mode: startMode,
    principal: principal ?? null,
    persona: stated.persona,
    domain: stated.domain,
    role: stated.role,
    flex,
    initiative: parsed.string("--initiative") ?? null,
    parentName: parent === null ? null : composedNameOf(parent),
    account,
  })
  if (unstated.length > 0) {
    throw dataError(
      `[seat start] ${name}: nothing was stated, so no page stands for this seat and nothing reads ` +
        `it as running — ${unstated.join("; ")}. A seat with no page composes no prompt, so it is ` +
        "refused here rather than launched blank."
    )
  }

  setTurnState(agentId, "idle")

  if (!parsed.boolean("--no-launch")) {
    await launchSeatUnderTmux({ name, agentId, account, prompt: "", mode: startMode })
  }

  if (json) {
    process.stdout.write(`${JSON.stringify({ agent_id: agentId, name, start_mode: startMode })}\n`)
    return
  }
  process.stdout.write(`${agentId}\n`)
}
