import { FCOCO } from "./state"
import type { AddonVars, CompanionInfo } from "./types"

const addonVars: AddonVars = {
  addonVersion: 0.17,
  addonSavedVarsVersion: "0.04",
  addonSavedVarsVersionPerToon: "0.01",
  addonSavedVarsForAllTable: "SettingsForAll",
  addonSavedVarsNormalTable: "Settings",
  addonName: "FCOCompanion",
  addonNameMenu: "FCO Companion",
  addonNameMenuDisplay: "|c00FF00FCO |cFFFF00 Companion|r",
  addonSavedVariablesName: "FCOCompanion_Settings",
  addonSavedVariablesNamePerToon: "FCOCompanion_Settings_PerToon",
  settingsName: "FCO Companion",
  addonAuthor: "Baertram",
  addonWebsite: "https://www.esoui.com/downloads/info3044-FCOCompanion.html",
  addonFeedback: "https://www.esoui.com/portal.php?uid=2028",
  addonDonation: "https://www.esoui.com/portal.php?id=136&a=faq&faqid=131",
}
FCOCO.addonVars = addonVars

FCOCO.LAM = LibAddonMenu2

const companionInfo: CompanionInfo = {}
for (let i = 1; i <= 30; i += 1) {
  const companionCollectibleId = GetCompanionCollectibleId(i)
  if (typeof companionCollectibleId === "number" && companionCollectibleId > 0) {
    companionInfo[i] = companionCollectibleId
  }
}
FCOCO.companionInfo = companionInfo

let isCompanionUnlocked = false
for (let i = 1; i <= 30; i += 1) {
  const companionCollectibleId = companionInfo[i]
  if (companionCollectibleId !== undefined && IsCollectibleUnlocked(companionCollectibleId)) {
    isCompanionUnlocked = true
    break
  }
}
FCOCO.isCompanionUnlocked = isCompanionUnlocked

if (!isCompanionUnlocked) {
  d(GetString(FCOCO_NO_COMPANION_UNLOCKED_YET))
}
