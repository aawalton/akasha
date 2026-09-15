import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Tokens } from "akasha/temper/eso-declaration/eso-opt-in-list/properties/tokens.file-property.types.ts"

export type EsoOptInList = Domain & {
  tokens: Tokens
}
