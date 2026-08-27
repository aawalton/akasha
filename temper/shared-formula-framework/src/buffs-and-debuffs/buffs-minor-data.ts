import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source"
import { TEMPER_BUFF_MINOR_DATA } from "../generated/temper-buff-minor.generated"

export const buffsMinor = createDataFile<BuffOrDebuffTemplate>()(TEMPER_BUFF_MINOR_DATA)
