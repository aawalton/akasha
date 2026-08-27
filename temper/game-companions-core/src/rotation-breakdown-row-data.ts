import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_ROTATION_BREAKDOWN_ROWS } from "./generated/temper-rotation-breakdown-row.generated"

export interface RotationBreakdownRowTemplate {
  id: string
  name: string
  fullName: string
  description: string
}

export const rotationBreakdownRows = createDataFile<RotationBreakdownRowTemplate>()(
  TEMPER_ROTATION_BREAKDOWN_ROWS
)

export type RotationBreakdownRowId = (typeof rotationBreakdownRows.ids)[number]
