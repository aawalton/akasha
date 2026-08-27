import {
  ENDLESS_ARCHIVE,
  MAEL_ACHIEVEMENT,
  MAIN_QUESTS,
  RAW_ZONES,
  TUTORIALS,
  ZONE_IDS,
} from "../../skill-point-data"
import type { ZoneData } from "../types"

export { ENDLESS_ARCHIVE, MAEL_ACHIEVEMENT, MAIN_QUESTS, TUTORIALS, ZONE_IDS }

export const ZONES: ZoneData[] = RAW_ZONES.map((z) => ({
  key: z.key,
  quests: z.quests,
  skyshards: 0,
}))
