import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { ApiVersion } from "../properties/api-version.text-property.ts"
import type { CapturedAt } from "../properties/captured-at.instant-property.ts"
import type { Dormant } from "../properties/dormant.boolean-property.ts"
import type { GeneratorRanForManifestApiVersion } from "../properties/generator-ran-for-manifest-api-version.number-property.ts"
import type { GeneratorRanForVersion } from "../properties/generator-ran-for-version.text-property.ts"
import type { ManifestApiVersion } from "../properties/manifest-api-version.number-property.ts"

export type TemperCatalogDomain = TemperCatalogThing & {
  apiVersion: ApiVersion
  manifestApiVersion: ManifestApiVersion
  capturedAt: CapturedAt
  generatorRanForVersion: GeneratorRanForVersion
  generatorRanForManifestApiVersion: GeneratorRanForManifestApiVersion
  dormant?: Dormant
}

export const temperCatalogDomain = {
  id: "01a05fc4-7a8e-7cdd-859d-6e17f19d2d93",
  pageTypeSlug: "page-type",
  slug: "temper-catalog-domain",
  definition: "one area of the game a capture mirrors",
  pluralSlug: "temper-catalog-domains",
  extends: ["page-type/temper-catalog-thing"],
  partSlugs: [
    "boolean-property/dormant",
    "number-property/generator-ran-for-manifest-api-version",
    "number-property/manifest-api-version",
    "text-property/api-version",
    "text-property/generator-ran-for-version",
  ],
  properties: [
    { pagePropertySlug: "text-property/icon", required: true, many: false },
    { pagePropertySlug: "text-property/api-version", required: true, many: false },
    { pagePropertySlug: "number-property/manifest-api-version", required: true, many: false },
    { pagePropertySlug: "instant-property/captured-at", required: true, many: false },
    { pagePropertySlug: "text-property/generator-ran-for-version", required: true, many: false },
    {
      pagePropertySlug: "number-property/generator-ran-for-manifest-api-version",
      required: true,
      many: false,
    },
    { pagePropertySlug: "boolean-property/dormant", required: false, many: false },
  ],
} as const satisfies PageType
