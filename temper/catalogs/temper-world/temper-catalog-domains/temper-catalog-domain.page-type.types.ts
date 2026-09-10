import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Icon } from "../../../things/properties/icon.text-property.ts"
import type { ApiVersion } from "../properties/api-version.text-property.ts"
import type { CapturedAt } from "../properties/captured-at.instant-property.ts"
import type { Dormant } from "../properties/dormant.boolean-property.ts"
import type { GeneratorRanForManifestApiVersion } from "../properties/generator-ran-for-manifest-api-version.number-property.ts"
import type { GeneratorRanForVersion } from "../properties/generator-ran-for-version.text-property.ts"
import type { ManifestApiVersion } from "../properties/manifest-api-version.number-property.ts"

export type TemperCatalogDomain = TemperCatalogThing & {
  icon: Icon
  apiVersion: ApiVersion
  manifestApiVersion: ManifestApiVersion
  capturedAt: CapturedAt
  generatorRanForVersion: GeneratorRanForVersion
  generatorRanForManifestApiVersion: GeneratorRanForManifestApiVersion
  dormant?: Dormant
}
