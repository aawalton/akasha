import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const fcoSettingsMenu = {
  id: "01a06115-1ad4-7da9-bc03-79782a698425",
  pageTypeSlug: "module",
  slug: "fco-settings-menu",
  definition: "the settings panel the interface tweaks register",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No shared guard is kept for the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
