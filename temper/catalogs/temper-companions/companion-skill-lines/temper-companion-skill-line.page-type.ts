import type { PageType } from "@akasha/pages/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionSkillLine = TemperCompanionThing

export const temperCompanionSkillLine = {
  id: "01a05fce-1854-7d72-872a-0e22ce5c84c5",
  pageTypeSlug: "page-type",
  slug: "temper-companion-skill-line",
  definition: "a group of companion abilities learned together",
  pluralSlug: "temper-companion-skill-lines",
  extends: ["page-type/temper-companion-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/companion-id", required: true, many: false },
    { pagePropertySlug: "text-property/category", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
  ],
} as const satisfies PageType
