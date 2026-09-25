import { PUBLIC_DUNGEON_PAGES } from "akasha/temper/catalog/world/temper-public-dungeon/modules/public-dungeon-pages/public-dungeon-pages.module.code.ts"
import type { SkillPointDungeonSource } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-source-types/skill-point-source-types.module.code.ts"

export const SKILL_POINT_PUBLIC_DUNGEON_SOURCES: readonly SkillPointDungeonSource[] =
  PUBLIC_DUNGEON_PAGES.map((one) => ({ key: one.key, label: one.title }))
