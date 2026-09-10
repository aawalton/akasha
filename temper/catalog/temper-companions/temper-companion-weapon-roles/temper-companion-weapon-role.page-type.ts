import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperCompanionWeaponRole = {
  id: "01a05fcd-aed1-7e12-be73-72bd7b05ba15",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-weapon-role",
  definition: "a way a companion's weapons are paired",
  pluralSlug: "temper-companion-weapon-roles",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "text-property/valid-main-hand-weapon-types",
    "text-property/valid-off-hand-weapon-types",
    "text-property/weapon-skill-line-id",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/weapon-skill-line-id", required: true, many: false },
    {
      pageProperty: "text-property/valid-main-hand-weapon-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "text-property/valid-off-hand-weapon-types",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  types: "ts",
} as const satisfies PageType
