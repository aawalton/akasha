import type { ApiVersion } from "akasha/temper/catalog/temper-world/properties/api-version.text-property.types.ts"
import type { CapturedAt } from "akasha/temper/catalog/temper-world/properties/captured-at.instant-property.types.ts"
import type { Dormant } from "akasha/temper/catalog/temper-world/properties/dormant.boolean-property.types.ts"
import type { GeneratorRanForManifestApiVersion } from "akasha/temper/catalog/temper-world/properties/generator-ran-for-manifest-api-version.number-property.types.ts"
import type { GeneratorRanForVersion } from "akasha/temper/catalog/temper-world/properties/generator-ran-for-version.text-property.types.ts"
import type { ManifestApiVersion } from "akasha/temper/catalog/temper-world/properties/manifest-api-version.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"

export type TemperCatalogDomain = TemperCatalogThing & {
  icon: Icon
  apiVersion: ApiVersion
  manifestApiVersion: ManifestApiVersion
  capturedAt: CapturedAt
  generatorRanForVersion: GeneratorRanForVersion
  generatorRanForManifestApiVersion: GeneratorRanForManifestApiVersion
  dormant?: Dormant
}
