const POTION_ITEM_ID_TO_RESTORE_METRICS: Record<number, readonly string[]> = {
  [64710]: ["health-restore", "magicka-restore", "stamina-restore"],
  [112427]: ["magicka-restore"],
  [112428]: ["stamina-restore"],
  [124674]: ["health-restore"],
  [27036]: ["health-restore"],
  [27037]: ["magicka-restore"],
  [27038]: ["stamina-restore"],
  [176041]: ["health-restore", "magicka-restore"],
  [176040]: ["magicka-restore"],
  [176042]: ["stamina-restore"],
  [34125]: ["health-restore"],
  [42406]: ["health-restore"],
  [54857]: ["stamina-restore"],
  [54858]: ["magicka-restore"],
  [54859]: ["health-restore", "magicka-restore", "stamina-restore"],
  [61028]: ["health-restore"],
  [61029]: ["stamina-restore"],
  [61030]: ["magicka-restore"],
  [64510]: ["health-restore"],
  [64741]: ["health-restore", "magicka-restore", "stamina-restore"],
  [68350]: ["magicka-restore"],
  [68351]: ["magicka-restore"],
  [68352]: ["stamina-restore"],
  [68353]: ["stamina-restore"],
  [68356]: ["health-restore"],
  [71071]: ["health-restore"],
  [71072]: ["magicka-restore"],
  [71073]: ["stamina-restore"],
  [74728]: ["stamina-restore"],
  [74729]: ["stamina-restore"],
  [112430]: ["health-restore"],
  [135111]: ["health-restore"],
  [135114]: ["health-restore", "magicka-restore", "stamina-restore"],
  [135125]: ["magicka-restore"],
  [135127]: ["stamina-restore"],
  [214314]: ["health-restore", "magicka-restore", "stamina-restore"],
  [217946]: ["health-restore", "magicka-restore", "stamina-restore"],
  [224832]: ["magicka-restore", "stamina-restore"],
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
  return POTION_ITEM_ID_TO_RESTORE_METRICS[itemId]
}
