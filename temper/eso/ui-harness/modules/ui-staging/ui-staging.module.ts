import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiStaging = {
  id: "01a0ca65-211f-7d61-a848-1af03a21431c",
  type: "page-type/module",
  slug: "ui-staging",
  definition:
    "a harness brought up with the game's templates, the game's libraries and an addon in it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An addon is brought up from the build its last deploy left rather than from the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon with no build left behind refuses rather than coming up empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The commit that build was pinned at is carried back, so a caller says what it drew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The templates are every one the game declares and every one Temper declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game's whole ingame interface, Lua and documents, is loaded in the game's own order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A document's windows are built where that document falls in the order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every global the game's Lua defines is left unstubbed before any of it loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's interface is announced loaded once every addon's files have loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player's saved variables are loaded before the game's interface is announced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each addon is announced loaded after that, in the order its files loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listener raising at that announcement is named among the refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game's fonts are made before its Lua loads, as the game's font program loads first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every face the game's font strings name is kept in the art cache before the harness is opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The timelines every document declares are handed over before the game's Lua loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A game file the sandbox refuses is named and passed over, so the addon still comes up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window of the game's own that a caller names is shown once every addon is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The addon's built files load in the order the addon's own manifest lists them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every addon an addon's manifest depends on is loaded before it, once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dependency with no build beside the addon is passed over, as one not installed.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A document of the addon's builds its windows where it falls in that order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The fonts a document declares are made as that document is declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What was called for later runs after each announcement, once shown, and once activated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call for later that raises stops that settling and leaves the rest waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player's saved variables are seeded whole where the window asks for them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the player's own game answered is set before the game's Lua loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The screen is as wide and tall as the player's interface where a capture says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The player's answers that the player is activated and the skills are ready are not set.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A capture is taken once the player is activated, and holds no answer about the skill lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A machine holding no such answers stages with the answers the rest of akasha holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game's own saved variables library is loaded rather than modelled again here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The account a saved variable is read under is the first by name the seeded files hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who the player is answers from what the player's own game answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where the game answered none, the account is the seeded files' and the character the harness.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's own HUD hides what is idle only when the player is activated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The player is activated once the addon is up, as on the game's first load screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game is told the player is activated from the moment the player is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listener raising at the player's activation is named among the refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness that will not come up is closed rather than left open.",
    },
  ],
} as const satisfies Module
