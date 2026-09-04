import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointZoneSources = {
  id: "01a06108-2ffa-7ddc-a07c-2ee34cb56f5c",
  pageTypeSlug: "module",
  slug: "skill-point-zone-sources",
  definition: "the skyshards and the quest skill points each zone of Tamriel holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-point pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A zone is named by the two-letter key the game knows that zone by.",
    },
  ],
} as const satisfies Module
