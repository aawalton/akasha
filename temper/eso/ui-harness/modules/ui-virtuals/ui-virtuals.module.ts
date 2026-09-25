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
      statement: "A template naming more than one to inherit takes them in the order written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point an anchor names by word becomes the number the game holds for that word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point an anchor writes as a number is taken as that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element's child whose tag opens with On is a handler that element writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A handler carrying a name is kept under its event and that name, beside the unnamed one.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A handler is handed the control it is on, and whatever else the game hands it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order handlers were added in is written beside them, an inherited one first.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A window a document declares outright is read apart from the templates.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every control a document holds at its root and not as a template is a window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window declared outright takes what the templates that window inherits hold.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A backdrop's edge, center and insets, and a button's normal art, are read as written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The part of its file a texture shows is read as left, right, top and bottom.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backdrop's colors are read from its color elements, else from its attributes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No animation an interface document declares is read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a control grows to fit what it holds is read as the document says it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The padding a control keeps around what it grows to fit is read as written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A label's wrap mode and greatest line count are read off its attributes, as Lua would set them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrap mode named by word becomes the number the game holds for that word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The least and greatest size a template holds a control to are read as written, a side unstated as 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A size or an offset the document gives as a name is kept as that name.",
    },
  ],
} as const satisfies Module
