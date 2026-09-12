import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Tokens } from "akasha/temper/eso-declaration/eso-opt-in-lists/properties/tokens.file-property.types.ts"

export type EsoOptInList = Domain & {
  tokens: Tokens
}
