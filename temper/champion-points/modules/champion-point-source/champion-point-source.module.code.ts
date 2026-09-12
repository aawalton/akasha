import { craftSlottables } from "akasha/temper/champion-points/craft-slottables/craft-slottables.module.code.ts"
import { fitnessPassives } from "akasha/temper/champion-points/fitness-passives/fitness-passives.module.code.ts"
import { fitnessSlottables } from "akasha/temper/champion-points/fitness-slottables/fitness-slottables.module.code.ts"
import { craftPassives } from "akasha/temper/champion-points/modules/craft-passives/craft-passives.module.code.ts"
import { warfarePassives } from "akasha/temper/champion-points/warfare-passives/warfare-passives.module.code.ts"
import { warfareSlottables } from "akasha/temper/champion-points/warfare-slottables/warfare-slottables.module.code.ts"
import type { Effect } from "akasha/temper/formula-framework/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/formula-framework/effect-source/effect-source.module.code.ts"
import { createDataFile } from "akasha/utils/narrow/create-data-file/create-data-file.module.code.ts"

type ChampionPointSubcategoryId =
  | "craft-passives"
  | "craft-slottables"
  | "warfare-passives"
  | "warfare-slottables"
  | "fitness-passives"
  | "fitness-slottables"

export interface ChampionPointTemplate extends EffectSourceInterface<"champion-points", Effect> {
  categoryId: "champion-points"
  subcategoryId: ChampionPointSubcategoryId
  name: string
  description: string
  esoChampionSkillId: number
  isSlottable: boolean
}

const CHAMPION_POINTS = {
  ...craftPassives.data,
  ...craftSlottables.data,
  ...fitnessPassives.data,
  ...fitnessSlottables.data,
  ...warfarePassives.data,
  ...warfareSlottables.data,
} satisfies Record<string, ChampionPointTemplate>

export const MAX_CHAMPION_POINTS = 3600

export const championPoints = createDataFile<ChampionPointTemplate>()(CHAMPION_POINTS)

export type ChampionPointSource = ChampionPointTemplate & { id: ChampionPointId }

export type ChampionPointId = (typeof championPoints.ids)[number]
