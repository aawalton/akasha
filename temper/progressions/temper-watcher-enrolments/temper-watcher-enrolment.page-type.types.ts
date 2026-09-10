import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.ts"
import type { LastRunOutcome } from "./properties/last-run-outcome.text-property.ts"
import type { Token } from "./properties/token.text-property.ts"
import type { TokenCreatedAt } from "./properties/token-created-at.instant-property.ts"
import type { TokenHash } from "./properties/token-hash.text-property.ts"
import type { TokenLastUsedAt } from "./properties/token-last-used-at.instant-property.ts"
import type { TokenName } from "./properties/token-name.text-property.ts"

export type TemperWatcherEnrolment = TemperProgressThing & {
  accountPage: AccountPage
  tokenHash: TokenHash
  tokenName: TokenName
  tokenCreatedAt: TokenCreatedAt
  token?: Token
  tokenLastUsedAt?: TokenLastUsedAt
  lastRunOutcome?: LastRunOutcome
}
