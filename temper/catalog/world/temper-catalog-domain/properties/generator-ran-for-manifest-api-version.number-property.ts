import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const generatorRanForManifestApiVersion = {
  id: "01a05fc4-7a92-7ab8-b98f-ca40f8af5eb1",
  type: "page-type/number-property",
  slug: "generator-ran-for-manifest-api-version",
  propertySlug: "generator-ran-for-manifest-api-version",
  definition: "the manifest number of the generator's last run",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
