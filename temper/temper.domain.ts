import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temper = {
  id: "01a05db7-8d7c-762b-a343-9535d258e0b5",
  type: "page-type/domain",
  slug: "temper",
  definition: "a companion suite for The Elder Scrolls Online",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "temper" }],
  parts: [
    "domain/temper-catalog",
    "domain/temper-command",
    "module/addon-init",
    "module/assert-schema-matches-payload",
    "module/character-class",
    "module/chat-entry-text",
    "module/descriptor",
    "module/gamepad-tooltip-style",
    "module/movable-window",
    "module/perf-trace",
    "module/surface-backdrop",
    "module/unpack-color",
    "page-type/temper-thing",
    "router-app/temper-web",
    "service-workstation/temper-watcher",
    "domain/temper-eso",
    "domain/temper-capture",
    "domain/temper-economy",
    "domain/temper-items",
    "domain/temper-player",
    "page-type/temper-addon",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a thing falls among its siblings is stated by `display-order` and by no other property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type temper carries is worked out from the page types its pages state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property more than one page type carries is declared by a page type above those page types.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every need a player has outside The Elder Scrolls Online is met by Temper.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the addon writes into the game's saved variables is a capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is worked out from a capture outside the game is a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing a reading into akasha is a landing.",
    },
  ],
} as const satisfies Domain
