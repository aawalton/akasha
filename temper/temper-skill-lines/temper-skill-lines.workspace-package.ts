import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperSkillLines = {
  id: "01a0608a-c135-79d5-91c5-4cf48adc59f3",
  pageTypeSlug: "workspace-package",
  slug: "temper-skill-lines",
  definition: "the skill lines an Elder Scrolls Online character advances",
  manifest: "json",
  partSlugs: [
    "module/skill-line-category-data",
    "module/skill-line-template",
    "module/class-skill-lines",
    "module/weapon-and-armor-skill-lines",
    "module/world-and-guild-skill-lines",
    "module/alliance-war-skill-lines",
    "module/racial-and-craft-skill-lines",
    "module/companion-skill-lines",
    "module/vengeance-skill-lines",
    "module/skill-lines",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The skill line data here is written out from the skill-line pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "A class line names its category by the category page's key rather than by that page's slug.",
    },
  ],
} as const satisfies WorkspacePackage
