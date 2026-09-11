import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const fcoSkills = {
  id: "01a06115-1ad6-704a-ac3c-88cccb76abc5",
  pageTypeSlug: "module",
  type: "module",
  slug: "fco-skills",
  definition: "the skills window the interface tweaks change",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No shared guard could name the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
