import type { TemperCurse } from "../temper-curse.page-type.ts"

export const werewolf = {
  id: "01a05fc5-c92d-7adc-ad4b-ae6284705bc9",
  pageTypeSlug: "temper-curse",
  slug: "werewolf",
  title: "Werewolf",
  key: "werewolf",
  displayOrder: 2,
  esoCurseIds: [35658, 32455],
} as const satisfies TemperCurse
