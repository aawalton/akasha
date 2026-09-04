import { MIN_USABLE_DURATION_MS } from "@akasha/temper-combat-addon/combat-action-levels"
import type {
  Ability,
  Action,
  ActionFlags,
  Effect,
} from "@akasha/temper-combat-addon/combat-action-types"

export const MAJOR_GALLOP_ICON = "major_gallop"

export const TARGET_AREA = "area"
export const TARGET_CONE = "cone"
export const TARGET_ENEMY = "enemy"
export const TARGET_GROUND = "ground"
export const TARGET_SELF = "self"

function deriveFlags(
  targetDescription: string | undefined,
  radius: number | undefined,
  roles:
    | {
        forArea?: boolean
        forEnemy?: boolean
        forGround?: boolean
        forSelf?: boolean
        forTank?: boolean
      }
    | undefined,
  onlyOneTarget: boolean
): ActionFlags {
  const target = targetDescription
  const r = radius

  const derivedForArea =
    (target === TARGET_AREA && (r === 0 || (r !== undefined && r > 200))) || target === TARGET_CONE
  const derivedForEnemy = target === TARGET_ENEMY
  const derivedForGround = target === TARGET_GROUND
  const derivedForSelf = target === TARGET_SELF || r === 500

  return {
    forArea: roles?.forArea ?? derivedForArea,
    forEnemy: roles?.forEnemy ?? derivedForEnemy,
    forGround: roles?.forGround ?? derivedForGround,
    forSelf: roles?.forSelf ?? derivedForSelf,
    forTank: roles?.forTank ?? false,
    shifted: false,
    onlyOneTarget,
  }
}

export function getNewest(action: Action): Action {
  let walker = action
  while (walker.newAction !== undefined) {
    walker = walker.newAction
  }
  return walker
}

export function getOldest(action: Action): Action {
  let walker = action
  while (walker.oldAction !== undefined) {
    walker = walker.oldAction
  }
  return walker
}

export function getGallopEffect(action: Action): Effect | undefined {
  for (const effect of action.effectList) {
    if (effect.ability.icon.includes(MAJOR_GALLOP_ICON)) {
      return effect
    }
  }
  return undefined
}

export function buildAction(p: {
  sn: number
  slotNum: number
  hotbarCategory: number
  ability: Ability
  channeled: boolean
  castTime: number
  startTime: number
  rawDuration: number
  descriptionDuration?: number
  descriptionNums?: number[]
  relatedAbilityList?: number[]
  targetDescription?: string
  radius?: number
  roles?: {
    forArea?: boolean
    forEnemy?: boolean
    forGround?: boolean
    forSelf?: boolean
    forTank?: boolean
  }
  onlyOneTarget?: boolean
}): Action {
  const duration = p.rawDuration < MIN_USABLE_DURATION_MS ? 0 : p.rawDuration
  const endTime = duration === 0 ? 0 : p.startTime + duration

  const onlyOneTarget = p.onlyOneTarget ?? false
  const flags = deriveFlags(p.targetDescription, p.radius, p.roles, onlyOneTarget)

  return {
    sn: p.sn,
    slotNum: p.slotNum,
    hotbarCategory: p.hotbarCategory,
    ability: p.ability,
    relatedAbilityList: p.relatedAbilityList ?? [],
    channeled: p.channeled,
    castTime: p.castTime,
    startTime: p.startTime,
    duration,
    descriptionDuration: p.descriptionDuration,
    descriptionNums: p.descriptionNums ?? [],
    endTime,
    effectList: [],
    effectEndTimes: [],
    stackCount: 0,
    lastEffectTime: 0,
    targetOut: false,
    fake: false,
    saved: false,
    flags,
    data: {},
  }
}
