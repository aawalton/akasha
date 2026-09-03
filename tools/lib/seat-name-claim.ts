import type { SeatPresence } from "@akasha/seat-system/seat-proc-key"
import { ruleText } from "./instructions-rule.ts"
import { DECLARATION_RELATIVE_PATH, decideSpawnGuard } from "./spawn-guard.ts"

export interface NameHolder {
  readonly id: string
  readonly presence: SeatPresence
}

export function refuseHeldName(holder: NameHolder | null): string | null {
  const guard = decideSpawnGuard({ holder: holder?.presence ?? "absent" })
  if (guard.kind !== "reject") return null
  return ruleText(guard.reason, "reason", {
    command: "seat start",
    where: DECLARATION_RELATIVE_PATH,
    call: "decideSpawnGuard",
  })
}
