import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperSkillKinds = {
  id: "01a060db-b2bf-75cc-8809-206da241df83",
  type: "domain",
  slug: "temper-skill-kinds",
  definition:
    "the kinds a skill is sorted by and the shapes a skill activation effect is written in",
  parts: [
    "module/skill-bars",
    "module/skill-buff-debuff-types",
    "module/skill-slots",
    "module/skill-types",
    "module/skill-value-formulas",
    "module/special-effect-types",
    "module/status-effect-types",
    "module/target-scopes",
    "module/scribing-affix-scripts",
    "module/scribing-focus-scripts",
    "module/scribing-signature-scripts",
    "module/skill-activation-effect-types",
    "module/skills-source",
    "module/target-types",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill itself is named outside this folder.",
    },
    {
      invariantKind: "departure",
      statement: "Every table here is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Domain
