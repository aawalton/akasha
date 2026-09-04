import type { CompanionArmorSlotId } from "../companion-armor-slots/companion-armor-slots.module.code.ts"
import type { CompanionArmorWeight } from "../companion-armor-weights/companion-armor-weights.module.code.ts"
import {
  type CompanionBaseRoleId,
  companionBaseRoles,
  getValidTraitIdsForBaseRoles,
  getValidWeaponRoleIdsForBaseRoles,
} from "../companion-base-roles/companion-base-roles.module.code.ts"
import {
  setBaseRoles,
  setCompanion,
} from "../companion-build-edits/companion-build-edits.module.code.ts"
import {
  countEmptyTraitSlots,
  setNextEmptyTrait,
  setRingQualityToLegendary,
} from "../companion-equipment-slots/companion-equipment-slots.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import {
  findBestPermutation,
  optimizeSkills,
} from "../companion-skill-optimizer/companion-skill-optimizer.module.code.ts"
import {
  type CompanionSkillSlotId,
  companionSkillSlots,
} from "../companion-skill-slots/companion-skill-slots.module.code.ts"
import {
  type CompanionSkillId,
  companionSkills,
} from "../companion-skills/companion-skills.module.code.ts"
import { calculateCompanionStats } from "../companion-stats-calculator/companion-stats-calculator.module.code.ts"
import { optimizeTraits } from "../companion-trait-optimizer/companion-trait-optimizer.module.code.ts"
import type { CompanionTraitId } from "../companion-traits/companion-traits.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import {
  getWeaponRole,
  setWeaponTypesForRole,
} from "../companion-weapon-role-match/companion-weapon-role-match.module.code.ts"
import type { CompanionWeaponRoleId } from "../companion-weapon-roles/companion-weapon-roles.module.code.ts"
import { type CompanionId, companions } from "../companions/companions.module.code.ts"

type CompanionAction =
  | { type: "select-companion"; companionId: CompanionId }
  | { type: "select-role"; roles: readonly CompanionBaseRoleId[] }
  | { type: "select-weapon-role"; weaponRoleId: CompanionWeaponRoleId }
  | { type: "select-skills"; slotId: CompanionSkillSlotId; skillId: CompanionSkillId }
  | { type: "select-armor-weights"; slotId: CompanionArmorSlotId; weight: CompanionArmorWeight }
  | { type: "select-traits"; slotKey: string; traitId: CompanionTraitId }

type Phase =
  | "select-companion"
  | "select-role"
  | "select-weapon-role"
  | "select-skills"
  | "select-traits"
  | "complete"

const NO_COMPANION: CompanionId = "no-companion"
const NO_WEAPON_ROLE: CompanionWeaponRoleId = "no-weapon-role"
const NO_SKILL: CompanionSkillId = "no-skill"
const NO_TRAIT: CompanionTraitId = "no-trait"

export function getPhase(state: CompanionState): Phase {
  if (state.companion.id === NO_COMPANION) return "select-companion"
  if (state.companion.baseRoles.length === 0) return "select-role"
  if (getWeaponRole(state) === NO_WEAPON_ROLE) return "select-weapon-role"

  for (const skillId of Object.values(state.skills["skill-bar"])) {
    if (skillId === NO_SKILL) return "select-skills"
  }

  for (const slot of Object.values(state.equipment.armor)) {
    if (slot.itemType === "armor" && slot.data.trait === NO_TRAIT) return "select-traits"
  }
  for (const slot of Object.values(state.equipment.jewelry)) {
    if (slot.itemType === "jewelry" && slot.data.trait === NO_TRAIT) return "select-traits"
  }
  for (const slot of Object.values(state.equipment.weapons)) {
    if (slot.itemType === "weapon" && slot.data.trait === NO_TRAIT) return "select-traits"
  }

  return "complete"
}

const VALID_COMPANION_IDS = companions.ids.filter((id) => id !== NO_COMPANION)
const VALID_ROLE_IDS = companionBaseRoles.ids

