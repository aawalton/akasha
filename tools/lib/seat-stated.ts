
import * as declarations from "./attributes.ts"
import type { Principal } from "./compose-seat-name.ts"
import type { Roots } from "../../page/page.ts"
import { type StatedFromHistory, statedFromHistory } from "./seat-page-history.ts"
import { onCallOf } from "./seat-on-call.ts"
import { type FlexRecord, flexOf } from "./seat-flex.ts"
import { type ErrandRecord, errandOf } from "./seat-errand.ts"
import { type InitiativeRecord, initiativeOf } from "./seat-initiative.ts"
import { type PrincipalRecord, principalOf } from "./seat-principal.ts"
import { type RegistrationRecord, registrationAccountOf } from "./seat-registration-account.ts"
import { rotatedOf } from "./seat-rotated-session.ts"
import { type SessionRecord, sessionOf } from "./seat-session.ts"
import { type TaskRecord, taskOf } from "./seat-task.ts"
import { type TranscriptRecord, transcriptOf } from "./seat-transcript-path.ts"

export interface Stated {
  readonly agent: string
  readonly attributes: declarations.Attributes
  readonly flex: FlexRecord | null
  readonly mode: declarations.Mode
  readonly recordedMode: declarations.ModeRecord | null
  readonly principal: PrincipalRecord | null
  readonly onCall: boolean
  readonly task: TaskRecord | null
  readonly initiative: InitiativeRecord | null
  readonly errand: ErrandRecord | null
  readonly registration: RegistrationRecord | null
  readonly session: SessionRecord | null
  readonly rotated: SessionRecord | null
  readonly transcript: TranscriptRecord | null
}

export function statedOf(agent: string): Stated {
  return {
    agent,
    attributes: declarations.attributesOf(agent),
    flex: flexOf(agent),
    mode: declarations.modeOf(agent),
    recordedMode: declarations.recordedModeOf(agent),
    principal: principalOf(agent),
    onCall: onCallOf(agent),
    task: taskOf(agent),
    initiative: initiativeOf(agent),
    errand: errandOf(agent),
    registration: registrationAccountOf(agent),
    session: sessionOf(agent),
    rotated: rotatedOf(agent),
    transcript: transcriptOf(agent),
  }
}

export function pageWouldCompose(stated: Stated): boolean {
  return (
    stated.attributes.domain !== undefined &&
    stated.attributes.role !== undefined &&
    stated.principal !== null
  )
}

export function mergeHeld(standing: Stated, held: StatedFromHistory | null): Stated {
  if (held === null) return standing
  const attributes: { -readonly [K in declarations.AttributeKey]?: declarations.Attribute } = {
    ...standing.attributes,
  }
  for (const slot of declarations.ATTRIBUTES) {
    const slug = held.set[slot]
    if (attributes[slot] === undefined && slug !== undefined) attributes[slot] = { slug }
  }
  const task = held.set.task
  const principal: Principal | null = held.principal
  return {
    ...standing,
    attributes,
    principal:
      standing.principal ?? (principal === null ? null : { value: principal }),
    onCall: standing.onCall || held.onCall,
    task: standing.task ?? (task === undefined ? null : { value: task }),
    initiative:
      standing.initiative ?? (held.initiative === null ? null : { value: held.initiative }),
  }
}

export function fallBackToHistory(standing: Stated, seatName: string, roots: Roots): Stated {
  if (pageWouldCompose(standing)) return standing
  return mergeHeld(standing, statedFromHistory(seatName, roots))
}

export interface Said {
  readonly clear: readonly string[]
  readonly flex: string | null
  readonly initiative: string | null
  readonly mode: declarations.Mode | null
  readonly onCall: boolean
  readonly principal: Principal | null
  readonly task: string | null
  readonly errand: string | null
  readonly registration: string | null
}

export function statedNow(agent: string, attributes: declarations.Attributes, said: Said): Stated {
  const stood = statedOf(agent)
  const gone = new Set(said.clear)
  const kept = <T,>(key: string, held: T | null): T | null => (gone.has(key) ? null : held)
  return {
    agent,
    attributes,
    flex: said.flex === null ? kept("flex", stood.flex) : { value: said.flex },
    mode: said.mode ?? stood.mode,
    recordedMode: said.mode === null ? stood.recordedMode : { value: said.mode },
    principal: said.principal === null ? stood.principal : { value: said.principal },
    onCall: said.onCall || (!gone.has("on-call") && stood.onCall),
    task: said.task === null ? kept("task", stood.task) : { value: said.task },
    initiative:
      said.initiative === null ? kept("initiative", stood.initiative) : { value: said.initiative },
    errand: said.errand === null ? kept("errand", stood.errand) : { value: said.errand },
    registration:
      said.registration === null ? stood.registration : { value: said.registration },
    session: stood.session,
    rotated: stood.rotated,
    transcript: stood.transcript,
  }
}
