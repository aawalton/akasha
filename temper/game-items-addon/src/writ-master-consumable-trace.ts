import { getSavedVariables, isSavedVariablesReady } from "./saved-variables-ref"
import type { MasterWritSpec } from "./writ-crafting-master-decode"
import type {
  MasterConsumableOutcome,
  MasterConsumablePhase,
  MasterConsumableTrace,
} from "./writ-master-consumable-trace-types"

export function newConsumableTrace(
  this: void,
  spec: MasterWritSpec,
  needed: number,
  phase: MasterConsumablePhase,
  outcome: MasterConsumableOutcome
): MasterConsumableTrace {
  return {
    timestamp: GetTimeStamp(),
    craftType: spec.craftType,
    itemId: spec.itemId,
    materialItemId: spec.materialItemId,
    targetQuality: spec.targetQuality,
    encodedAlchemyTraits: spec.encodedAlchemyTraits,
    needed,
    phase,
    outcome,
  }
}

const MASTER_CONSUMABLE_TRACE_RING_MAX = 24

export function recordMasterConsumableTrace(this: void, trace: MasterConsumableTrace): undefined {
  if (!isSavedVariablesReady()) return
  const sv = getSavedVariables()
  if (sv.diagnostics === undefined) sv.diagnostics = {}
  const ring = sv.diagnostics.masterConsumableTraces ?? []
  ring[ring.length] = trace
  while (ring.length > MASTER_CONSUMABLE_TRACE_RING_MAX) {
    ring.splice(0, 1)
  }
  sv.diagnostics.masterConsumableTraces = ring
}
