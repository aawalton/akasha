import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const potionRestoreResolve = {
  id: "01a060d9-44cb-7685-bea5-8baa5a8a8943",
  type: "page-type/module",
  slug: "potion-restore-resolve",
  definition:
    "which resources a potion restores, unpacked from its item link or read off its item id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A potion whose item link carries its effects is known by unpacking them rather than by a table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item link packs up to three alchemy effect ids, one to a byte, highest byte first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The highest byte carries 128 more where the potion took three reagents.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A byte of 0 is an effect the potion does not have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A potion whose item link carries no effects is known by item id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Four of the game's alchemy effects restore something and the rest restore nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A potion known by item id restores what its potion page states it restores.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Outside the game the potion pages are read as the skill catalogue holds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on reads the potion pages compiled into it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game addon and the web matcher read one module.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No bitwise arithmetic runs here.",
    },
  ],
} as const satisfies Module
