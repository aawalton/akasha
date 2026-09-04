import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const crimsonNirnroot = {
  id: "019e21f7-3b12-7958-836d-1cf8db4411cb",
  pageTypeSlug: "temper-reagent",
  slug: "crimson-nirnroot",
  title: "Crimson Nirnroot",
  key: "crimson-nirnroot",
  icon: "resources/crafting_water_plant_nirnroot_crimson.png",
  itemId: 150672,
  alchemyEffects: ["timidity", "spell-critical", "gradual-ravage-health", "restore-health"],
} as const satisfies TemperReagent
