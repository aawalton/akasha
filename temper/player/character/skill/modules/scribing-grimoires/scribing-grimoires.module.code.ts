import { createDataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { GrimoireId as GrimoirePageSlug } from "akasha/temper/catalog/skill/temper-grimoire/modules/grimoire-ids/grimoire-ids.data-table.code.ts"
import type {
  AffixScriptId,
  FocusScriptId,
  SignatureScriptId,
} from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import type { GrimoireTemplate } from "akasha/temper/player/character/skill/modules/grimoire-template/grimoire-template.module.code.ts"
import { SCRIBING_GRIMOIRES_00 } from "akasha/temper/player/character/skill/modules/scribing-grimoires-00/scribing-grimoires-00.module.code.ts"
import { SCRIBING_GRIMOIRES_01 } from "akasha/temper/player/character/skill/modules/scribing-grimoires-01/scribing-grimoires-01.module.code.ts"
import { SCRIBING_GRIMOIRES_02 } from "akasha/temper/player/character/skill/modules/scribing-grimoires-02/scribing-grimoires-02.module.code.ts"
import { SCRIBING_GRIMOIRES_03 } from "akasha/temper/player/character/skill/modules/scribing-grimoires-03/scribing-grimoires-03.module.code.ts"

const GRIMOIRES_DATA = {
  ...SCRIBING_GRIMOIRES_00,
  ...SCRIBING_GRIMOIRES_01,
  ...SCRIBING_GRIMOIRES_02,
  ...SCRIBING_GRIMOIRES_03,
} satisfies Record<string, GrimoireTemplate>

export const grimoires = createDataFile<GrimoireTemplate>()(GRIMOIRES_DATA)

export type GrimoireId = GrimoirePageSlug

export function getGrimoireCompatibleScripts(grimoireId: GrimoireId): {
  focus: readonly FocusScriptId[]
  signature: readonly SignatureScriptId[]
  affix: readonly AffixScriptId[]
} {
  const grimoire = grimoires.data[grimoireId]
  return {
    focus: grimoire.compatibleFocusScripts,
    signature: grimoire.compatibleSignatureScripts,
    affix: grimoire.compatibleAffixScripts,
  }
}
