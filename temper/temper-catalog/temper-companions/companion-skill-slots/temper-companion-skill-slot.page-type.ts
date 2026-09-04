import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionSkillSlot = TemperCompanionThing

export const temperCompanionSkillSlot = {
  id: "01a05fcd-41a9-75e4-9a61-ca49c001eb2d",
  pageTypeSlug: "page-type",
  slug: "temper-companion-skill-slot",
  definition: "a place on a companion's bar one ability sits",
  pluralSlug: "temper-companion-skill-slots",
  extendsSlug: ["page-type/temper-companion-thing"],
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
