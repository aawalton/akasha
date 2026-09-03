import { clearRequestedAction } from "@akasha/seat-system/supervisor-agent-action-clear"
import { SEAT_START_DIR } from "@akasha/seat-system/supervisor-config"
import { decideReviveLaunch } from "./decide-revive-launch.ts"
import { DEFAULT_ACCOUNT } from "./default-account.ts"
import { dataError, operationalError } from "./exit.ts"
import {
  type LaunchSeatOpts,
  type LaunchSeatResult,
  launchSeatUnderTmux,
} from "./launch-seat-tmux.ts"
import { resolveRelaunchTarget } from "./relaunch-target.ts"
import type { SeatPresence } from "./seat-proc-key.ts"
import { terminatePriorAgentTree } from "./seat-recovery.ts"
import { decideSpawnGuard, type SpawnGuardDecision, type SpawnGuardInput } from "./spawn-guard.ts"
import {
  type MaterializeTranscriptResult,
  materializeLocalTranscript,
} from "./transcript-materialize.ts"

export interface ResumeTarget {
  readonly name: string | null
  readonly account: string | null
  readonly presence: SeatPresence
  readonly sessionId: string | null
}

export type ResolvedResumeTarget = { readonly target: ResumeTarget } | { readonly error: string }

export interface SeatHandle {
  readonly agentId: string
  readonly name: string
  readonly pid: number
  readonly sessionId: string | undefined
  readonly status: string
}

export interface ResumeSeatInput {
  readonly agentId: string
  readonly prompt?: string
  readonly bootPrompt?: string
}

export interface MaterializeInput {
  readonly agentId: string
  readonly sessionId: string
  readonly cwd: string
}

export interface ResumeSeatDeps {
  readonly resolveTarget: (agentId: string) => Promise<ResolvedResumeTarget>
  readonly decideGuard: (input: SpawnGuardInput) => SpawnGuardDecision
  readonly materializeTranscript: (input: MaterializeInput) => Promise<MaterializeTranscriptResult>
  readonly clearRequestedAction: (agentId: string) => Promise<void>
  readonly terminatePriorTree: (agentId: string) => Promise<readonly number[]>
  readonly launch: (opts: LaunchSeatOpts) => Promise<LaunchSeatResult>
}

export async function liveResumeSeatDeps(): Promise<ResumeSeatDeps> {
  return {
    resolveTarget: resolveRelaunchTarget,
    decideGuard: decideSpawnGuard,
    materializeTranscript: materializeLocalTranscript,
    clearRequestedAction,
    terminatePriorTree: terminatePriorAgentTree,
    launch: launchSeatUnderTmux,
  }
}

export async function resumeSeat(
  input: ResumeSeatInput,
  injected?: ResumeSeatDeps
): Promise<SeatHandle> {
  const deps = injected ?? (await liveResumeSeatDeps())

  const resolved = await deps.resolveTarget(input.agentId)
  if ("error" in resolved) throw dataError(resolved.error)
  const { name, account, presence, sessionId } = resolved.target

  if (name === null) {
    throw dataError(
      `agent ${input.agentId} has no stable name — revive targets named agents ` +
        "(set one with `bun tools/seat.ts` before stopping, or resume interactively with `sr`)"
    )
  }

  const guard = deps.decideGuard({ holder: presence })
  if (guard.kind === "reject") {
    throw dataError(
      `agent '${name}' is already live — stop it first with \`akasha seat supervisor stop ${name}\`. ` +
        "`ops seat resume` reaches this only where nothing live holds the seat; against a live " +
        "one it cycles the seat in place rather than launching a second supervisor over it."
    )
  }

  const plan = decideReviveLaunch({
    sessionId,
    prompt: input.prompt,
    bootPrompt: input.bootPrompt,
  })

  if (plan.materializeTranscript && sessionId !== null) {
    await deps.materializeTranscript({
      agentId: input.agentId,
      sessionId,
      cwd: SEAT_START_DIR,
    })
  }

  await deps.clearRequestedAction(input.agentId)
  await deps.terminatePriorTree(input.agentId)

  let launched: LaunchSeatResult
  try {
    launched = await deps.launch({
      name,
      agentId: input.agentId,
      account: account ?? DEFAULT_ACCOUNT,
      prompt: plan.prompt,
      mode: "headless",
      resumeSessionId: plan.resumeSessionId,
    })
  } catch (err) {
    throw operationalError(err instanceof Error ? err.message : String(err))
  }
  const { pid } = launched

  return {
    agentId: input.agentId,
    name,
    pid,
    sessionId: plan.resumeSessionId,
    status: plan.status,
  }
}
