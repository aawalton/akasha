import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { Tokens } from "./properties/tokens.file-property.ts"

export type EsoOptInList = Domain & {
  tokens: Tokens
}
