import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperChampionPoint = {
  id: "01a06076-1b64-7dfd-b35b-f6c86003f6c1",
  type: "page-type/domain",
  slug: "temper-champion-point",
  definition: "the champion stars a character earns past level fifty",
  parts: [
    "module/champion-point-source",
    "module/craft-passives",
    "module/craft-slottables",
    "module/fitness-passives",
    "module/fitness-slottables",
    "module/warfare-passives",
    "module/warfare-slottables",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A star is reached by its kebab id rather than by the number the game gives that star.",
    },
  ],
} as const satisfies Domain
