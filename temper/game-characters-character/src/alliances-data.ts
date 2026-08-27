import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_ALLIANCE_DATA } from "./generated/temper-alliance.generated"

export interface Alliance {
  id: string
  name: string
  esoAllianceId: number
}

export const alliances = createDataFile<Alliance>()(TEMPER_ALLIANCE_DATA)

export type AllianceId = (typeof alliances.ids)[number]
