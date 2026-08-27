import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { VAMPIRE_STAGE_DATA } from "./generated/temper-vampire-stage.generated"

export interface VampireStage {
  id: string
  name: string
  stage: number
  esoVampireStageId: number
  description: string
}

export const vampireStages = createDataFile<VampireStage>()(VAMPIRE_STAGE_DATA)

export type VampireStageId = (typeof vampireStages.ids)[number]
