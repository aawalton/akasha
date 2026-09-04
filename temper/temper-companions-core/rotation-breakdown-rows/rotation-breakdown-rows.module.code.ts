import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface RotationBreakdownRowTemplate {
  id: string
  name: string
  fullName: string
  description: string
}

export const TEMPER_ROTATION_BREAKDOWN_ROWS = {
  "damage": {
    id: "damage",
    name: "Damage",
    fullName: "Total Damage",
    description: "Total damage dealt over the rotation",
  },
  "d-percent": {
    id: "d-percent",
    name: "D %",
    fullName: "Damage Percent",
    description: "Percentage of total damage dealt",
  },
  "dps": {
    id: "dps",
    name: "DPS",
    fullName: "Damage Per Second",
    description: "Average damage dealt per second",
  },
  "dpc": {
    id: "dpc",
    name: "DPC",
    fullName: "Damage Per Cast",
    description: "Average damage dealt per skill cast",
  },
  "healing": {
    id: "healing",
    name: "Healing",
    fullName: "Total Healing",
    description: "Total healing done over the rotation",
  },
  "h-percent": {
    id: "h-percent",
    name: "H %",
    fullName: "Healing Percent",
    description: "Percentage of total healing done",
  },
  "sps": {
    id: "sps",
    name: "SPS",
    fullName: "Shielding Per Second",
    description: "Average shielding applied per second",
  },
  "spc": {
    id: "spc",
    name: "SPC",
    fullName: "Shielding Per Cast",
    description: "Average shielding applied per skill cast",
  },
  "hps": {
    id: "hps",
    name: "HPS",
    fullName: "Healing Per Second",
    description: "Average healing done per second",
  },
  "hpc": {
    id: "hpc",
    name: "HPC",
    fullName: "Healing Per Cast",
    description: "Average healing done per skill cast",
  },
  "casts": {
    id: "casts",
    name: "Casts",
    fullName: "Total Casts",
    description: "Number of times the skill was used",
  },
  "uptime": {
    id: "uptime",
    name: "Uptime",
    fullName: "Effect Uptime",
    description: "Percentage of time the effect was active",
  },
  "tps": {
    id: "tps",
    name: "TPS",
    fullName: "Average Effective Health",
    description: "Effective health contribution from defensive effects",
  },
} as const satisfies Record<string, RotationBreakdownRowTemplate>

export const rotationBreakdownRows = createDataFile<RotationBreakdownRowTemplate>()(
  TEMPER_ROTATION_BREAKDOWN_ROWS
)

export type RotationBreakdownRowId = (typeof rotationBreakdownRows.ids)[number]
