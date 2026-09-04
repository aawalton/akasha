import type { Command } from "@akasha/command-system/command"

export const temperInventoryRuleCreate = {
  id: "01a0603c-c1d6-798f-a6d9-f51d3fc000f9",
  pageTypeSlug: "command",
  slug: "temper-inventory-rule-create",
  definition: "the command adding a category rule",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--category <id>", takes: "the category of items the rule reaches" },
    { said: "--action <name>", takes: "what is done with an item the rule reaches" },
    {
      said: "--destination <destination>",
      takes: "where the item goes, for the actions that move it",
    },
    { said: "--conditions <json>", takes: "the conditions narrowing which items the rule reaches" },
    { said: "--title <text>", takes: "a title the web shows" },
    { said: "--notes <text>", takes: "a note the web shows" },
    { said: "--goal <text>", takes: "a goal label the web shows" },
    { said: "--active <true|false>", takes: "whether the rule is active" },
    {
      said: "--stock-scope <scope>",
      takes: "whether stocking counts one character or every character",
    },
  ],
  helpNotes: [
    "a new category rule is inactive until it is activated.",
    "a title, a note and a goal are held for the web alone and never reach the addon.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A new category rule is inactive.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
  ],
} as const satisfies Command
