import type { Command } from "@akasha/command-system/command"

export const temperInventoryAutomationShow = {
  id: "01a0603c-c1ce-749d-a434-9035b90e6e37",
  pageTypeSlug: "command",
  slug: "temper-inventory-automation-show",
  definition: "the command giving back the automation toggles as they are set",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--json", takes: "give the whole shape as JSON rather than as tab-separated rows" },
  ],
  helpNotes: ["every scope is reported: the global one, each character and each companion."],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every scope is reported.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes a toggle.",
    },
  ],
} as const satisfies Command
