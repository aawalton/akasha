import type { LastRunOutcome } from "akasha/temper/progressions/temper-watcher-enrolments/properties/last-run-outcome.text-property.types.ts"
import type { Token } from "akasha/temper/progressions/temper-watcher-enrolments/properties/token.text-property.types.ts"
import type { TokenCreatedAt } from "akasha/temper/progressions/temper-watcher-enrolments/properties/token-created-at.instant-property.types.ts"
import type { TokenHash } from "akasha/temper/progressions/temper-watcher-enrolments/properties/token-hash.text-property.types.ts"
import type { TokenLastUsedAt } from "akasha/temper/progressions/temper-watcher-enrolments/properties/token-last-used-at.instant-property.types.ts"
import type { TokenName } from "akasha/temper/progressions/temper-watcher-enrolments/properties/token-name.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"

export type TemperWatcherEnrolment = TemperProgressThing & {
  accountPage: AccountPage
  tokenHash: TokenHash
  tokenName: TokenName
  tokenCreatedAt: TokenCreatedAt
  token?: Token
  tokenLastUsedAt?: TokenLastUsedAt
  lastRunOutcome?: LastRunOutcome
}
