import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperThing } from "../../temper-things/temper-thing.page-type.ts"
import type { Completion } from "./properties/completion.file-property.ts"

export type TemperCharacterThing = TemperThing & {
  completion?: Completion
}

export const temperCharacterThing = {
  id: "01a05fc7-2438-772b-b909-71a3ac0f3bc7",
  pageTypeSlug: "page-type",
  slug: "temper-character-thing",
  definition: "anything about one player and the characters that player owns",
  pluralSlug: "temper-character-things",
  extendsSlug: "page-type/temper-thing",
  partSlugs: ["file-property/completion"],
  properties: [{ pagePropertySlug: "completion", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A completion file is kept word for word as the game handed the file over.",
    },
  ],
} as const satisfies PageType