function getRoleMetricIds(roles: readonly CompanionBaseRoleId[]): readonly CompanionMetricId[] {
  const metrics: CompanionMetricId[] = []
  if (roles.includes("dps")) metrics.push("companion-dps-total")
  if (roles.includes("healer")) metrics.push("companion-hps-total")
  if (roles.includes("tank")) metrics.push("companion-tps-total")
  if (roles.includes("support")) {
    metrics.push("companion-support-dps")
    metrics.push("companion-support-tps")
  }
  return metrics
}

function sanitizeSkillBar(state: CompanionState): CompanionState {
  const roles = state.companion.baseRoles
  const skillBar = state.skills["skill-bar"]
  let changed = false

  const sanitized: Record<CompanionSkillSlotId, CompanionSkillId> = { ...skillBar }
  for (const slotId of companionSkillSlots.ids) {
    const skillId = skillBar[slotId]
    if (skillId !== NO_SKILL) {
      const { validRoles } = companionSkills.data[skillId]
      if (validRoles.length > 0 && !validRoles.some((r) => roles.includes(r))) {
        sanitized[slotId] = NO_SKILL
        changed = true
      }
    }
  }

  if (!changed) return state
  return { ...state, skills: { ...state.skills, "skill-bar": sanitized } }
}

export function evaluate(state: CompanionState): number {
  const metricIds = getRoleMetricIds(state.companion.baseRoles)
  if (metricIds.length === 0) return 0

  const result = calculateCompanionStats(sanitizeSkillBar(state))

  let total = 0
  for (const metricId of metricIds) {
    let value = result.metrics[metricId]?.value ?? 0
    if (metricId === "companion-tps-total") value /= 10
    if (metricId === "companion-support-tps") value /= 10
    total += value
  }
  return total
}

function refineCombination(
  baseState: CompanionState,
  skills: readonly CompanionSkillId[],
  validTraitIds: readonly CompanionTraitId[],
  evaluateFn: (state: CompanionState) => number,
  setPhase?: (phase: string) => void
): { state: CompanionState; actions: readonly CompanionAction[]; value: number } {
  const hasQuickened = validTraitIds.includes("quickened")

  if (!hasQuickened) {
    setPhase?.("permutations")
    const initialPerm = findBestPermutation(baseState, skills, evaluateFn)
    setPhase?.("traits")
    const traitResult = optimizeTraits(initialPerm.state, validTraitIds, evaluateFn)
    setPhase?.("permutations")
    const perm = findBestPermutation(traitResult.state, skills, evaluateFn)
    return {
      state: perm.state,
      actions: [...initialPerm.actions, ...traitResult.actions, ...perm.actions],
      value: perm.value,
    }
  }

  const totalSlots = countEmptyTraitSlots(baseState)
  const nonQuickenedTraits = validTraitIds.filter((id) => id !== "quickened")

  let best: { state: CompanionState; actions: CompanionAction[]; value: number } | null = null

  for (let q = 0; q <= totalSlots; q++) {
    let stateWithQ = baseState
    const quickenedActions: CompanionAction[] = []
    for (let i = 0; i < q; i++) {
      const { slotKey, state: next } = setNextEmptyTrait(stateWithQ, "quickened")
      quickenedActions.push({ type: "select-traits", slotKey, traitId: "quickened" })
      stateWithQ = next
    }

    setPhase?.("permutations")
    const perm = findBestPermutation(stateWithQ, skills, evaluateFn)

    setPhase?.("traits")
    const traitResult = optimizeTraits(perm.state, nonQuickenedTraits, evaluateFn)

    setPhase?.("permutations")
    const finalPerm = findBestPermutation(traitResult.state, skills, evaluateFn)

    if (!best || finalPerm.value > best.value) {
      best = {
        state: finalPerm.state,
        actions: [
          ...quickenedActions,
          ...perm.actions,
          ...traitResult.actions,
          ...finalPerm.actions,
        ],
        value: finalPerm.value,
      }
    }
  }

  if (!best) throw new Error("refineCombination: no iterations executed")
  return best
}

