import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import { createSourceFile } from "@akasha/temper-formula-framework/source-file"
import { POTIONS_CRAFTED } from "../potions-crafted/potions-crafted.module.code.ts"
import { POTIONS_CROWN } from "../potions-crown/potions-crown.module.code.ts"
import { POTIONS_DROPPED } from "../potions-dropped/potions-dropped.module.code.ts"
import type { REAGENTS } from "../reagent/reagent.module.code.ts"

type ReagentName = (typeof REAGENTS)[number]["name"]

export interface PotionsTemplate extends EffectSourceInterface {
  categoryId: "potions"
  subcategoryId: "crafted" | "crown" | "dropped" | "none"
  name: string
  description: string
  itemId: number
  icon: string
  level: string
  seconds: number
  reagents?: readonly (readonly ReagentName[])[]
}

const NO_POTION = {
  categoryId: "potions" as const,
  subcategoryId: "none" as const,
  effects: [],
  id: "no-potion" as const,
  name: "No Potion",
  itemId: 0,
  icon: "",
  seconds: 0,
  description: "",
  level: "",
} satisfies PotionsTemplate

const POTIONS = {
  "no-potion": NO_POTION,
  ...POTIONS_CROWN,
  ...POTIONS_DROPPED,
  ...POTIONS_CRAFTED,
} satisfies Record<string, PotionsTemplate>

export const potions = createSourceFile<PotionsTemplate>()(POTIONS)

export type PotionSource = PotionsTemplate & { id: PotionId }

export type PotionId = (typeof potions.ids)[number]
