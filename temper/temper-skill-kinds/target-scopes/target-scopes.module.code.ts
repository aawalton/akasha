import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface TargetScopeTemplate {
  id: string
  name: string
}

const TARGET_SCOPE_DATA = {
  "single": { id: "single", name: "Single" },
  "cone": { id: "cone", name: "Cone" },
  "area": { id: "area", name: "Area" },
  "line": { id: "line", name: "Line" },
} as const satisfies Record<string, TargetScopeTemplate>

export const targetScopes = createDataFile<TargetScopeTemplate>()(TARGET_SCOPE_DATA)
