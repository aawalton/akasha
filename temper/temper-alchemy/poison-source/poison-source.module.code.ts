import type { EffectSourceInterface } from "@akasha/temper-formula-framework/effect-source"
import { createSourceFile } from "@akasha/temper-formula-framework/source-file"

interface PoisonTemplate extends EffectSourceInterface {
  categoryId: "poisons"
  name: string
}

const POISONS = {
  "no-poison": {
    id: "no-poison" as const,
    name: "No Poison",
    categoryId: "poisons" as const,
    effects: [],
  },
} satisfies Record<string, PoisonTemplate>

export const poisons = createSourceFile<PoisonTemplate>()(POISONS)
