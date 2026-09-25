import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiWindows = {
  id: "01a0ca65-c4cb-73a7-ad02-0bed65be11c3",
  type: "page-type/module",
  slug: "ui-windows",
  definition: "the windows the harness knows how to bring up, and what bringing each one up takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is listed here only once a run has brought that window up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window states the addon it belongs to, the Lua that opens it and the control it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window states every saved variable file opening that window reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window states the game's own windows that window is shown beside.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A window the game fills from the server is shown as the frame and nothing in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window a document declares outright is named as one nothing here can bring up yet.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No window is brought up from a guess at what opens it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scene of the game's is shown through the game's own scene manager.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window is opened by what its addon runs, a command, a key or a station's event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window's addon is started by its own load, never again by what opens it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key pressed in a scene of the game's is pressed once that scene has shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window seeds its own addon's saved variables unless it says otherwise.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A window shown only in a zone or a guild is reached through what the player's game answered.",
    },
  ],
} as const satisfies Module
