import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { AccountPage } from "./properties/account-page.text-property.ts"
import type { Category } from "./properties/category.text-property.ts"
import type { CategoryId } from "./properties/category-id.text-property.ts"
import type { CompanionId } from "./properties/companion-id.text-property.ts"
import type { DisplayOrder } from "./properties/display-order.number-property.ts"
import type { EsoCharacterId } from "./properties/eso-character-id.text-property.ts"
import type { Icon } from "./properties/icon.text-property.ts"
import type { Key } from "./properties/key.text-property.ts"
import type { Parent } from "./properties/parent.text-property.ts"

export type TemperThing = Page & {
  key?: Key
  icon?: Icon
  displayOrder?: DisplayOrder
  accountPage?: AccountPage
  category?: Category
  categoryId?: CategoryId
  companionId?: CompanionId
  esoCharacterId?: EsoCharacterId
  parent?: Parent
}

export const temperThing = {
  id: "01a05fb0-3ce8-72d1-bc97-7c0f7f1810b3",
  pageTypeSlug: "page-type",
  slug: "temper-thing",
  definition: "anything temper keeps a page for",
  pluralSlug: "temper-things",
  extends: ["page-type/page"],
  owner: "account-page",
  partSlugs: [
    "number-property/display-order",
    "text-property/account-page",
    "text-property/category",
    "text-property/category-id",
    "text-property/companion-id",
    "text-property/eso-character-id",
    "text-property/icon",
    "text-property/key",
    "text-property/parent",
    "text-property/zone-name",
  ],
  properties: [
    { pagePropertySlug: "text-property/key", required: false, many: false },
    { pagePropertySlug: "text-property/icon", required: false, many: false },
    { pagePropertySlug: "number-property/display-order", required: false, many: false },
    { pagePropertySlug: "text-property/account-page", required: false, many: false },
    { pagePropertySlug: "text-property/category-id", required: false, many: false },
    { pagePropertySlug: "text-property/category", required: false, many: false },
    { pagePropertySlug: "text-property/companion-id", required: false, many: false },
    { pagePropertySlug: "text-property/eso-character-id", required: false, many: false },
    { pagePropertySlug: "text-property/parent", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every page type temper carries extends temper-thing or a page type extending temper-thing.",
    },
  ],
} as const satisfies PageType
