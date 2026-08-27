import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_CURSES_BY_ID } from "./generated/temper-curse.generated"

export interface CurseTemplate {
  id: string
  name: string
  esoCurseIds: readonly number[]
}

export const curses = createDataFile<CurseTemplate>()(TEMPER_CURSES_BY_ID)

export type CurseState = (typeof curses.ids)[number]
