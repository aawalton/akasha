import {
  getSavedVariables,
  isSavedVariablesReady,
} from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { MasterWritSpec } from "../inventory-writ-crafting-master-decode/inventory-writ-crafting-master-decode.module.code.ts"
import type {
  MasterConsumableOutcome,
  MasterConsumablePhase,
  MasterConsumableTrace,
} from "../inventory-writ-master-consumable-trace-types/inventory-writ-master-consumable-trace-types.module.code.ts"
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
