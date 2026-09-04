import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperThing } from "../../temper-things/temper-thing.page-type.ts"
import type { Completion } from "./properties/completion.file-property.ts"
import type { TargetBuildId } from "./properties/target-build-id.text-property.ts"

export type TemperCharacterThing = TemperThing & {
  completion?: Completion
  targetBuildId?: TargetBuildId
}

export const temperCharacterThing = {
  id: "01a05fc7-2438-772b-b909-71a3ac0f3bc7",
  pageTypeSlug: "page-type",
  slug: "temper-character-thing",
  definition: "anything about one player and the characters that player owns",
  pluralSlug: "temper-character-things",
  extendsSlug: ["page-type/temper-thing"],
  partSlugs: ["file-property/completion", "text-property/target-build-id"],
  properties: [
    { pagePropertySlug: "completion", required: false, many: false },
    { pagePropertySlug: "target-build-id", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A completion file is kept word for word as the game handed the file over.",
    },
  ],
} as const satisfies PageType
