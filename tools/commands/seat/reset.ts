export const summary = "Reset a seat: take the agent out of it and sit a new one down holding every declaration it states"

import { composeSeatName } from "../../lib/compose-seat-name.ts"
import { DEFAULT_ACCOUNT } from "../../lib/default-account.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { killSeatSession, launchSeatUnderTmux } from "../../lib/launch-seat-tmux.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { AKASHA, resolveRoots, rootFor } from "../../../repo/roots/roots"
import { flexInName } from "../../lib/seat-flex.ts"
import { resolveSeatTargetCli } from "../../lib/seat-handle.ts"
import { SEAT_MODES, SEAT_MODE_HEADLESS, isSeatMode } from "../../lib/seat-modes.ts"
import { seatNameAdmission } from "../../lib/seat-name-admission.ts"
import { mintNamedAgent } from "../../lib/seat-name-bind.ts"
import { type SeatFromHistory, seatFromHistory } from "../../lib/seat-page-history.ts"
import { principalSeatNameOf } from "../../lib/seat-principal.ts"
import { type Stated, pageWouldCompose, statedOf } from "../../lib/seat-stated.ts"
import { setTurnState } from "../../lib/seat-turn.ts"
import { stateSpawnedSeat } from "../../lib/state-spawned-seat.ts"
import { A_RESET, stopSeat } from "../../lib/stop-seat.ts"

import { help } from "../../lib/seat-reset-help.ts"

export { help }

interface Kept {
  readonly persona: string | null
  readonly domain: string | null
  readonly role: string | null
  readonly principal: string | null
  readonly flex: string | null
  readonly initiative: string | null
  readonly account: string
  readonly parentName: string | null
  readonly mode: string
  readonly onCall: boolean
}

function keptStanding(agentId: string, stated: Stated): Kept {
  return {
    persona: stated.attributes.persona?.slug ?? null,
    domain: stated.attributes.domain?.slug ?? null,
    role: stated.attributes.role?.slug ?? null,
    principal: stated.principal?.value ?? null,
    flex: stated.flex?.value ?? null,
    initiative: stated.initiative?.value ?? null,
    account: stated.registration?.value ?? DEFAULT_ACCOUNT,
    parentName: principalSeatNameOf(agentId),
    mode: stated.mode,
    onCall: stated.onCall,
  }
}

function keptRecovered(was: SeatFromHistory): Kept {
  const mode = was.mode
  return {
    persona: was.set.persona ?? null,
    domain: was.set.domain ?? null,
    role: was.set.role ?? null,
    principal: was.principal,
    flex: flexInName(was.seatName),
    initiative: was.initiative,
    account: was.account ?? DEFAULT_ACCOUNT,
    parentName: was.parentName,
    mode: mode !== null && isSeatMode(mode) ? mode : SEAT_MODE_HEADLESS,
    onCall: was.onCall,
  }
}

export default async function seatReset(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const input = parsed.positionals[0]
  if (input === undefined) {
    throw inputError(
      "no <agent-id> given — `ops seat reset` names the seat it resets and takes no default. " +
        "`ops seat stop` defaults to self because a seat knows when it is finished; a reset " +
        "takes the agent out of the seat, so a seat resetting itself would destroy the turn " +
        "issuing the command before it could answer. Name the seat, or run `ops seat resume` " +
        "to come back as yourself."
    )
  }

  const asked = parsed.string("--start-mode")
  if (asked !== undefined && !isSeatMode(asked)) {
    throw inputError(
      `invalid --start-mode '${asked}' (expected ${SEAT_MODES.map((one) => `'${one}'`).join(" or ")})`
    )
  }

  const agentId = await resolveSeatTargetCli(input)

  if (process.env.AGENT_ID === agentId) {
    throw inputError(
      `'${input}' is the seat running this command. A reset takes the agent out of the seat, so ` +
        "a seat resetting itself destroys the turn issuing the command before it can answer. " +
        "`ops seat resume` is how a seat comes back; a reset is somebody else's to run."
    )
  }

  const roots = resolveRoots()

  const standing = statedOf(agentId)
  const recovered = pageWouldCompose(standing) ? null : seatFromHistory(agentId, roots)
  const kept = recovered === null ? keptStanding(agentId, standing) : keptRecovered(recovered)

  if (kept.domain === null || kept.role === null || kept.principal === null) {
    throw dataError(
      `seat '${input}' states no domain, role and principal on a page standing for it, and the ` +
        "last page committed for it in this repository states none either. A stopped " +
        "seat's page is taken by the stop, which commits it, so a seat that ever stated what it " +
        "is can be read back from there — and nothing here can. State what the seat is with " +
        "`ops instructions seat`, or start a fresh one with `ops seat start`."
    )
  }

  const mode = asked ?? kept.mode

  const name = composeSeatName(
    {
      attributes: { persona: kept.persona, domain: kept.domain, role: kept.role },
      flex: kept.flex,
      principal: kept.principal,
    },
    rootFor(roots, AKASHA)
  )
  if (name === null) {
    throw dataError(
      `seat '${input}' states nothing that spells a name, so the reset has no seat to sit the ` +
        "new agent down in."
    )
  }

  await stopSeat({ agentId, force: parsed.boolean("--force"), saying: A_RESET })

  await killSeatSession(name)

  const fresh = await mintNamedAgent(name, seatNameAdmission(name))

  const unstated = await stateSpawnedSeat({
    agentId: fresh,
    mode,
    principal: kept.principal,
    ...(kept.persona === null ? {} : { persona: kept.persona }),
    ...(kept.domain === null ? {} : { domain: kept.domain }),
    ...(kept.role === null ? {} : { role: kept.role }),
    flex: kept.flex,
    initiative: kept.initiative,
    onCall: kept.onCall,
    parentName: kept.parentName,
    account: kept.account,
  })
  if (unstated.length > 0) {
    process.stderr.write(
      `[seat reset] ${name}: nothing was stated, so no page stands for this seat and nothing ` +
        `reads it as running — ${unstated.join("; ")}\n`
    )
  }

  setTurnState(fresh, "idle")

  await launchSeatUnderTmux({
    name,
    agentId: fresh,
    account: kept.account,
    prompt: "",
    mode,
  })

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify({ agent_id: fresh, name, start_mode: mode })}\n`)
    return
  }
  process.stdout.write(`${fresh}\t${name}\t${mode}\n`)
}
