import { slugIn } from "akasha/change/modules/target-narrowing/target-narrowing.module.code.ts"

export type PotionRestores = {
  readonly itemId: number
  readonly restores: readonly string[]
}

type RestoresByItemId = { [itemId: number]: readonly string[] | undefined }

const UNREAD =
  "no potion pages are read yet — the skill catalogue names them when it is held, and an add-on names the ones compiled into it"

let given: (() => Iterable<PotionRestores>) | undefined

let restoresByItemId: RestoresByItemId | undefined

export function readPotionRestoresFrom(potions: () => Iterable<PotionRestores>): undefined {
  given = potions
  restoresByItemId = undefined
  return undefined
}

function restoresByItemIdOf(): RestoresByItemId {
  if (given === undefined) throw new Error(UNREAD)
  const found: RestoresByItemId = {}
  for (const one of given()) {
    found[one.itemId] = one.restores.map(slugIn)
  }
  return found
}

const RESTORE_HEALTH_EFFECT_ID = 1

const RESTORE_MAGICKA_EFFECT_ID = 3

const RESTORE_STAMINA_EFFECT_ID = 5

const SUSTAINED_RESTORE_HEALTH_EFFECT_ID = 27

const ALCHEMY_EFFECT_RESTORE_METRIC: Record<number, string> = {
  [RESTORE_HEALTH_EFFECT_ID]: "health-restore",
  [RESTORE_MAGICKA_EFFECT_ID]: "magicka-restore",
  [RESTORE_STAMINA_EFFECT_ID]: "stamina-restore",
  [SUSTAINED_RESTORE_HEALTH_EFFECT_ID]: "health-restore",
}

const EFFECT_ID_RANGE = 256

const HIGHEST_EFFECT_ID_PLACE = EFFECT_ID_RANGE * EFFECT_ID_RANGE

const THREE_REAGENT_FLAG = 128

function packedEffectIds(encodedTraits: number): readonly number[] {
  const highest = Math.floor(encodedTraits / HIGHEST_EFFECT_ID_PLACE)
  return [
    highest >= THREE_REAGENT_FLAG ? highest - THREE_REAGENT_FLAG : highest,
    Math.floor(encodedTraits / EFFECT_ID_RANGE) % EFFECT_ID_RANGE,
    encodedTraits % EFFECT_ID_RANGE,
  ]
}

function decodePotionRestoreMetricIds(encodedTraits: number): readonly string[] {
  const held: string[] = []
  const taken: Record<string, boolean> = {}
  for (const effectId of packedEffectIds(encodedTraits)) {
    const metric = ALCHEMY_EFFECT_RESTORE_METRIC[effectId]
    if (metric === undefined) continue
    if (taken[metric] === true) continue
    taken[metric] = true
    held.push(metric)
  }
  return held
}

export function resolvePotionRestoreMetricIds(
  itemId: number,
  encodedTraits: number
): readonly string[] | undefined {
  if (encodedTraits !== 0) {
    return decodePotionRestoreMetricIds(encodedTraits)
  }
  restoresByItemId ??= restoresByItemIdOf()
  return restoresByItemId[itemId]
}
