import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperSkillMorphAccess = {
  id: "01a061e2-5e38-795d-b1f0-b50d142c48d5",
  type: "domain",
  slug: "temper-skill-morph-access",
  definition: "the morph progress a saved completion row carries",
  parts: [
    "module/character-skill-morph-transform",
    "module/eso-id-helpers",
    "module/morph-completion-shapes",
    "module/skill-morphs-checker",
    "module/skill-morphs-resolver",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A completion row names the game's own numbers rather than akasha ids.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row with no completion is read as no progress.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A skill line the game numbers zero is left out of the maps here.",
    },
  ],
} as const satisfies Domain
