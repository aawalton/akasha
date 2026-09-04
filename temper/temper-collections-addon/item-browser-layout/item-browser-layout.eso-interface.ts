import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const itemBrowserLayout = {
  id: "01a0624c-a660-7557-96b8-3a4e90b786d8",
  pageTypeSlug: "eso-interface",
  slug: "item-browser-layout",
  definition: "the item-set browser frame with its sortable headings and its list row template",
  markup: "xml",
  loadedAs: "Browser.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The frame is drawn inside the extended journal rather than as a window of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A list row calls three handlers the browser publishes as globals.",
    },
    {
      invariantKind: "departure",
      statement: "A heading names the field that heading sorts the list by.",
    },
    {
      invariantKind: "departure",
      statement:
        "The account and server dropdowns are hidden until more than one account is known.",
    },
  ],
} as const satisfies EsoInterface
