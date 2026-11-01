import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const buildInterface = {
  id: "01a1989e-af96-747b-99be-1f9b7961d2c5",
  type: "page-type/page-type",
  slug: "build-interface",
  definition: "passives and champion stars a build includes rather than holding them itself",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "build interface" },
    { partOfSpeech: "part-of-speech/noun", spelling: "build interfaces" },
  ],
  extends: ["page-type/temper-thing"],
  parts: [
    "multi-relation-property/passive-lines",
    "multi-relation-property/passive-line-categories",
    "multi-relation-property/left-out-passives",
    "record-property/interface-passives",
    "relation-property/passive-skill",
    "boolean-property/every-passive-star",
    "multi-relation-property/slotted-stars",
  ],
  properties: [
    {
      pageProperty: "multi-relation-property/passive-lines",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/passive-line-categories",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/left-out-passives",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "record-property/interface-passives",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "boolean-property/every-passive-star", required: false, many: false },
    {
      pageProperty: "multi-relation-property/slotted-stars",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This page type is Temper's while its slug has no temper- prefix.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An interface names kinds of skill line where only the build can say which lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive an interface leaves out is left out of every line it holds.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-11-01T19:38:18.901Z",
  updatedAt: "2026-11-01T19:38:18.901Z",
} as const satisfies PageType
