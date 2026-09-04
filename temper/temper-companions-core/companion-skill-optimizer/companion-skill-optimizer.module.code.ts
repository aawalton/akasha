import { getSkillCooldown } from "../companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import {
  type CompanionSkillSlotId,
  companionSkillSlots,
} from "../companion-skill-slots/companion-skill-slots.module.code.ts"
import {
  type CompanionSkillId,
  companionSkills,
} from "../companion-skills/companion-skills.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import { getValidSkillIds } from "../companion-valid-skills/companion-valid-skills.module.code.ts"
import type { CompanionWeaponTypeId } from "../companion-weapon-types/companion-weapon-types.module.code.ts"
import { companionSkillLines } from "../skill-lines-by-companion/skill-lines-by-companion.module.code.ts"

const TAUNT_MAX_COOLDOWN = 16
const TOP_N_SKILLS = 15
const CHECK_EXTRA_SKILLS = 3

const WEAPON_ELEMENT_TO_TYPE: Record<string, CompanionWeaponTypeId> = {
  flame: "inferno-staff",
  frost: "ice-staff",
  shock: "lightning-staff",
}

function isTauntSkill(skillId: CompanionSkillId, state: CompanionState): boolean {
  const skill = companionSkills.data[skillId]
  const hasTaunt = skill.effects.some((e) => {
    if (e.type !== "apply-status" || e.status.status !== "taunt") return false
    if ("conditions" in e && e.conditions) {
      const weaponCondition = e.conditions.find((c) => c.type === "weapon-type")
      if (weaponCondition) {
        const mainHand = state.equipment.weapons["main-hand"]
        if (mainHand.itemType === "empty") return false
        const requiredType = WEAPON_ELEMENT_TO_TYPE[weaponCondition.weaponType]
        return mainHand.data.type === requiredType
      }
    }
    return true
  })
  const cooldown = getSkillCooldown(skill)
  return hasTaunt && cooldown > 0 && cooldown <= TAUNT_MAX_COOLDOWN
}

function roleRequiresTaunt(state: CompanionState): boolean {
  return state.companion.baseRoles.includes("tank")
}

interface SkillOptimizeResult {
  state: CompanionState
  actions: readonly {
    type: "select-skills"
    slotId: CompanionSkillSlotId
    skillId: CompanionSkillId
  }[]
  value: number
}

interface SkillComboResult {
  skills: readonly CompanionSkillId[]
  score: number
}

const ACTIVE_SLOT_IDS = companionSkillSlots.ids.filter(
  (id): id is Exclude<CompanionSkillSlotId, "ultimate"> => id !== "ultimate"
)

export function getFilteredSkillIds(state: CompanionState): readonly CompanionSkillId[] {
  const roles = state.companion.baseRoles
  const parallelUseful = isParallelUseful(state)
  return getValidSkillIds(state).filter((skillId) => {
    const { validRoles } = companionSkills.data[skillId]
    if (!(validRoles.length === 0 || validRoles.some((r) => roles.includes(r)))) return false
    if (skillId === PARALLEL_SKILL_ID && !parallelUseful) return false
    return true
  })
}

function isBuffSkill(skillId: CompanionSkillId): boolean {
  const skill = companionSkills.data[skillId]
  return skill.effects.some((e) => e.type === "apply-buff")
}

function isArmorSkill(skillId: CompanionSkillId): boolean {
  const line = companionSkillLines.data[companionSkills.data[skillId].skillLineId]
  return line.category === "armor"
}

function buildSkillBar(
  state: CompanionState,
  skills: readonly CompanionSkillId[]
): { state: CompanionState; actions: SkillOptimizeResult["actions"] } {
  const existingUltimate = state.skills["skill-bar"].ultimate
  const skillBar: Record<CompanionSkillSlotId, CompanionSkillId> = {
    ...state.skills["skill-bar"],
  }

  const actions: {
    type: "select-skills"
    slotId: CompanionSkillSlotId
    skillId: CompanionSkillId
  }[] = []

  for (const [i, slotId] of ACTIVE_SLOT_IDS.entries()) {
    const skillId: CompanionSkillId = skills[i] ?? "no-skill"
    skillBar[slotId] = skillId
    actions.push({ type: "select-skills", slotId, skillId })
  }

  skillBar.ultimate = existingUltimate

  return {
    state: {
      ...state,
      skills: {
        ...state.skills,
        "skill-bar": skillBar,
      },
    },
    actions,
  }
}

