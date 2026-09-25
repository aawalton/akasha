import "akasha/temper/player/progress/temper-rule-template/jsonl-text/jsonl-text.type-declaration.d.ts"
import { slugIn } from "akasha/change/modules/target-narrowing/target-narrowing.module.code.ts"
import { entryRowsIn } from "akasha/page/property-entry/modules/entry-rows/entry-rows.module.code.ts"
import bannerBearer from "akasha/temper/catalog/skill/temper-grimoire/pages/banner-bearer/banner-bearer.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import elementalExplosion from "akasha/temper/catalog/skill/temper-grimoire/pages/elemental-explosion/elemental-explosion.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import mendersBond from "akasha/temper/catalog/skill/temper-grimoire/pages/menders-bond/menders-bond.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import shieldThrow from "akasha/temper/catalog/skill/temper-grimoire/pages/shield-throw/shield-throw.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import smash from "akasha/temper/catalog/skill/temper-grimoire/pages/smash/smash.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import soulBurst from "akasha/temper/catalog/skill/temper-grimoire/pages/soul-burst/soul-burst.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import torchbearer from "akasha/temper/catalog/skill/temper-grimoire/pages/torchbearer/torchbearer.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import trample from "akasha/temper/catalog/skill/temper-grimoire/pages/trample/trample.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import travelingKnife from "akasha/temper/catalog/skill/temper-grimoire/pages/traveling-knife/traveling-knife.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import ulfsildsContingency from "akasha/temper/catalog/skill/temper-grimoire/pages/ulfsilds-contingency/ulfsilds-contingency.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import vault from "akasha/temper/catalog/skill/temper-grimoire/pages/vault/vault.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import wieldSoul from "akasha/temper/catalog/skill/temper-grimoire/pages/wield-soul/wield-soul.temper-grimoire.affix-scripts.jsonl" with {
  type: "text",
}
import type { AffixScriptsRow } from "akasha/temper/catalog/skill/temper-grimoire/properties/affix-scripts.page-property-entry.types.ts"
import { z } from "zod"

const AFFIX_SCRIPTS_ROW = z.object({
  id: z.string(),
  scriptId: z.string(),
  classId: z.string().optional(),
  description: z.string(),
  grantedBuffs: z.array(z.string()).optional(),
  appliedDebuffs: z.array(z.string()).optional(),
})

function rowsIn(text: string): readonly AffixScriptsRow[] {
  return entryRowsIn(text).map((line) => AFFIX_SCRIPTS_ROW.parse(JSON.parse(line)))
}

export const GRIMOIRE_AFFIX_ROWS = {
  "banner-bearer": rowsIn(bannerBearer),
  "elemental-explosion": rowsIn(elementalExplosion),
  "menders-bond": rowsIn(mendersBond),
  "shield-throw": rowsIn(shieldThrow),
  "smash": rowsIn(smash),
  "soul-burst": rowsIn(soulBurst),
  "torchbearer": rowsIn(torchbearer),
  "trample": rowsIn(trample),
  "traveling-knife": rowsIn(travelingKnife),
  "ulfsilds-contingency": rowsIn(ulfsildsContingency),
  "vault": rowsIn(vault),
  "wield-soul": rowsIn(wieldSoul),
} satisfies Readonly<Record<string, readonly AffixScriptsRow[]>>

export type GrimoireWithAffixRows = keyof typeof GRIMOIRE_AFFIX_ROWS

export function affixRowOf(
  grimoire: GrimoireWithAffixRows,
  affixScript: string
): AffixScriptsRow | undefined {
  return GRIMOIRE_AFFIX_ROWS[grimoire].find((row) => slugIn(row.scriptId) === affixScript)
}
