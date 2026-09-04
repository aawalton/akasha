import type { ZoneData } from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"
import { RAW_ZONES } from "../skill-point-sources/skill-point-sources.module.code.ts"

export const ZONES: ZoneData[] = RAW_ZONES.map((z) => ({
  key: z.key,
  quests: z.quests,
  skyshards: 0,
}))
