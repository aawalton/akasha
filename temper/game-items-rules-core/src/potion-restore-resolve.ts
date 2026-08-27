import {
  POTION_ENCODED_TRAITS_TO_RESTORE_METRICS,
  POTION_ITEM_ID_TO_RESTORE_METRICS,
} from "./generated/potion-restore-metrics.generated"

export function resolvePotionRestoreMetricIds(
  itemId: number,
  encodedTraits: number
): readonly string[] | undefined {
  if (encodedTraits !== 0) {
    return POTION_ENCODED_TRAITS_TO_RESTORE_METRICS[encodedTraits]
  }
  return POTION_ITEM_ID_TO_RESTORE_METRICS[itemId]
}
