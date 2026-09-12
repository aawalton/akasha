import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperEsoDeclaration = {
  id: "01a0673e-3ddf-7000-a6f4-66fa0861fb9d",
  type: "domain",
  slug: "temper-eso-declaration",
  definition: "the game's own API documentation dump read as TypeScript declarations",
  parts: [
    "eso-opt-in-list/declared-tokens",
    "module/eso-declaration-text",
    "module/eso-doc-tokens",
    "module/eso-opt-in",
    "module/eso-token-scope",
    "page-type/eso-opt-in-list",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The dump is read as text rather than as a grammar.",
    },
    {
      invariantKind: "departure",
      statement: "A name the dump describes is carried through unjudged.",
    },
    {
      invariantKind: "departure",
      statement: "A type the dump describes is judged before a declaration carries that type.",
    },
    {
      invariantKind: "departure",
      statement: "An opt-in list rather than the dump decides the tokens declared.",
    },
    {
      invariantKind: "departure",
      statement: "An enum a selected token names is selected too.",
    },
    {
      invariantKind: "departure",
      statement: "An object above a selected object is selected too.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the clone or writes a file.",
    },
  ],
} as const satisfies Domain
