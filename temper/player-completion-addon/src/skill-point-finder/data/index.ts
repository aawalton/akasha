import type { GameData } from "../types"
import { GROUP_DUNGEONS, PUBLIC_DUNGEONS } from "../../skill-point-data"
import { ENDLESS_ARCHIVE, MAEL_ACHIEVEMENT, MAIN_QUESTS, TUTORIALS, ZONE_IDS, ZONES } from "./zones"

export const gameData: GameData = {
  ZId: { ZN: ZONE_IDS },
  MAAch: MAEL_ACHIEVEMENT,
  zones: ZONES,
  tutorials: TUTORIALS,
  GD: GROUP_DUNGEONS,
  MQ: MAIN_QUESTS,
  EA: ENDLESS_ARCHIVE,
  PD: PUBLIC_DUNGEONS,
}
