import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const potionRestoreResolve = {
  id: "01a060d9-44cb-7685-bea5-8baa5a8a8943",
  type: "module",
  slug: "potion-restore-resolve",
  definition:
    "which resources a potion restores, unpacked from its item link or read off its item id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A potion whose item link carries its effects is known by unpacking them rather than by a table.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item link packs up to three alchemy effect ids, one to a byte, highest byte first.",
    },
    {
      invariantKind: "departure",
      statement: "The highest byte carries 128 more where the potion took three reagents.",
    },
    {
      invariantKind: "departure",
      statement: "A byte of 0 is an effect the potion does not have.",
    },
    {
      invariantKind: "departure",
      statement: "A potion whose item link carries no effects is known by item id.",
    },
    {
      invariantKind: "departure",
      statement:
        "Four of the game's alchemy effects restore something and the rest restore nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "The item id table is written out from the alchemy and mined-item pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "The game addon and the web matcher read one module.",
    },
    {
      invariantKind: "absence",
      statement: "No bitwise arithmetic runs here.",
    },
  ],
} as const satisfies Module
