import type { PageType } from "@akasha/pages/page-type"
import type { TemperScript } from "../temper-scripts/temper-script.page-type.types.ts"

export type TemperFocusScript = TemperScript

export const temperFocusScript = {
  id: "01a05fca-cb89-7c54-89c6-5392b871f29f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-focus-script",
  definition: "the script naming what a scribed skill does",
  pluralSlug: "temper-focus-scripts",
  extends: ["page-type/temper-script"],
} as const satisfies PageType
