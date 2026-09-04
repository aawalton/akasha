import type { Module } from "@akasha/code-system/module"

export const companionsSkillsPanel = {
  id: "01a0611d-84e4-7331-8c28-29e6c8fced09",
  pageTypeSlug: "module",
  slug: "companions-skills-panel",
  definition: "the panel showing a companion's slotted skills beside the ones a build asks for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill is drawn as a card carrying its icon and its rank.",
    },
  ],
} as const satisfies Module
