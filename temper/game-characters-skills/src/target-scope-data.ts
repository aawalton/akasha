import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_TARGET_SCOPES } from "./generated/temper-target-scope.generated"

export interface TargetScopeTemplate {
  id: string
  name: string
}

export const targetScopes = createDataFile<TargetScopeTemplate>()(TEMPER_TARGET_SCOPES)
