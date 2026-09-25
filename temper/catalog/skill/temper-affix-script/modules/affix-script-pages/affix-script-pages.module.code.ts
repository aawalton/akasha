import { berserk } from "akasha/temper/catalog/skill/temper-affix-script/pages/berserk.temper-affix-script.ts"
import { breach } from "akasha/temper/catalog/skill/temper-affix-script/pages/breach.temper-affix-script.ts"
import { brittle } from "akasha/temper/catalog/skill/temper-affix-script/pages/brittle.temper-affix-script.ts"
import { brutalityAndSorcery } from "akasha/temper/catalog/skill/temper-affix-script/pages/brutality-and-sorcery.temper-affix-script.ts"
import { courage } from "akasha/temper/catalog/skill/temper-affix-script/pages/courage.temper-affix-script.ts"
import { cowardice } from "akasha/temper/catalog/skill/temper-affix-script/pages/cowardice.temper-affix-script.ts"
import { defile } from "akasha/temper/catalog/skill/temper-affix-script/pages/defile.temper-affix-script.ts"
import { empower } from "akasha/temper/catalog/skill/temper-affix-script/pages/empower.temper-affix-script.ts"
import { enervation } from "akasha/temper/catalog/skill/temper-affix-script/pages/enervation.temper-affix-script.ts"
import { evasion } from "akasha/temper/catalog/skill/temper-affix-script/pages/evasion.temper-affix-script.ts"
import { expedition } from "akasha/temper/catalog/skill/temper-affix-script/pages/expedition.temper-affix-script.ts"
import { force } from "akasha/temper/catalog/skill/temper-affix-script/pages/force.temper-affix-script.ts"
import { heroism } from "akasha/temper/catalog/skill/temper-affix-script/pages/heroism.temper-affix-script.ts"
import { intellectAndEndurance } from "akasha/temper/catalog/skill/temper-affix-script/pages/intellect-and-endurance.temper-affix-script.ts"
import { interrupt } from "akasha/temper/catalog/skill/temper-affix-script/pages/interrupt.temper-affix-script.ts"
import { lifesteal } from "akasha/temper/catalog/skill/temper-affix-script/pages/lifesteal.temper-affix-script.ts"
import { magickasteal } from "akasha/temper/catalog/skill/temper-affix-script/pages/magickasteal.temper-affix-script.ts"
import { maim } from "akasha/temper/catalog/skill/temper-affix-script/pages/maim.temper-affix-script.ts"
import { mangle } from "akasha/temper/catalog/skill/temper-affix-script/pages/mangle.temper-affix-script.ts"
import { noAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/pages/no-affix-script.temper-affix-script.ts"
import { offBalance } from "akasha/temper/catalog/skill/temper-affix-script/pages/off-balance.temper-affix-script.ts"
import { protection } from "akasha/temper/catalog/skill/temper-affix-script/pages/protection.temper-affix-script.ts"
import { resolve } from "akasha/temper/catalog/skill/temper-affix-script/pages/resolve.temper-affix-script.ts"
import { savageryAndProphecy } from "akasha/temper/catalog/skill/temper-affix-script/pages/savagery-and-prophecy.temper-affix-script.ts"
import { uncertainty } from "akasha/temper/catalog/skill/temper-affix-script/pages/uncertainty.temper-affix-script.ts"
import { vitality } from "akasha/temper/catalog/skill/temper-affix-script/pages/vitality.temper-affix-script.ts"
import { vulnerability } from "akasha/temper/catalog/skill/temper-affix-script/pages/vulnerability.temper-affix-script.ts"
import type { TemperAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/temper-affix-script.page-type.types.ts"
import type { AffixScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"

export const AFFIX_SCRIPT_PAGES: Readonly<Record<AffixScriptId, TemperAffixScript>> = {
  "no-affix-script": noAffixScript,
  "off-balance": offBalance,
  "interrupt": interrupt,
  "savagery-and-prophecy": savageryAndProphecy,
  "expedition": expedition,
  "resolve": resolve,
  "evasion": evasion,
  "vitality": vitality,
  "berserk": berserk,
  "brutality-and-sorcery": brutalityAndSorcery,
  "empower": empower,
  "protection": protection,
  "courage": courage,
  "heroism": heroism,
  "intellect-and-endurance": intellectAndEndurance,
  "force": force,
  "vulnerability": vulnerability,
  "maim": maim,
  "cowardice": cowardice,
  "enervation": enervation,
  "mangle": mangle,
  "breach": breach,
  "lifesteal": lifesteal,
  "defile": defile,
  "brittle": brittle,
  "uncertainty": uncertainty,
  "magickasteal": magickasteal,
}
