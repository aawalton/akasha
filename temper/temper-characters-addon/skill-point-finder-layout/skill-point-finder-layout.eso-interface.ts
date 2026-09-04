import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const skillPointFinderLayout = {
  id: "01a062e8-bed7-7011-a36b-31903e5d6972",
  pageTypeSlug: "eso-interface",
  slug: "skill-point-finder-layout",
  definition: "the window, table rows and tooltips the skill point finder draws into",
  markup: "xml",
  loadedAs: "USPF.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The markup loads after the compiled Lua bundle.",
    },
  ],
} as const satisfies EsoInterface
