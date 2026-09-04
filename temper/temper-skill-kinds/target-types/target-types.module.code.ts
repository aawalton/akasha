import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface TargetTypeTemplate {
  id: string
  name: string
}

const TARGET_TYPE_DATA = {
  "self": { id: "self", name: "Self" },
  "enemy": { id: "enemy", name: "Enemy" },
  "ally": { id: "ally", name: "Ally" },
  "self-and-ally": { id: "self-and-ally", name: "Self + Ally" },
  "self-or-ally": { id: "self-or-ally", name: "Self / Ally" },
  "lowest-health-ally": { id: "lowest-health-ally", name: "Lowest Health Ally" },
  "ground": { id: "ground", name: "Ground" },
} as const satisfies Record<string, TargetTypeTemplate>

export const targetTypes = createDataFile<TargetTypeTemplate>()(TARGET_TYPE_DATA)
