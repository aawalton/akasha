import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const luminousRussula = {
  id: "019e21f7-3b1d-7345-9a92-ca157efe1883",
  pageTypeSlug: "temper-reagent",
  slug: "luminous-russula",
  title: "Luminous Russula",
  key: "luminous-russula",
  icon: "resources/luminous_russula_r1.png",
  itemId: 30155,
  alchemyEffects: ["ravage-stamina", "maim", "restore-health", "hindrance"],
} as const satisfies TemperReagent
