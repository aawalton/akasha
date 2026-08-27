/**
 * Temper Target Armor (Generated)
 *
 * ESO target-armor values for solo build calculations, sourced from the
 * universal pages table (page type: temper-target-armor).
 *
 * Each entry's `id` is the stable codec-facing identifier
 * ("overland" / "dungeon") and the same string is used as the record
 * key, so `TEMPER_TARGET_ARMORS["dungeon"]` is well-typed and feeds the
 * `TargetArmorId` union and the `targetArmor.data` lookup in
 * @temper/game-characters-character.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { TargetArmorTemplate } from "../target-armor-data"

export const TEMPER_TARGET_ARMORS = {
  "dungeon": { id: "dungeon", name: "Dungeon", armor: 18200 },
  "overland": { id: "overland", name: "Overland", armor: 9100 },
} as const satisfies Record<string, TargetArmorTemplate>
