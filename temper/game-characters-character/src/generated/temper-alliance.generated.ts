/**
 * Temper Alliances (Generated)
 *
 * ESO character alliances, sourced from the universal pages table
 * (page type: temper-alliance).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { Alliance } from "../alliances-data"

export const TEMPER_ALLIANCE_DATA = {
  "no-alliance": { id: "no-alliance", name: "No Alliance", esoAllianceId: 0 },
  "aldmeri-dominion": { id: "aldmeri-dominion", name: "Aldmeri Dominion", esoAllianceId: 1 },
  "ebonheart-pact": { id: "ebonheart-pact", name: "Ebonheart Pact", esoAllianceId: 2 },
  "daggerfall-covenant": { id: "daggerfall-covenant", name: "Daggerfall Covenant", esoAllianceId: 3 },
} as const satisfies Record<string, Alliance>
