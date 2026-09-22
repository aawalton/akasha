import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiVirtuals = {
  id: "01a0c9e5-f156-7ff3-866f-f671da96312f",
  type: "page-type/module",
  slug: "ui-virtuals",
  definition: "the control templates an interface document declares, read outside the game",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A template is any element in the document saying it is virtual.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template is keyed by the name that element carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The element's own tag says which kind of control the template makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template inheriting another takes that other's children before its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template naming more than one to inherit takes them in the order written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point an anchor names by word becomes the number the game holds for that word.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No handler an interface document writes inline is read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No animation an interface document declares is read here.",
    },
  ],
} as const satisfies Module
