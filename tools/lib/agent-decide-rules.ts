import {
  decidePending,
  type OutboundRecency,
  PENDING_VERDICTS,
  pendingAllowsStopAlone,
} from "@akasha/seat-system/seat-pending"
import { SEAT_PRESENCES } from "@akasha/seat-system/seat-proc-key"
import {
  decideRelaunchName,
  RELAUNCH_NAME_OUTCOMES,
} from "@akasha/seat-system/seat-relaunch-name-decide"
import {
  decideRevivePlacement,
  REVIVE_PLACEMENTS,
} from "@akasha/seat-system/seat-revive-placement-decide"
import {
  decideSpawnName,
  type SeatNameComposition,
  SPAWN_NAME_DECISIONS,
} from "@akasha/seat-system/seat-spawn-name-decide"
import { fail } from "./command.ts"
import { bool, maybe, num, obj, oneOf, str } from "./narrow.ts"
import { decideSkillTokenGuard, SKILL_TOKEN_GUARD_DECISIONS } from "./skill-token-guard.ts"
import { decideSpawnGuard, SPAWN_GUARD_DECISIONS } from "./spawn-guard.ts"

function sub(
  value: unknown,
  path: string,
  handlers: Readonly<Record<string, (value: unknown, path: string) => unknown>>
): Record<string, unknown> {
  const question = obj(value, path)
  const asked = Object.keys(question)
  const keys = Object.keys(handlers)
  if (asked.length === 0) fail(`\`${path}\` asks nothing — it takes ${keys.join(", ")}`)
  const stray = asked.filter((key) => !keys.includes(key))
  if (stray.length > 0)
    fail(
      `\`${stray.map((key) => `${path}.${key}`).join("`, `")}\` names nothing this rule ` +
        `answers — it takes ${keys.join(", ")}`
    )
  const answers: Record<string, unknown> = {}
  for (const key of asked) {
    const handler = handlers[key]
    if (handler === undefined) continue
    answers[key] = handler(question[key], `${path}.${key}`)
  }
  return answers
}

function seatNameComposition(value: unknown, path: string): SeatNameComposition {
  const held = obj(value, path)
  const kind = oneOf(held.kind, `${path}.kind`, ["composed", "none", "failed"] as const)
  if (kind === "composed") return { kind, name: str(held.name, `${path}.name`) }
  if (kind === "failed") return { kind, reason: str(held.reason, `${path}.reason`) }
  return { kind }
}

function outboundRecency(value: unknown, path: string): OutboundRecency {
  const held = obj(value, path)
  const kind = oneOf(held.kind, `${path}.kind`, ["sent", "none-sent"] as const)
  if (kind === "none-sent") return { kind }
  return { kind, atMs: num(held.atMs, `${path}.atMs`) }
}

export const AGENT_RULE_DECISIONS: Readonly<
  Record<string, (value: unknown, path: string) => unknown>
> = {
  spawnGuard: (value, path) =>
    sub(value, path, {
      decisions: () => SPAWN_GUARD_DECISIONS,
      decideSpawnGuard: (v, p) => {
        const o = obj(v, p)
        return decideSpawnGuard({ holder: oneOf(o.holder, `${p}.holder`, SEAT_PRESENCES) })
      },
    }),

  skillTokenGuard: (value, path) =>
    sub(value, path, {
      decisions: () => SKILL_TOKEN_GUARD_DECISIONS,
      decideSkillTokenGuard: (v, p) => decideSkillTokenGuard(str(obj(v, p).prompt, `${p}.prompt`)),
    }),

  relaunchName: (value, path) =>
    sub(value, path, {
      outcomes: () => RELAUNCH_NAME_OUTCOMES,
      decideRelaunchName: (v, p) => {
        const o = obj(v, p)
        return decideRelaunchName({
          rowName: maybe(o.rowName, `${p}.rowName`, str),
          providedName: maybe(o.providedName, `${p}.providedName`, str),
        })
      },
    }),

  spawnName: (value, path) =>
    sub(value, path, {
      decisions: () => SPAWN_NAME_DECISIONS,
      decideSpawnName: (v, p) =>
        decideSpawnName({ composed: seatNameComposition(obj(v, p).composed, `${p}.composed`) }),
    }),

  revivePlacement: (value, path) =>
    sub(value, path, {
      placements: () => REVIVE_PLACEMENTS,
      decideRevivePlacement: (v, p) => {
        const o = obj(v, p)
        return decideRevivePlacement({
          priorLaunchOpened: bool(o.priorLaunchOpened, `${p}.priorLaunchOpened`),
          isLive: bool(o.isLive, `${p}.isLive`),
        })
      },
    }),

  pending: (value, path) =>
    sub(value, path, {
      verdicts: () => PENDING_VERDICTS,
      decidePending: (v, p) => {
        const o = obj(v, p)
        return decidePending({
          selfStopped: bool(o.selfStopped, `${p}.selfStopped`),
          liveChildren: num(o.liveChildren, `${p}.liveChildren`),
          outbound: outboundRecency(o.outbound, `${p}.outbound`),
        })
      },
      allowsStopAlone: (v, p) => pendingAllowsStopAlone(oneOf(v, p, PENDING_VERDICTS)),
    }),
}
