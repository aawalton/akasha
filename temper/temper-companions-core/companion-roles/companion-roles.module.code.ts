import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionRoleTemplate {
  id: string
  name: string
}

const COMPANION_ROLE_DATA = {
  "no-role": { id: "no-role" as const, name: "No Role" },
  "dps": { id: "dps" as const, name: "DPS" },
  "tank": { id: "tank" as const, name: "Tank" },
  "healer": { id: "healer" as const, name: "Healer" },
  "support": { id: "support" as const, name: "Support" },
  "dps-aoe": { id: "dps-aoe" as const, name: "DPS + AOE" },
  "dps-execute": { id: "dps-execute" as const, name: "DPS + Execute" },
  "dps+healer": { id: "dps+healer" as const, name: "DPS + Healer" },
  "dps+support": { id: "dps+support" as const, name: "DPS + Support" },
  "dps+tank": { id: "dps+tank" as const, name: "DPS + Tank" },
  "healer+support": { id: "healer+support" as const, name: "Healer + Support" },
  "healer+tank": { id: "healer+tank" as const, name: "Healer + Tank" },
  "support+tank": { id: "support+tank" as const, name: "Support + Tank" },
  "dps+healer+support": { id: "dps+healer+support" as const, name: "DPS + Healer + Support" },
  "dps+healer+tank": { id: "dps+healer+tank" as const, name: "DPS + Healer + Tank" },
  "dps+support+tank": { id: "dps+support+tank" as const, name: "DPS + Support + Tank" },
  "healer+support+tank": { id: "healer+support+tank" as const, name: "Healer + Support + Tank" },
  "dps+healer+support+tank": {
    id: "dps+healer+support+tank" as const,
    name: "DPS + Healer + Support + Tank",
  },
} satisfies Record<string, CompanionRoleTemplate>

export const companionRoles = createDataFile<CompanionRoleTemplate>()(COMPANION_ROLE_DATA)

export type CompanionRoleId = (typeof companionRoles.ids)[number]
