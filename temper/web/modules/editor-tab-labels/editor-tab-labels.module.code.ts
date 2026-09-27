import { editorTabLabelsChampion } from "akasha/temper/web/phrase/pages/editor-tab-labels-champion.temper-web-phrase.ts"
import { editorTabLabelsCharacter } from "akasha/temper/web/phrase/pages/editor-tab-labels-character.temper-web-phrase.ts"
import { editorTabLabelsEquipment } from "akasha/temper/web/phrase/pages/editor-tab-labels-equipment.temper-web-phrase.ts"
import { editorTabLabelsGeneral } from "akasha/temper/web/phrase/pages/editor-tab-labels-general.temper-web-phrase.ts"
import { editorTabLabelsSkills } from "akasha/temper/web/phrase/pages/editor-tab-labels-skills.temper-web-phrase.ts"
import { editorTabLabelsStats } from "akasha/temper/web/phrase/pages/editor-tab-labels-stats.temper-web-phrase.ts"

export const EDITOR_TAB_LABEL_PHRASES: Readonly<Record<string, string>> = {
  general: editorTabLabelsGeneral.slug,
  character: editorTabLabelsCharacter.slug,
  equipment: editorTabLabelsEquipment.slug,
  skills: editorTabLabelsSkills.slug,
  champion: editorTabLabelsChampion.slug,
  stats: editorTabLabelsStats.slug,
}
