interface LeaderboardColumnDef {
  label: string
  fullName: string
  description: string
  metricKey: string
}

export const LEADERBOARD_COLUMNS: LeaderboardColumnDef[] = [
  {
    label: "DPS",
    fullName: "Damage Per Second",
    description: "Total damage per second",
    metricKey: "companion-dps-total",
  },
  {
    label: "TPS",
    fullName: "Toughness Per Second",
    description: "Total toughness per second",
    metricKey: "companion-tps-total",
  },
  {
    label: "HPS",
    fullName: "Healing Per Second",
    description: "Total healing per second",
    metricKey: "companion-hps-total",
  },
  {
    label: "Spt",
    fullName: "Support Score",
    description: "Combined support contribution from damage and toughness buffs",
    metricKey: "companion-support-score",
  },
]
