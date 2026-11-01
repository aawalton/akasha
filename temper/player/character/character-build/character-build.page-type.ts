import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterBuild = {
  id: "01a06835-fae8-7243-8c39-219aa5e07daf",
  type: "page-type/page-type",
  slug: "character-build",
  definition: "a saved arrangement of a character's gear, skills and stats",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "character build" },
    { partOfSpeech: "part-of-speech/noun", spelling: "character builds" },
  ],
  extends: ["page-type/temper-character-thing"],
  parts: [
    "module/character-build-filing",
    "page-type/character-build-version",
    "number-property/build-target-count",
    "select-property/build-visibility",
    "text-property/build-character-name",
    "multi-relation-property/build-interfaces",
    "text-property/build-correlation-id",
    "domain/temper-build-optimization",
    "number-property/build-icon",
    "text-property/build-edit-id",
    "record-property/build-quickslots",
    "number-property/quickslot-slot",
    "select-property/quickslot-kind",
    "number-property/quickslot-id",
    "text-property/quickslot-name",
  ],
  properties: [
    { pageProperty: "text-property/build-hash", required: true, many: false },
    { pageProperty: "select-property/build-visibility", required: true, many: false },
    { pageProperty: "text-property/build-correlation-id", required: false, many: false },
    { pageProperty: "number-property/build-target-count", required: false, many: false },
    {
      pageProperty: "multi-relation-property/character-roles",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/build-character-name", required: false, many: false },
    {
      pageProperty: "multi-relation-property/build-interfaces",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/build-icon", required: false, many: false },
    { pageProperty: "text-property/build-edit-id", required: false, many: false },
    {
      pageProperty: "record-property/build-quickslots",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build is the arrangement itself rather than the character wearing that arrangement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One character has many builds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One build is shared across characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two builds arranged alike carry one hash.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "This page type is Temper's while its slug has no temper- prefix.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build's name is its title rather than a second field saying the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build is saved, renamed and equipped in the game the way the game's Armory does it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build changed in the game reaches its page when the game next writes its saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build changed on alanwalton.com after the game last read it keeps that change over the game's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game says when a change made in it was not kept.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:59:23.240Z",
  updatedAt: "2026-11-01T22:41:56.096Z",
} as const satisfies PageType
