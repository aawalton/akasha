import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperSkillMorphs = {
  id: "01a061c7-0738-7e24-b2fa-36e9b8781b9c",
  type: "domain",
  slug: "temper-skill-morphs",
  definition: "a character's progress through the skills that morph",
  parts: [
    "module/applicable-eso-skill-lines",
    "module/build-morph-entry",
    "module/character-morph-progress",
    "module/character-morph-progress-eso",
    "module/morph-conflict",
    "module/morph-pair",
    "module/morph-progress-types",
    "module/morph-suggestion-fixtures",
    "module/morphable-skills",
    "module/select-morph-suggestions",
    "module/skill-line-morph-totals",
    "module/skill-morph-progress-paths",
    "module/skill-organization",
    "module/subclassing-morph-progress",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill morphs only where the game gives that skill a first and a second morph.",
    },
    {
      invariantKind: "departure",
      statement: "A skill variant is ranked to four at most.",
    },
    {
      invariantKind: "departure",
      statement: "A morphable skill is worth twelve rank.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line the character cannot use is left out of the totals.",
    },
  ],
} as const satisfies Domain
