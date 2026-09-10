import type { StorageTier } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { Json } from "akasha/utils/narrow/json-value/json-value.module.code.ts"

export interface RelationTarget {
  readonly target: string
  readonly back: string
}

export interface PropSpec {
  readonly stringId: string
  readonly title: string
  readonly type: string
  readonly options?: readonly string[]
  readonly relation?: RelationTarget
  readonly config?: Readonly<Record<string, Json>>
  readonly storage?: StorageTier
}
