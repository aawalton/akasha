import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const fleshflyLarva = {
  id: "019e21f7-3b1a-710f-b11c-9c0291c31f85",
  type: "temper-reagent",
  slug: "fleshfly-larva",
  title: "Fleshfly Larva",
  key: "fleshfly-larva",
  icon: "resources/reagent_fleshfly_larva.png",
  itemId: 77587,
  alchemyEffects: ["ravage-stamina", "vulnerability", "gradual-ravage-health", "vitality"],
} as const satisfies TemperReagent
