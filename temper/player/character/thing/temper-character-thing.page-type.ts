import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCharacterThing = {
  id: "01a05fc7-2438-772b-b909-71a3ac0f3bc7",
  type: "page-type/page-type",
  slug: "temper-character-thing",
  definition: "anything about a player and the characters that player owns",
  extends: ["page-type/temper-thing"],
  parts: ["file-property/completion", "text-property/target-build-id"],
  properties: [
    { pageProperty: "file-property/completion", required: false, many: false },
    { pageProperty: "text-property/target-build-id", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion file is kept word for word as the game handed the file over.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
