import type { AccountPage } from "../../things/properties/account-page.text-property.types.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
import type { LastRunOutcome } from "./properties/last-run-outcome.text-property.types.ts"
import type { Token } from "./properties/token.text-property.types.ts"
import type { TokenCreatedAt } from "./properties/token-created-at.instant-property.types.ts"
import type { TokenHash } from "./properties/token-hash.text-property.types.ts"
import type { TokenLastUsedAt } from "./properties/token-last-used-at.instant-property.types.ts"
import type { TokenName } from "./properties/token-name.text-property.types.ts"

export type TemperWatcherEnrolment = TemperProgressThing & {
  accountPage: AccountPage
  tokenHash: TokenHash
  tokenName: TokenName
  tokenCreatedAt: TokenCreatedAt
  token?: Token
  tokenLastUsedAt?: TokenLastUsedAt
  lastRunOutcome?: LastRunOutcome
}
