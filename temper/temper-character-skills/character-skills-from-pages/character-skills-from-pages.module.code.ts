import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { SkillTemplate } from "../character-skill-template/character-skill-template.module.code.ts"
import { CHARACTER_SKILLS_00 } from "../character-skills-00/character-skills-00.module.code.ts"
import { CHARACTER_SKILLS_01 } from "../character-skills-01/character-skills-01.module.code.ts"
import { CHARACTER_SKILLS_02 } from "../character-skills-02/character-skills-02.module.code.ts"
import { CHARACTER_SKILLS_03 } from "../character-skills-03/character-skills-03.module.code.ts"
import { CHARACTER_SKILLS_04 } from "../character-skills-04/character-skills-04.module.code.ts"
import { CHARACTER_SKILLS_05 } from "../character-skills-05/character-skills-05.module.code.ts"
import { CHARACTER_SKILLS_06 } from "../character-skills-06/character-skills-06.module.code.ts"
import { CHARACTER_SKILLS_07 } from "../character-skills-07/character-skills-07.module.code.ts"
import { CHARACTER_SKILLS_08 } from "../character-skills-08/character-skills-08.module.code.ts"
import { CHARACTER_SKILLS_09 } from "../character-skills-09/character-skills-09.module.code.ts"
import { CHARACTER_SKILLS_10 } from "../character-skills-10/character-skills-10.module.code.ts"
import { CHARACTER_SKILLS_11 } from "../character-skills-11/character-skills-11.module.code.ts"
import { CHARACTER_SKILLS_12 } from "../character-skills-12/character-skills-12.module.code.ts"
import { CHARACTER_SKILLS_13 } from "../character-skills-13/character-skills-13.module.code.ts"
import { CHARACTER_SKILLS_14 } from "../character-skills-14/character-skills-14.module.code.ts"
import { CHARACTER_SKILLS_15 } from "../character-skills-15/character-skills-15.module.code.ts"
import { CHARACTER_SKILLS_16 } from "../character-skills-16/character-skills-16.module.code.ts"
import { CHARACTER_SKILLS_17 } from "../character-skills-17/character-skills-17.module.code.ts"
import { CHARACTER_SKILLS_18 } from "../character-skills-18/character-skills-18.module.code.ts"
import { CHARACTER_SKILLS_19 } from "../character-skills-19/character-skills-19.module.code.ts"
import { CHARACTER_SKILLS_20 } from "../character-skills-20/character-skills-20.module.code.ts"
import { CHARACTER_SKILLS_21 } from "../character-skills-21/character-skills-21.module.code.ts"
import { CHARACTER_SKILLS_22 } from "../character-skills-22/character-skills-22.module.code.ts"
import { CHARACTER_SKILLS_23 } from "../character-skills-23/character-skills-23.module.code.ts"
import { CHARACTER_SKILLS_24 } from "../character-skills-24/character-skills-24.module.code.ts"
import { CHARACTER_SKILLS_25 } from "../character-skills-25/character-skills-25.module.code.ts"
import { CHARACTER_SKILLS_26 } from "../character-skills-26/character-skills-26.module.code.ts"
import { CHARACTER_SKILLS_27 } from "../character-skills-27/character-skills-27.module.code.ts"
import { CHARACTER_SKILLS_28 } from "../character-skills-28/character-skills-28.module.code.ts"
import { CHARACTER_SKILLS_29 } from "../character-skills-29/character-skills-29.module.code.ts"
import { CHARACTER_SKILLS_30 } from "../character-skills-30/character-skills-30.module.code.ts"
import { CHARACTER_SKILLS_31 } from "../character-skills-31/character-skills-31.module.code.ts"
import { CHARACTER_SKILLS_32 } from "../character-skills-32/character-skills-32.module.code.ts"
import { CHARACTER_SKILLS_33 } from "../character-skills-33/character-skills-33.module.code.ts"
import { CHARACTER_SKILLS_34 } from "../character-skills-34/character-skills-34.module.code.ts"
import { CHARACTER_SKILLS_35 } from "../character-skills-35/character-skills-35.module.code.ts"
import { CHARACTER_SKILLS_36 } from "../character-skills-36/character-skills-36.module.code.ts"
import { CHARACTER_SKILLS_37 } from "../character-skills-37/character-skills-37.module.code.ts"
import { CHARACTER_SKILLS_38 } from "../character-skills-38/character-skills-38.module.code.ts"
import { CHARACTER_SKILLS_39 } from "../character-skills-39/character-skills-39.module.code.ts"
import { CHARACTER_SKILLS_40 } from "../character-skills-40/character-skills-40.module.code.ts"
import { CHARACTER_SKILLS_41 } from "../character-skills-41/character-skills-41.module.code.ts"
import { CHARACTER_SKILLS_42 } from "../character-skills-42/character-skills-42.module.code.ts"
import { CHARACTER_SKILLS_43 } from "../character-skills-43/character-skills-43.module.code.ts"
import { CHARACTER_SKILLS_44 } from "../character-skills-44/character-skills-44.module.code.ts"
import { CHARACTER_SKILLS_45 } from "../character-skills-45/character-skills-45.module.code.ts"
import { CHARACTER_SKILLS_46 } from "../character-skills-46/character-skills-46.module.code.ts"
import { CHARACTER_SKILLS_47 } from "../character-skills-47/character-skills-47.module.code.ts"
import { CHARACTER_SKILLS_48 } from "../character-skills-48/character-skills-48.module.code.ts"
import { CHARACTER_SKILLS_49 } from "../character-skills-49/character-skills-49.module.code.ts"
import { CHARACTER_SKILLS_50 } from "../character-skills-50/character-skills-50.module.code.ts"
import { CHARACTER_SKILLS_51 } from "../character-skills-51/character-skills-51.module.code.ts"
import { CHARACTER_SKILLS_52 } from "../character-skills-52/character-skills-52.module.code.ts"
import { CHARACTER_SKILLS_53 } from "../character-skills-53/character-skills-53.module.code.ts"
import { CHARACTER_SKILLS_54 } from "../character-skills-54/character-skills-54.module.code.ts"
import { CHARACTER_SKILLS_55 } from "../character-skills-55/character-skills-55.module.code.ts"
import { CHARACTER_SKILLS_56 } from "../character-skills-56/character-skills-56.module.code.ts"
import { CHARACTER_SKILLS_57 } from "../character-skills-57/character-skills-57.module.code.ts"
import { CHARACTER_SKILLS_58 } from "../character-skills-58/character-skills-58.module.code.ts"
import { CHARACTER_SKILLS_59 } from "../character-skills-59/character-skills-59.module.code.ts"
import { CHARACTER_SKILLS_60 } from "../character-skills-60/character-skills-60.module.code.ts"
import { CHARACTER_SKILLS_61 } from "../character-skills-61/character-skills-61.module.code.ts"
import { CHARACTER_SKILLS_62 } from "../character-skills-62/character-skills-62.module.code.ts"
import { CHARACTER_SKILLS_63 } from "../character-skills-63/character-skills-63.module.code.ts"
import { CHARACTER_SKILLS_64 } from "../character-skills-64/character-skills-64.module.code.ts"
import { CHARACTER_SKILLS_65 } from "../character-skills-65/character-skills-65.module.code.ts"
import { CHARACTER_SKILLS_66 } from "../character-skills-66/character-skills-66.module.code.ts"
import { CHARACTER_SKILLS_67 } from "../character-skills-67/character-skills-67.module.code.ts"
import { CHARACTER_SKILLS_68 } from "../character-skills-68/character-skills-68.module.code.ts"
import { CHARACTER_SKILLS_69 } from "../character-skills-69/character-skills-69.module.code.ts"
import { CHARACTER_SKILLS_70 } from "../character-skills-70/character-skills-70.module.code.ts"
import { CHARACTER_SKILLS_71 } from "../character-skills-71/character-skills-71.module.code.ts"
import { CHARACTER_SKILLS_72 } from "../character-skills-72/character-skills-72.module.code.ts"
import { CHARACTER_SKILLS_73 } from "../character-skills-73/character-skills-73.module.code.ts"
import { CHARACTER_SKILLS_74 } from "../character-skills-74/character-skills-74.module.code.ts"
import { CHARACTER_SKILLS_75 } from "../character-skills-75/character-skills-75.module.code.ts"
import { CHARACTER_SKILLS_76 } from "../character-skills-76/character-skills-76.module.code.ts"
import { CHARACTER_SKILLS_77 } from "../character-skills-77/character-skills-77.module.code.ts"
import { CHARACTER_SKILLS_78 } from "../character-skills-78/character-skills-78.module.code.ts"
import { CHARACTER_SKILLS_79 } from "../character-skills-79/character-skills-79.module.code.ts"
import { CHARACTER_SKILLS_80 } from "../character-skills-80/character-skills-80.module.code.ts"
import { CHARACTER_SKILLS_81 } from "../character-skills-81/character-skills-81.module.code.ts"
import { CHARACTER_SKILLS_82 } from "../character-skills-82/character-skills-82.module.code.ts"
import { CHARACTER_SKILLS_83 } from "../character-skills-83/character-skills-83.module.code.ts"
import { CHARACTER_SKILLS_84 } from "../character-skills-84/character-skills-84.module.code.ts"

