import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source"
import { TEMPER_BUFF_MAJOR_DATA } from "../generated/temper-buff-major.generated"

export const buffsMajor = createDataFile<BuffOrDebuffTemplate>()(TEMPER_BUFF_MAJOR_DATA)
