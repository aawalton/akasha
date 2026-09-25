import type { ReportedAt } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/reported-at.instant-property.types.ts"
import type { Token } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/token.text-property.types.ts"
import type { TokenCreatedAt } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/token-created-at.instant-property.types.ts"
import type { TokenHash } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/token-hash.text-property.types.ts"
import type { TokenLastUsedAt } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/token-last-used-at.instant-property.types.ts"
import type { TokenName } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/token-name.text-property.types.ts"
import type { WatcherOperations } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/watcher-operations.page-property-entry.types.ts"
import type { WatcherVersion } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-version.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"

export type TemperWatcherEnrolment = TemperProgressThing & {
  accountPage: AccountPage
  tokenHash: TokenHash
  tokenName: TokenName
  tokenCreatedAt: TokenCreatedAt
  token?: Token
  tokenLastUsedAt?: TokenLastUsedAt
  watcherVersion?: WatcherVersion
  reportedAt?: ReportedAt
  operations?: WatcherOperations
}
