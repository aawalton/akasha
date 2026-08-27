import type { EffectSourceInterface } from "@temper/shared-formula-framework/effect-source"
import { createSourceFile } from "@temper/shared-formula-framework/utils/create-source-file"
import { POTIONS_CROWN } from "./generated/potions-crown.generated"
import { POTIONS_CRAFTED } from "./generated/temper-potion-crafted.generated"
import { POTIONS_DROPPED } from "./generated/temper-potion-dropped.generated"
import type { REAGENTS } from "./generated/temper-reagents.generated"

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
