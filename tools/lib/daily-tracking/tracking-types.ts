/**
 * The narrow types this folder shares with `lib/tracking`.
 *
 * Fourteen more were declared here and named by nobody: `Json`, `PageCondition`, `PageWhere`,
 * `PageCursor`, `GetPagesResult`, `QueryRow`, `Asked`, `Written`, `ComposedQuery`,
 * `PageEntitySurfaceConfig`, `DailyTierColor`, `DailyTierLadder`, `InboxKey` and
 * `VolumeSetInput`. They described a page client that was removed, and they outlived it.
 *
 * What reads this module was counted across whole import clauses rather than line by line, so a
 * multi-line clause is not missed: the ten files under `lib/tracking` name `Page` alone,
 * `tracking-capability.ts` names `Page` and `PageAccessClient`, and the three siblings here name
 * `WriteOutcome`, `ReadonlyJSONValue` and `PropertyDefinition`. A namespace import or a default
 * import would hide a reader from that count, so both were searched for under a seeded control
 * that fired; neither exists. The five below are the whole of what anything reads.
 */

export type PageAccessClient = unknown

export interface Page {
  readonly id: string
  readonly seq: number
  readonly [key: string]: unknown
}

export type WriteOutcome = "patched" | "created"

export type ReadonlyJSONValue =
  | string
  | number
  | boolean
  | null
  | readonly ReadonlyJSONValue[]
  | { readonly [key: string]: ReadonlyJSONValue }

export interface PropertyDefinition {
  readonly id: string
  readonly slug: string
  readonly kind?: string
  readonly [key: string]: unknown
}
