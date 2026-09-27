import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import { leaderboardColumnsDps } from "akasha/temper/web/phrase/pages/leaderboard-columns-dps.temper-web-phrase.ts"
import { leaderboardColumnsDpsDescription } from "akasha/temper/web/phrase/pages/leaderboard-columns-dps-description.temper-web-phrase.ts"
import { leaderboardColumnsHps } from "akasha/temper/web/phrase/pages/leaderboard-columns-hps.temper-web-phrase.ts"
import { leaderboardColumnsHpsDescription } from "akasha/temper/web/phrase/pages/leaderboard-columns-hps-description.temper-web-phrase.ts"
import { leaderboardColumnsSupport } from "akasha/temper/web/phrase/pages/leaderboard-columns-support.temper-web-phrase.ts"
import { leaderboardColumnsSupportDescription } from "akasha/temper/web/phrase/pages/leaderboard-columns-support-description.temper-web-phrase.ts"
import { leaderboardColumnsTps } from "akasha/temper/web/phrase/pages/leaderboard-columns-tps.temper-web-phrase.ts"
import { leaderboardColumnsTpsDescription } from "akasha/temper/web/phrase/pages/leaderboard-columns-tps-description.temper-web-phrase.ts"

interface LeaderboardColumnDef {
  readonly label: { readonly slug: string }
  readonly description: { readonly slug: string }
  readonly metricKey: CompanionMetricId
}

export const LEADERBOARD_COLUMNS: readonly LeaderboardColumnDef[] = [
  {
    label: leaderboardColumnsDps,
    description: leaderboardColumnsDpsDescription,
    metricKey: "companion-dps-total",
  },
  {
    label: leaderboardColumnsTps,
    description: leaderboardColumnsTpsDescription,
    metricKey: "companion-tps-total",
  },
  {
    label: leaderboardColumnsHps,
    description: leaderboardColumnsHpsDescription,
    metricKey: "companion-hps-total",
  },
  {
    label: leaderboardColumnsSupport,
    description: leaderboardColumnsSupportDescription,
    metricKey: "companion-support-score",
  },
]
