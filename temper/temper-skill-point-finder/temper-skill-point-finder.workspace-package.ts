import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperSkillPointFinder = {
  id: "01a060ec-5852-77cf-a783-9e488f2d3a19",
  pageTypeSlug: "workspace-package",
  slug: "temper-skill-point-finder",
  definition: "where a character's remaining skill points are, counted per zone and per dungeon",
  manifest: "json",
  partSlugs: [
    "module/skill-point-sources",
    "module/skill-point-finder-constants",
    "module/skill-point-finder-types",
    "module/skill-point-finder-helpers",
    "module/skill-point-finder-colors",
    "module/skill-point-finder-saved-state",
    "module/skill-point-finder-state",
    "module/skill-point-finder-strings",
    "module/skill-point-finder-zones",
    "module/skill-point-finder-game-data",
    "module/skill-point-finder-char-list",
    "module/skill-point-finder-points",
    "module/skill-point-finder-data-lines",
    "module/skill-point-finder-gui-table",
    "module/skill-point-finder-tooltips",
    "module/skill-point-finder-window",
    "module/skill-point-finder-menu",
    "module/skill-point-finder-events",
    "module/skill-point-finder-init",
    "module/skill-point-finder-api",
    "type-declaration/skill-point-finder-api-declarations",
    "type-declaration/skill-point-finder-controls",
    "type-declaration/skill-point-finder-string-ids",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count here is read out of the game rather than out of a capture.",
    },
    {
      invariantKind: "departure",
      statement: "Every character on the account is counted from the one saved-variables file.",
    },
    {
      invariantKind: "constraint",
      statement: "The game reports a skill point only for the character being played.",
    },
  ],
} as const satisfies WorkspacePackage
