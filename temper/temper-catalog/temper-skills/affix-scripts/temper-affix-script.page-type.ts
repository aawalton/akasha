import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperScript } from "../scripts/temper-script.page-type.ts"

export type TemperAffixScript = TemperScript

export const temperAffixScript = {
  id: "01a05fca-cb89-788f-9f0a-64f49f04b8a8",
  pageTypeSlug: "page-type",
  slug: "temper-affix-script",
  definition: "the script naming the bonus a scribed skill grants",
  pluralSlug: "temper-affix-scripts",
  extendsSlug: "page-type/temper-script",
} as const satisfies PageType