interface OptimizeResult {
  state: CompanionState
  actions: readonly CompanionAction[]
  value: number
  expanded: number
  evaluations: Record<string, number>
}

interface OptimizeProgress {
  expanded: number
  bestScore: number
  state: CompanionState
}

interface OptimizeOptions {
  onProgress?: (info: OptimizeProgress) => void
  progressInterval?: number
}

export function optimize(
  initialState: CompanionState,
  options?: OptimizeOptions
): OptimizeResult | null {
  interface BestEntry {
    state: CompanionState
    actions: readonly CompanionAction[]
    value: number
  }
  const ctx: { best: BestEntry | null; expanded: number; lastProgressTime: number } = {
    best: null,
    expanded: 0,
    lastProgressTime: 0,
  }
  const progressInterval = options?.progressInterval ?? 0

  const evaluations: Record<string, number> = {}
  let currentPhase = ""
  const countedEvaluate = (state: CompanionState): number => {
    evaluations[currentPhase] = (evaluations[currentPhase] ?? 0) + 1
    return evaluate(state)
  }
  const setPhase = (phase: string) => {
    currentPhase = phase
  }

  function reportProgress(state: CompanionState): undefined {
    if (options?.onProgress && progressInterval > 0) {
      const now = performance.now()
      if (now - ctx.lastProgressTime >= progressInterval) {
        ctx.lastProgressTime = now
        options.onProgress({
          expanded: ctx.expanded,
          bestScore: ctx.best?.value ?? 0,
          state,
        })
      }
    }
  }

  function trackBest(
    state: CompanionState,
    actions: readonly CompanionAction[],
    value: number
  ): undefined {
    if (!ctx.best || value > ctx.best.value) {
      ctx.best = { state, actions, value }
    }
  }

  function recurse(state: CompanionState, actions: readonly CompanionAction[] = []): undefined {
    ctx.expanded++
    reportProgress(state)

    const phase = getPhase(state)

    if (phase === "select-companion") {
      for (const companionId of VALID_COMPANION_IDS) {
        recurse(setCompanion(state, companionId), [
          ...actions,
          { type: "select-companion", companionId },
        ])
      }
      return
    }

    if (phase === "select-role") {
      for (const roleId of VALID_ROLE_IDS) {
        recurse(setBaseRoles(state, [roleId]), [
          ...actions,
          { type: "select-role", roles: [roleId] },
        ])
      }
      return
    }

    if (phase === "select-weapon-role") {
      for (const weaponRoleId of getValidWeaponRoleIdsForBaseRoles(state.companion.baseRoles)) {
        recurse(setWeaponTypesForRole(state, weaponRoleId), [
          ...actions,
          { type: "select-weapon-role", weaponRoleId },
        ])
      }
      return
    }

    if (phase === "select-skills") {
      state = setRingQualityToLegendary(state)
      const validTraitIds = getValidTraitIdsForBaseRoles(state.companion.baseRoles)
      currentPhase = "skills"
      const combos = optimizeSkills(state, countedEvaluate)
      for (const combo of combos) {
        const result = refineCombination(
          state,
          combo.skills,
          validTraitIds,
          countedEvaluate,
          setPhase
        )
        trackBest(result.state, [...actions, ...result.actions], result.value)
      }
      return
    }

    if (phase === "select-traits") {
      state = setRingQualityToLegendary(state)
      currentPhase = "traits"
      const traitResult = optimizeTraits(
        state,
        getValidTraitIdsForBaseRoles(state.companion.baseRoles),
        countedEvaluate
      )
      trackBest(traitResult.state, [...actions, ...traitResult.actions], traitResult.value)
      return
    }

    currentPhase = "complete"
    trackBest(state, [...actions], countedEvaluate(state))
  }

  recurse(initialState)

  if (!ctx.best) return null
  return { ...ctx.best, expanded: ctx.expanded, evaluations }
}
