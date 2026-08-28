import { type Values } from "./page-file-values.ts"


export const WALK_BOUND = 64

export interface Carries {
  readonly body?: boolean
  readonly attachment?: readonly string[]
  readonly rows?: readonly string[]
  readonly pages?: boolean
  readonly only?: readonly string[]
}

export interface Row {
  readonly at: string
  readonly values: Values
}

export interface Relation {
  readonly key: string
  readonly target: string
  readonly slugProperty: string | null
}

export interface Backed {
  readonly slug: string
  readonly repo: string | null
  readonly glob: string | null
  readonly heldBy: readonly string[]
  readonly namedFor: string | null
}

export interface Deriver {
  readonly rows: (pageType: string) => Iterable<Row> | null
  readonly one: (pageType: string, name: string, slugProperty?: string | null) => Row | null
  readonly relations: (pageType: string) => readonly Relation[]
  readonly backed: () => readonly Backed[]
  readonly typeOf: (pageType: string, key: string) => string | null
  readonly attachmentKeys: (pageType: string) => readonly string[]
  readonly faults: () => readonly string[]
}
