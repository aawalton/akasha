import type { Domain } from "../../../domains/domain.page-type.ts"
import type { Tokens } from "./properties/tokens.file-property.ts"

export type EsoOptInList = Domain & {
  tokens: Tokens
}
