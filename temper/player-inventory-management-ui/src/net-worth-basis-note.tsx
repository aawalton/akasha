"use client"

import { formatGold } from "@shared/design-primitives/utils/format-gold"
import { Text } from "@shared/design-primitives/components/text"
import type { ReactNode } from "react"
import { formatDayLabel, type GuildBankBasisChange, toDayString } from "./net-worth-history"

export function NetWorthBasisNote({ change }: { change: GuildBankBasisChange }): ReactNode {
  return (
    <Text variant="caption">
      From {formatDayLabel(toDayString(change.since))}, net worth leaves out guild banks you haven't
      claimed as your own — {formatGold(change.latestValue)} on the latest scan. Earlier points
      still include them, by an amount that was never measured.
    </Text>
  )
}
