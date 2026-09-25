import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const clockworkCity18444 = {
  id: "01a0d5e2-66be-7e2e-9435-2a508331aec6",
  type: "page-type/temper-world-skyshard",
  slug: "clockwork-city-1844-4",
  title: "Clockwork City skyshard 4 of achievement 1844",
  esoAchievementId: 1844,
  shardNumber: 4,
  worldZone: "temper-world-zone/clockwork-city",
  mapPositions: [
    { mapFolder: "clockwork", mapTile: "brassfortress_base", mapX: 0.3458, mapY: 0.5533 },
    { mapFolder: "clockwork", mapTile: "clockwork_base", mapX: 0.4453, mapY: 0.3591 },
  ],
} as const satisfies TemperWorldSkyshard
