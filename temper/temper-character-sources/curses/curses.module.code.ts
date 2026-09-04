import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CurseTemplate {
  id: string
  name: string
  esoCurseIds: readonly number[]
}

const CURSE_DATA = {
  "no-curse": { id: "no-curse" as const, name: "No Curse", esoCurseIds: [] },
  "vampire": { id: "vampire" as const, name: "Vampire", esoCurseIds: [40359] },
  "werewolf": { id: "werewolf" as const, name: "Werewolf", esoCurseIds: [35658, 32455] },
} satisfies Record<string, CurseTemplate>

export const curses = createDataFile<CurseTemplate>()(CURSE_DATA)

export type CurseState = (typeof curses.ids)[number]
