import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Tokens } from "akasha/temper/eso-typings/eso-opt-in-lists/properties/tokens.file-property.ts"

export type EsoOptInList = Domain & {
  tokens: Tokens
}
