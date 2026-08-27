/**
 * Temper Equipment Qualities (Generated)
 *
 * ESO equipment quality tiers (no-quality, normal, fine, superior, epic,
 * legendary, mythic), sourced from the universal pages table (page type:
 * temper-quality).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface EquipmentQualityTemplate {
  id: string
  name: string
  available: boolean
}

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `equipmentQualities.ids` so `z.enum(equipmentQualities.ids)` and
 * `(typeof equipmentQualities.ids)[number]` stay literal-union typed
 * for callers in `build-schema.ts` and `build-codec-indices.ts`.
 */
export const TEMPER_EQUIPMENT_QUALITIES_BY_ID = {
  "no-quality": { id: "no-quality" as const, name: "No Quality", available: true },
  "normal": { id: "normal" as const, name: "Normal", available: true },
  "fine": { id: "fine" as const, name: "Fine", available: true },
  "superior": { id: "superior" as const, name: "Superior", available: true },
  "epic": { id: "epic" as const, name: "Epic", available: true },
  "legendary": { id: "legendary" as const, name: "Legendary", available: true },
  "mythic": { id: "mythic" as const, name: "Mythic", available: false },
} satisfies Record<string, EquipmentQualityTemplate>
