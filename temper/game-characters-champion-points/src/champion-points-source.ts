import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { EffectSourceInterface } from "@temper/shared-formula-framework/effect-source"
import type { Effect } from "@temper/shared-formula-framework/effects-types"
import { craftPassives } from "./data/craft-passives"
import { craftSlottables } from "./data/craft-slottables"
import { fitnessPassives } from "./data/fitness-passives"
import { fitnessSlottables } from "./data/fitness-slottables"
import { warfarePassives } from "./data/warfare-passives"
import { warfareSlottables } from "./warfare-slottables"

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
