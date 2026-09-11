import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const emeticRussula = {
  id: "019e21f7-3b18-7e6e-835c-7568dfe11ec9",
  type: "temper-reagent",
  slug: "emetic-russula",
  title: "Emetic Russula",
  key: "emetic-russula",
  icon: "resources/emetic_russula_r1.png",
  itemId: 30151,
  alchemyEffects: ["ravage-health", "ravage-magicka", "ravage-stamina", "entrapment"],
} as const satisfies TemperReagent
