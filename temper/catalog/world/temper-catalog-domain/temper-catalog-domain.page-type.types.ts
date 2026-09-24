import type { Icon } from "akasha/page/properties/icon.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { CapturedAt } from "akasha/temper/catalog/world/properties/captured-at.instant-property.types.ts"
import type { ApiVersion } from "akasha/temper/catalog/world/temper-catalog-domain/properties/api-version.text-property.types.ts"
import type { Dormant } from "akasha/temper/catalog/world/temper-catalog-domain/properties/dormant.boolean-property.types.ts"
import type { GeneratorRanForManifestApiVersion } from "akasha/temper/catalog/world/temper-catalog-domain/properties/generator-ran-for-manifest-api-version.number-property.types.ts"
import type { GeneratorRanForVersion } from "akasha/temper/catalog/world/temper-catalog-domain/properties/generator-ran-for-version.text-property.types.ts"
import type { ManifestApiVersion } from "akasha/temper/catalog/world/temper-catalog-domain/properties/manifest-api-version.number-property.types.ts"

export type TemperCatalogDomain = TemperCatalogThing & {
  icon: Icon
  apiVersion: ApiVersion
  manifestApiVersion: ManifestApiVersion
  capturedAt: CapturedAt
  generatorRanForVersion: GeneratorRanForVersion
  generatorRanForManifestApiVersion: GeneratorRanForManifestApiVersion
  dormant?: Dormant
}
