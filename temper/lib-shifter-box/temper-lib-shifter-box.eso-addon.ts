import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibShifterBox = {
  id: "01a06187-3642-7d90-9056-320280df2e42",
  type: "page-type/eso-addon",
  slug: "temper-lib-shifter-box",
  definition: "two side-by-side lists an addon shifts entries between",

  addonManifest: "json",
  addonBinFolder: true,
  bundleEntry: "module/shifter-main",
  parts: [
    "eso-interface/shifter-box-template",
    "module/shifter-box-class",
    "module/shifter-box-create",
    "module/shifter-box-cursor-label",
    "module/shifter-casts",
    "module/shifter-constants",
    "module/shifter-drag-helpers",
    "module/shifter-helpers",
    "module/shifter-lib-api",
    "module/shifter-list-class",
    "module/shifter-list-methods-drag",
    "module/shifter-list-methods-entries",
    "module/shifter-list-methods-rows",
    "module/shifter-list-ops",
    "module/shifter-main",
    "module/shifter-public-api",
    "module/shifter-search-header",
    "module/shifter-state",
    "module/shifter-strings",
    "module/shifter-types",
    "module/shifter-validation",
  ],
  interfaces: ["eso-interface/shifter-box-template"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shifter box is keyed by the addon name together with the box name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key already taken is refused rather than replaced.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry is held by exactly one of the two lists.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry moves to the other list on a double click.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The two lists are given the same width.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dragged entry lands in the list the cursor is over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A callback fires once the entries have moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The search header is hidden until the caller asks for a search box.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Another addon reaches this library only through the global name.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
  ],
} as const satisfies EsoAddon
