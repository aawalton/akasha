import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperLibShifterBox = {
  id: "01a06187-3642-7d90-9056-320280df2e42",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-shifter-box",
  definition: "two side-by-side lists an addon shifts entries between",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "shifter-main",
  partSlugs: [
    "module/shifter-types",
    "module/shifter-casts",
    "module/shifter-constants",
    "module/shifter-strings",
    "module/shifter-state",
    "module/shifter-validation",
    "module/shifter-helpers",
    "module/shifter-drag-helpers",
    "module/shifter-search-header",
    "module/shifter-list-class",
    "module/shifter-list-methods-entries",
    "module/shifter-list-methods-rows",
    "module/shifter-list-methods-drag",
    "module/shifter-list-ops",
    "module/shifter-box-create",
    "module/shifter-box-class",
    "module/shifter-lib-api",
    "module/shifter-public-api",
    "module/shifter-main",
    "eso-interface/shifter-box-template",
  ],
  interfaceSlugs: ["shifter-box-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shifter box is keyed by the addon name together with the box name.",
    },
    {
      invariantKind: "departure",
      statement: "A key already taken is refused rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is held by exactly one of the two lists.",
    },
    {
      invariantKind: "departure",
      statement: "An entry moves to the other list on a double click.",
    },
    {
      invariantKind: "departure",
      statement: "The two lists are given the same width.",
    },
    {
      invariantKind: "departure",
      statement: "A dragged entry lands in the list the cursor is over.",
    },
    {
      invariantKind: "departure",
      statement: "A callback fires once the entries have moved.",
    },
    {
      invariantKind: "departure",
      statement: "The search header is hidden until the caller asks for a search box.",
    },
    {
      invariantKind: "departure",
      statement: "Another addon reaches this library only through the global name.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing here reaches a Date.",
    },
  ],
} as const satisfies EsoAddon
