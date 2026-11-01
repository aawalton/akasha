import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const filterBar = {
  id: "01a0614b-6735-71b0-b1bb-6d698f3b387d",
  type: "page-type/module",
  slug: "filter-bar",
  definition: "the panel a player adds filter rows to while the inventory is open",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter row is drawn only once the player picks that filter from the add menu.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Removing a row clears the value that row was holding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A removed row is hidden and reused rather than rebuilt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel hides whenever the inventory scene hides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel reanchors each time the inventory scene shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel sits under the inventory plan, beside the inventory window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel under the plan takes the plan's width.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel shown beside named controls shows and hides with those controls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel is a flat rounded fill, laid out as the website's filter popover is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is its filter's name and a remove mark, over that filter's pills.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The add menu is a pill under the last row, offering only the filters not shown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The panel has no title and no clear button.",
    },
  ],
  createdAt: "2026-09-02T08:45:26.709Z",
  updatedAt: "2026-11-01T22:11:58.614Z",
} as const satisfies Module
