import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const houseStorageChest = {
  id: "01a1262f-a05c-7dbf-9af9-036cd595d728",
  type: "page-type/module",
  slug: "house-storage-chest",
  definition: "the storage chest a house-storage destination names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule names the storage chest the rule fills by the chest's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chest renamed carries the rules naming its new name, and none naming its old.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name matches a chest whatever its case and the spaces at its ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A destination naming no chest, or two chests, fills no chest and says why.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A destination holding only digits names a chest by its collectible id.",
    },
  ],
  createdAt: "2026-10-10T14:20:17.884Z",
  updatedAt: "2026-10-10T14:20:17.884Z",
} as const satisfies Module
