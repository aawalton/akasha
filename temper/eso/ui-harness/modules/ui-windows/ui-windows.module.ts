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
      statement: "A tooltip is opened on the first item in the backpack that brings it up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gamepad tooltip is laid out through the game's own gamepad tooltips.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Temper's popover is opened by pointing at the guild history status icon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Guild Store Search is opened by pressing its button once the game's store has shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window seeds its own addon's saved variables unless it says otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window states each other addon whose table its addon reads in the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The task display comes up beside the world addon, whose lead window says where leads are had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window the player's settings keep hidden is turned on by its own toggle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The crafting button is turned on by its show-button option.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game shows its add-on terms before the Addons page to a player not agreed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Addons page is opened as by a player who agreed to the add-on terms.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window filled on an interval runs that interval's work once as it opens.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "No companion is out in Imperial City, where the next-boss timetable shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next-boss timetable is brought up with no companion out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole HUD is the screen, with every Temper addon that draws on the HUD up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Advanced Stats is opened by its button's fragment group once the stats scene shows.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A window shown only in a zone or a guild is reached through what the player's game answered.",
    },
  ],
  createdAt: "2026-09-22T18:34:22.283Z",
  updatedAt: "2026-10-27T19:22:45.618Z",
} as const satisfies Module
