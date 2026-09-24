import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherSettingsLuaBlock = {
  id: "01a06367-c4f5-7b19-af43-529bb67df9da",
  type: "page-type/module",
  slug: "watcher-settings-lua-block",
  definition: "how a keyed block is replaced inside a saved-variables file the game wrote",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The content is worked as text, so a file on one line works as a printed one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines a caller hands in are joined, worked as text and split again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block is found by the key written in brackets and quotes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Braces and keys inside a quoted string or a comment are passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block's home is the table directly holding the most of the sibling keys named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tie for the home goes to the shallower table, then to the table found first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is looked for only in its home where any sibling is found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no sibling is found the key is looked for everywhere, first found first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block runs from its key to the end of its value and the comma after that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block beginning its own line takes the blanks before its key along.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block already there is replaced in place rather than moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text outside the block replaced is kept byte for byte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key absent from its home is inserted before the first sibling found there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Siblings are tried in the order the caller named the siblings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block inserted before a sibling beginning its own line ends in a line break.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content no anchor is found in is handed back unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content where the value at the key never closes is handed back unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The indent is taken from the key's line, the key in its home before any other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The indent falls back to the line of the first sibling found in the home.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The indent falls back to twelve spaces where no line is found.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here parses the file into values and prints the whole file again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
