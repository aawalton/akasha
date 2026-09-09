import type { GameData } from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"
import { ZONES } from "../skill-point-finder-zones/skill-point-finder-zones.module.code.ts"
import {
  ENDLESS_ARCHIVE,
  GROUP_DUNGEONS,
  MAEL_ACHIEVEMENT,
  MAIN_QUESTS,
  PUBLIC_DUNGEONS,
  TUTORIALS,
  ZONE_IDS,
} from "../skill-point-sources/skill-point-sources.module.code.ts"

export const GAME_DATA: GameData = {
  ZId: { ZN: ZONE_IDS },
  MAAch: MAEL_ACHIEVEMENT,
  zones: ZONES,
  tutorials: TUTORIALS,
  GD: GROUP_DUNGEONS,
  MQ: MAIN_QUESTS,
  EA: ENDLESS_ARCHIVE,
  PD: PUBLIC_DUNGEONS,
}
