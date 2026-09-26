import type { GrimoireId as GrimoirePageSlug } from "akasha/temper/catalog/skill/temper-grimoire/modules/grimoire-ids/grimoire-ids.data-table.code.ts"
import type {
  AffixScriptId,
  FocusScriptId,
  SignatureScriptId,
} from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import {
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export const grimoires = tableView(() => skillCatalog().grimoires)

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
