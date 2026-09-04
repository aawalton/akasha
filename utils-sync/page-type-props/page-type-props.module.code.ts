import type { StorageTier } from "@akasha/pages-core/types"
import type { Json } from "@akasha/utils-narrow/json-value"

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
  readonly colorRules?: Json
  readonly storage?: StorageTier
}
