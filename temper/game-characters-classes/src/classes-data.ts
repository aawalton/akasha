import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { ClassId } from "@temper/shared-formula-framework/class-id"
import { TEMPER_CLASSES } from "./generated/classes.generated"

export type { ClassId }

export interface ClassTemplate {
  id: ClassId
  name: string
  icon: string
  esoClassId: number
}

export const classes = createDataFile<ClassTemplate>()(TEMPER_CLASSES)