const SKILLS_DATA = {
  ...CHARACTER_SKILLS_00,
  ...CHARACTER_SKILLS_01,
  ...CHARACTER_SKILLS_02,
  ...CHARACTER_SKILLS_03,
  ...CHARACTER_SKILLS_04,
  ...CHARACTER_SKILLS_05,
  ...CHARACTER_SKILLS_06,
  ...CHARACTER_SKILLS_07,
  ...CHARACTER_SKILLS_08,
  ...CHARACTER_SKILLS_09,
  ...CHARACTER_SKILLS_10,
  ...CHARACTER_SKILLS_11,
  ...CHARACTER_SKILLS_12,
  ...CHARACTER_SKILLS_13,
  ...CHARACTER_SKILLS_14,
  ...CHARACTER_SKILLS_15,
  ...CHARACTER_SKILLS_16,
  ...CHARACTER_SKILLS_17,
  ...CHARACTER_SKILLS_18,
  ...CHARACTER_SKILLS_19,
  ...CHARACTER_SKILLS_20,
  ...CHARACTER_SKILLS_21,
  ...CHARACTER_SKILLS_22,
  ...CHARACTER_SKILLS_23,
  ...CHARACTER_SKILLS_24,
  ...CHARACTER_SKILLS_25,
  ...CHARACTER_SKILLS_26,
  ...CHARACTER_SKILLS_27,
  ...CHARACTER_SKILLS_28,
  ...CHARACTER_SKILLS_29,
  ...CHARACTER_SKILLS_30,
  ...CHARACTER_SKILLS_31,
  ...CHARACTER_SKILLS_32,
  ...CHARACTER_SKILLS_33,
  ...CHARACTER_SKILLS_34,
  ...CHARACTER_SKILLS_35,
  ...CHARACTER_SKILLS_36,
  ...CHARACTER_SKILLS_37,
  ...CHARACTER_SKILLS_38,
  ...CHARACTER_SKILLS_39,
  ...CHARACTER_SKILLS_40,
  ...CHARACTER_SKILLS_41,
  ...CHARACTER_SKILLS_42,
  ...CHARACTER_SKILLS_43,
  ...CHARACTER_SKILLS_44,
  ...CHARACTER_SKILLS_45,
  ...CHARACTER_SKILLS_46,
  ...CHARACTER_SKILLS_47,
  ...CHARACTER_SKILLS_48,
  ...CHARACTER_SKILLS_49,
  ...CHARACTER_SKILLS_50,
  ...CHARACTER_SKILLS_51,
  ...CHARACTER_SKILLS_52,
  ...CHARACTER_SKILLS_53,
  ...CHARACTER_SKILLS_54,
  ...CHARACTER_SKILLS_55,
  ...CHARACTER_SKILLS_56,
  ...CHARACTER_SKILLS_57,
  ...CHARACTER_SKILLS_58,
  ...CHARACTER_SKILLS_59,
  ...CHARACTER_SKILLS_60,
  ...CHARACTER_SKILLS_61,
  ...CHARACTER_SKILLS_62,
  ...CHARACTER_SKILLS_63,
  ...CHARACTER_SKILLS_64,
  ...CHARACTER_SKILLS_65,
  ...CHARACTER_SKILLS_66,
  ...CHARACTER_SKILLS_67,
  ...CHARACTER_SKILLS_68,
  ...CHARACTER_SKILLS_69,
  ...CHARACTER_SKILLS_70,
  ...CHARACTER_SKILLS_71,
  ...CHARACTER_SKILLS_72,
  ...CHARACTER_SKILLS_73,
  ...CHARACTER_SKILLS_74,
  ...CHARACTER_SKILLS_75,
  ...CHARACTER_SKILLS_76,
  ...CHARACTER_SKILLS_77,
  ...CHARACTER_SKILLS_78,
  ...CHARACTER_SKILLS_79,
  ...CHARACTER_SKILLS_80,
  ...CHARACTER_SKILLS_81,
  ...CHARACTER_SKILLS_82,
  ...CHARACTER_SKILLS_83,
  ...CHARACTER_SKILLS_84,
} satisfies Record<string, SkillTemplate>

export const skillsFromPages: DataFile<string, SkillTemplate, SkillLineId | "scribed" | "none"> =
  createDataFile<SkillTemplate>()(SKILLS_DATA)
