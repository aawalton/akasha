import type { ZoneData } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-types/skill-point-finder-types.module.code.ts"
import { RAW_ZONES } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-sources/skill-point-sources.module.code.ts"

export const ZONES: ZoneData[] = RAW_ZONES.map((z) => ({
  key: z.key,
  quests: z.quests,
  skyshards: 0,
}))
