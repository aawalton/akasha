
import { attributesOf, recordedModeOf } from "./attributes.ts"
import { principalOf } from "./seat-principal.ts"
import { taskOf } from "./seat-task.ts"
import type { StatedAgentSlots } from "./supervisor-rebind-deps.ts"

export type CarriedAgentName = {
  name: string
  title: string | undefined
  slots: StatedAgentSlots
}

type CarriedRow =
  | {
      name?: string | null
      title?: string | null
      role?: string | null
      domain?: string | null
      persona?: string | null
      task?: string | null
      mode?: string | null
      principal?: string | null
    }
  | null
  | undefined

export function pickCarriedAgentName(row: CarriedRow): CarriedAgentName | null {
  if (row == null) return null
  const name = row.name
  if (name == null || name.length === 0) return null
  const held = (value: string | null | undefined): string | undefined =>
    value != null && value.length > 0 ? value : undefined
  const role = held(row.role)
  const domain = held(row.domain)
  const persona = held(row.persona)
  const task = held(row.task)
  const mode = held(row.mode)
  const principal = held(row.principal)
  const slots: StatedAgentSlots = {
    ...(role === undefined ? {} : { role }),
    ...(domain === undefined ? {} : { domain }),
    ...(persona === undefined ? {} : { persona }),
    ...(task === undefined ? {} : { task }),
    ...(mode === undefined ? {} : { mode }),
    ...(principal === undefined ? {} : { principal }),
  }
  return {
    name,
    title: row.title != null && row.title.length > 0 ? row.title : undefined,
    slots,
  }
}

export function carriedForSeat(agentId: string, row: CarriedRow): CarriedAgentName | null {
  const carried = pickCarriedAgentName(row)
  if (carried === null) return null
  const stated = attributesOf(agentId)
  const role = stated.role?.slug
  const domain = stated.domain?.slug
  const persona = stated.persona?.slug
  const task = taskOf(agentId)?.value
  const mode = recordedModeOf(agentId)?.value
  const principal = principalOf(agentId)?.value
  const slots: StatedAgentSlots = {
    ...carried.slots,
    ...(role == null ? {} : { role }),
    ...(domain == null ? {} : { domain }),
    ...(persona == null ? {} : { persona }),
    ...(task == null ? {} : { task }),
    ...(mode == null ? {} : { mode }),
    ...(principal == null ? {} : { principal }),
  }
  return { ...carried, slots }
}
