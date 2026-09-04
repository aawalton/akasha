import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AccountPage } from "./properties/account-page.text-property.ts"
import type { Category } from "./properties/category.text-property.ts"
import type { CategoryId } from "./properties/category-id.text-property.ts"
import type { CompanionId } from "./properties/companion-id.text-property.ts"
import type { Description } from "./properties/description.text-property.ts"
import type { DisplayOrder } from "./properties/display-order.number-property.ts"
import type { EsoCharacterId } from "./properties/eso-character-id.text-property.ts"
import type { Icon } from "./properties/icon.text-property.ts"
import type { Key } from "./properties/key.text-property.ts"
import type { Parent } from "./properties/parent.text-property.ts"
import type { Title } from "./properties/title.text-property.ts"

export type TemperThing = Page & {
  title: Title
  key?: Key
  description?: Description
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
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/display-order",
    "text-property/account-page",
    "text-property/category",
    "text-property/category-id",
    "text-property/companion-id",
    "text-property/description",
    "text-property/eso-character-id",
    "text-property/icon",
    "text-property/key",
    "text-property/parent",
    "text-property/title",
    "text-property/zone-name",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "key", required: false, many: false },
    { pagePropertySlug: "description", required: false, many: false },
    { pagePropertySlug: "icon", required: false, many: false },
    { pagePropertySlug: "display-order", required: false, many: false },
    { pagePropertySlug: "account-page", required: false, many: false },
    { pagePropertySlug: "category-id", required: false, many: false },
    { pagePropertySlug: "category", required: false, many: false },
    { pagePropertySlug: "companion-id", required: false, many: false },
    { pagePropertySlug: "eso-character-id", required: false, many: false },
    { pagePropertySlug: "parent", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page type temper carries extends this one or a page type extending it.",
    },
    {
      invariantKind: "departure",
      statement: "A title is the one property every page temper keeps must state.",
    },
  ],
} as const satisfies PageType
