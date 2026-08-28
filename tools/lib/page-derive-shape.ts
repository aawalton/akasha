import { type Values } from "./page-file-values.ts"
import { type Narrow } from "./page-narrow.ts"


export const WALK_BOUND = 64

export interface Carries {
  readonly body?: boolean
  readonly attachment?: readonly string[]
  readonly rows?: readonly string[]
  readonly pages?: boolean
  readonly only?: Narrow
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
  /**
   * Every row of a page type, walked rather than gathered, and `null` where no page type answers.
   *
   * WALKING IT TWICE WALKS IT TWICE. What comes back is an iterable rather than an iterator, so a
   * caller that indexes the rows in one pass and reads them in another finds both passes whole.
   *
   * NOTHING IS READ UNTIL IT IS WALKED. Whether a page type answers at all is settled here; every
   * fault its pages raise stands on the deriver only once the walk has run.
   */
  readonly rows: (pageType: string) => Iterable<Row> | null
  readonly one: (pageType: string, name: string, slugProperty?: string | null) => Row | null
  readonly relations: (pageType: string) => readonly Relation[]
  readonly backed: () => readonly Backed[]
  readonly typeOf: (pageType: string, key: string) => string | null
  readonly attachmentKeys: (pageType: string) => readonly string[]
  readonly faults: () => readonly string[]
}