function* permutations<T>(items: readonly T[]): Generator<T[]> {
  if (items.length <= 1) {
    yield [...items]
    return
  }
  for (const [i, item] of items.entries()) {
    const rest = [...items.slice(0, i), ...items.slice(i + 1)]
    for (const perm of permutations(rest)) {
      yield [item, ...perm]
    }
  }
}

export function findBestPermutation(
  state: CompanionState,
  skills: readonly CompanionSkillId[],
  evaluateFn: (state: CompanionState) => number
): SkillOptimizeResult {
  const needsTaunt = roleRequiresTaunt(state)
  let best: SkillOptimizeResult = { state, actions: [], value: -Infinity }

  for (const perm of permutations(skills)) {
    const first = perm[0]
    if (needsTaunt && first !== undefined && !isTauntSkill(first, state)) continue
    const { state: permState, actions } = buildSkillBar(state, perm)
    const score = evaluateFn(permState)
    if (score > best.value) {
      best = { state: permState, actions, value: score }
    }
  }

  return best
}

function* combinations<T>(items: readonly T[], k: number): Generator<T[]> {
  if (k === 0) {
    yield []
    return
  }
  if (k > items.length) return
  for (const [i, item] of items.entries()) {
    if (i > items.length - k) break
    for (const rest of combinations(items.slice(i + 1), k - 1)) {
      yield [item, ...rest]
    }
  }
}

function createTopN(n: number) {
  const entries: { skills: readonly CompanionSkillId[]; score: number }[] = []
  const seen = new Set<string>()
  let minScore = -Infinity

  return {
    add(skills: readonly CompanionSkillId[], score: number) {
      const key = [...skills].sort().join(",")
      if (seen.has(key)) return
      if (entries.length >= n && score <= minScore) return
      seen.add(key)
      entries.push({ skills, score })
      entries.sort((a, b) => b.score - a.score)
      if (entries.length > n) entries.length = n
      const last = entries[entries.length - 1]
      if (last !== undefined) minScore = last.score
    },
    get results() {
      return entries
    },
  }
}

const HASTE_SKILL_ID = "shared-haste" satisfies CompanionSkillId
const PARALLEL_SKILL_ID = "shared-parallel" satisfies CompanionSkillId

function isParallelUseful(state: CompanionState): boolean {
  const ultimateId = state.skills["skill-bar"].ultimate
  if (ultimateId === ("no-skill" satisfies CompanionSkillId)) return false
  const { validRoles } = companionSkills.data[ultimateId]
  const roles = state.companion.baseRoles
  return validRoles.length === 0 || validRoles.some((r) => roles.includes(r))
}

