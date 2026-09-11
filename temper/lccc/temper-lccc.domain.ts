import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperLccc = {
  id: "01a08d72-671a-7ba4-875c-f5296652fc14",
  type: "domain",
  slug: "temper-lccc",
  definition: "the helper table an add-on leaves in the game's globals as LibCodesCommonCode",
  parts: [
    "module/lccc-casts",
    "module/lccc-codec",
    "module/lccc-color",
    "module/lccc-util",
    "module/lccc-util-tables",
    "module/lccc",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An add-on reaching this code carries its own copy inside its own bundle.",
    },
    {
      invariantKind: "departure",
      statement: "A copy already loaded at the same version or newer is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name the game reads keeps its upstream spelling on the key rather than on the function.",
    },
  ],
} as const satisfies Domain
