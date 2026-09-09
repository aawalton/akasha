import type { PageType } from "@akasha/pages/page-type"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.ts"
import type { LastRunOutcome } from "./properties/last-run-outcome.text-property.ts"
import type { Token } from "./properties/token.text-property.ts"
import type { TokenCreatedAt } from "./properties/token-created-at.instant-property.ts"
import type { TokenHash } from "./properties/token-hash.text-property.ts"
import type { TokenLastUsedAt } from "./properties/token-last-used-at.instant-property.ts"
import type { TokenName } from "./properties/token-name.text-property.ts"

export type TemperWatcherEnrolment = TemperProgressThing & {
  tokenHash: TokenHash
  tokenName: TokenName
  tokenCreatedAt: TokenCreatedAt
  token?: Token
  tokenLastUsedAt?: TokenLastUsedAt
  lastRunOutcome?: LastRunOutcome
}

export const temperWatcherEnrolment = {
  id: "01a05fd3-4364-713f-be23-5bd09e86ad23",
  pageTypeSlug: "page-type",
  slug: "temper-watcher-enrolment",
  definition: "one watcher allowed to have a machine's saved game files in",
  pluralSlug: "temper-watcher-enrolments",
  extends: ["page-type/temper-progress-thing"],
  parts: [
    "instant-property/token-created-at",
    "instant-property/token-last-used-at",
    "text-property/last-run-outcome",
    "text-property/token",
    "text-property/token-hash",
    "text-property/token-name",
  ],
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "text-property/token-hash", required: true, many: false },
    { pageProperty: "text-property/token-name", required: true, many: false },
    { pageProperty: "instant-property/token-created-at", required: true, many: false },
    { pageProperty: "text-property/token", required: false, many: false, secret: true },
    {
      pageProperty: "instant-property/token-last-used-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/last-run-outcome",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is recognised by the digest rather than by the token being held here.",
    },
    {
      invariantKind: "departure",
      statement: "An enrolment withdrawn is deleted rather than marked withdrawn.",
    },
  ],
} as const satisfies PageType