export function optimizeSkills(
  state: CompanionState,
  evaluateFn: (state: CompanionState) => number
): readonly SkillComboResult[] {
  const allCandidates = getFilteredSkillIds(state)
  const needsTaunt = roleRequiresTaunt(state)

  if (allCandidates.length === 0) {
    return [{ skills: [], score: evaluateFn(state) }]
  }

  let reservedTaunt: CompanionSkillId | null = null
  let candidates: readonly CompanionSkillId[]
  let freeSlots: number

  if (needsTaunt) {
    const tauntSkills = allCandidates.filter((id) => isTauntSkill(id, state))
    const firstTaunt = tauntSkills[0]
    if (firstTaunt === undefined) {
      return [{ skills: [], score: evaluateFn(state) }]
    }
    let bestTaunt: CompanionSkillId = firstTaunt
    let bestTauntScore = -Infinity
    for (const skillId of tauntSkills) {
      const { state: trialState } = buildSkillBar(state, [skillId])
      const score = evaluateFn(trialState)
      if (score > bestTauntScore) {
        bestTauntScore = score
        bestTaunt = skillId
      }
    }
    reservedTaunt = bestTaunt
    candidates = allCandidates.filter((id) => id !== reservedTaunt)
    freeSlots = ACTIVE_SLOT_IDS.length - 1
  } else {
    candidates = allCandidates
    freeSlots = ACTIVE_SLOT_IDS.length
  }

  const baseBar = reservedTaunt != null ? [reservedTaunt] : []

  const noSkill = "no-skill" satisfies CompanionSkillId
  const directScores: { skillId: CompanionSkillId; score: number }[] = []
  for (const skillId of candidates) {
    const bar = isBuffSkill(skillId)
      ? [...baseBar, ...Array(freeSlots - 1).fill(noSkill), skillId]
      : [...baseBar, skillId]
    const { state: trialState } = buildSkillBar(state, bar)
    directScores.push({ skillId, score: evaluateFn(trialState) })
  }
  directScores.sort((a, b) => b.score - a.score)
  const directRanked = directScores.map((s) => s.skillId)

  const topBase = directRanked.slice(0, freeSlots - 1)

  const boostScores: { skillId: CompanionSkillId; score: number }[] = []
  for (const skillId of candidates) {
    let bar: CompanionSkillId[]
    if (skillId === HASTE_SKILL_ID) {
      bar = [...baseBar, ...topBase, skillId]
    } else {
      bar = [...baseBar, skillId, ...topBase]
    }
    const { state: trialState } = buildSkillBar(state, bar)
    boostScores.push({ skillId, score: evaluateFn(trialState) })
  }
  boostScores.sort((a, b) => b.score - a.score)
  const boostRanked = boostScores.map((s) => s.skillId)

  const topN = createTopN(TOP_N_SKILLS)

  function isValidCombo(skills: readonly CompanionSkillId[]): boolean {
    if (new Set(skills).size !== skills.length) return false
    let armorCount = reservedTaunt != null && isArmorSkill(reservedTaunt) ? 1 : 0
    for (const s of skills) {
      if (isArmorSkill(s)) armorCount++
      if (armorCount > 1) return false
    }
    return true
  }

  const evaluated = new Set<string>()

  function evaluateCombo(comboSkills: readonly CompanionSkillId[]): {
    skills: readonly CompanionSkillId[]
    score: number
  } | null {
    if (!isValidCombo(comboSkills)) return null
    const key = [...comboSkills].sort().join(",")
    if (evaluated.has(key)) return null
    evaluated.add(key)
    const fullBar = [...baseBar, ...comboSkills]
    const { state: comboState } = buildSkillBar(state, fullBar)
    const score = evaluateFn(comboState)
    topN.add(fullBar, score)
    return { skills: fullBar, score }
  }

  const bestPerSize: (SkillComboResult | null)[] = Array(freeSlots + 1).fill(null)

  for (let totalSkills = freeSlots; totalSkills >= 1; totalSkills--) {
    for (let k = 0; k < totalSkills; k++) {
      const directPoolSize = totalSkills - k + CHECK_EXTRA_SKILLS
      const boostPoolSize = k + CHECK_EXTRA_SKILLS

      const directPool = directRanked.slice(0, directPoolSize)
      const boostPool = boostRanked.slice(0, boostPoolSize)

      if (k === 0) {
        for (const combo of combinations(directPool, totalSkills)) {
          const result = evaluateCombo(combo)
          const best = bestPerSize[totalSkills]
          if (result && (!best || result.score > best.score)) {
            bestPerSize[totalSkills] = result
          }
        }
      } else {
        const directCount = totalSkills - k
        for (const directCombo of combinations(directPool, directCount)) {
          for (const boostCombo of combinations(boostPool, k)) {
            const result = evaluateCombo([...directCombo, ...boostCombo])
            const best = bestPerSize[totalSkills]
            if (result && (!best || result.score > best.score)) {
              bestPerSize[totalSkills] = result
            }
          }
        }
      }
    }
  }

  const topNKeys = new Set(topN.results.map((r) => [...r.skills].sort().join(",")))
  for (const entry of bestPerSize) {
    if (!entry) continue
    const key = [...entry.skills].sort().join(",")
    if (!topNKeys.has(key)) {
      topN.results.push(entry)
    }
  }

  if (topN.results.length === 0) {
    return [{ skills: [], score: evaluateFn(state) }]
  }

  return topN.results
}
