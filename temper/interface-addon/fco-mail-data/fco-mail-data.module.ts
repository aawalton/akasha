import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const fcoMailData = {
  id: "01a06115-1acc-7d0b-a919-d0ba8caa2953",
  type: "module",
  slug: "fco-mail-data",
  definition: "what the interface tweaks keep about one mail",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No shared guard could name the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
