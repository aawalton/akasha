import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const strosMkai4072 = {
  id: "01a0d5d9-7f95-753c-958f-739f72034bd1",
  type: "page-type/temper-world-skyshard",
  slug: "stros-mkai-407-2",
  title: "Stros M'Kai skyshard 2 of achievement 407",
  esoAchievementId: 407,
  shardNumber: 2,
  worldZone: "temper-world-zone/stros-mkai",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "porthunding_base", mapX: 0.4655, mapY: 0.4487 },
    { mapFolder: "glenumbra", mapTile: "strosmkai_base", mapX: 0.6431, mapY: 0.3978 },
  ],
} as const satisfies TemperWorldSkyshard
