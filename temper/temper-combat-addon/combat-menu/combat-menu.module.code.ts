import { ADDON_VERSION } from "@akasha/temper-combat-addon/combat-constants"
import { updateEvents } from "@akasha/temper-combat-addon/combat-core-events"
import { buildMenuOptionsTail } from "@akasha/temper-combat-addon/combat-menu-tail"
import {
  getDb,
  type TemperCombatSettings,
} from "@akasha/temper-combat-addon/combat-saved-variables"
import { resizeReport } from "@akasha/temper-combat-addon/combat-ui-window"
import { registerPanel } from "@akasha/temper-settings-panel/register-panel"

function getRawAccountWideSettings(): Record<string, unknown> {
  const accountTable = globalThis.TemperCombat_Save?.Default?.[GetDisplayName()]?.["$AccountWide"]
  const settings = accountTable?.Settings
  if (settings == null) {
    error("TemperCombat account-wide settings table missing")
  }
  return settings
}

let settingsPanel: Control | undefined

export function makeMenu(svdefaults: TemperCombatSettings): undefined {
  const menu = LibAddonMenu2
  if (menu === undefined) {
    return undefined
  }

  const db = getDb()
  const def = svdefaults

  const panelData: LamPanelData = {
    type: "panel",
    name: "TemperCombat",
    displayName: "TemperCombat",
    version: ADDON_VERSION,
    registerForRefresh: true,
    registerForDefaults: true,
  }

  const options: LamControlData[] = [
    {
      type: "header",
      name: GetString(SI_TEMPER_COMBAT_MENU_PROFILES),
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_AC_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_AC_TOOLTIP),
      default: def.accountwide,
      getFunc: () => getRawAccountWideSettings()["accountwide"] === true,
      setFunc: (value) => {
        getRawAccountWideSettings()["accountwide"] = value
      },
      requiresReload: true,
    },
    {
      type: "custom",
    },
    {
      type: "header",
      name: GetString(SI_TEMPER_COMBAT_MENU_GS_NAME),
    },
    {
      type: "slider",
      name: GetString(SI_TEMPER_COMBAT_MENU_FH_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_FH_TOOLTIP),
      min: 1,
      max: 40,
      step: 1,
      default: def.fighthistory,
      getFunc: () => db.fighthistory,
      setFunc: (value) => {
        db.fighthistory = value
      },
    },
    {
      type: "slider",
      name: GetString(SI_TEMPER_COMBAT_MENU_MAXSAVEDFIGHTS_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_MAXSAVEDFIGHTS_TOOLTIP),
      warning: GetString(SI_TEMPER_COMBAT_MENU_MAXSAVEDFIGHTS_WARNING),
      min: 20,
      max: 250,
      step: 10,
      default: def.maxSavedFights,
      getFunc: () => db.maxSavedFights,
      setFunc: (value) => {
        db.maxSavedFights = value
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_BOSSFIGHTS_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_BOSSFIGHTS_TOOLTIP),
      default: def.keepbossfights,
      getFunc: () => db.keepbossfights,
      setFunc: (value) => {
        db.keepbossfights = value
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_MG_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_MG_TOOLTIP),
      default: def.recordgrp,
      getFunc: () => db.recordgrp,
      setFunc: (value) => {
        db.recordgrp = value
        updateEvents()
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_GL_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_GL_TOOLTIP),
      default: def.recordgrpinlarge,
      getFunc: () => db.recordgrpinlarge,
      setFunc: (value) => {
        db.recordgrpinlarge = value
      },
      disabled: !db.recordgrp,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_STACKS_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_STACKS_TOOLTIP),
      default: def.showstacks,
      getFunc: () => db.showstacks,
      setFunc: (value) => {
        db.showstacks = value
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_LM_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_LM_TOOLTIP),
      default: def.lightmode,
      getFunc: () => db.lightmode,
      setFunc: (value) => {
        db.lightmode = value
        updateEvents()
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_NOPVP_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_NOPVP_TOOLTIP),
      default: def.offincyrodil,
      getFunc: () => db.offincyrodil,
      setFunc: (value) => {
        db.offincyrodil = value
        updateEvents()
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_LMPVP_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_LMPVP_TOOLTIP),
      default: def.lightmodeincyrodil,
      getFunc: () => db.lightmodeincyrodil,
      setFunc: (value) => {
        db.lightmodeincyrodil = value
        updateEvents()
      },
      disabled: () => db.offincyrodil || db.lightmode,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_ASCC_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_ASCC_TOOLTIP),
      default: def.autoselectchatchannel,
      getFunc: () => db.autoselectchatchannel,
      setFunc: (value) => {
        db.autoselectchatchannel = value
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_AS_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_AS_TOOLTIP),
      default: def.autoscreenshot,
      getFunc: () => db.autoscreenshot,
      setFunc: (value) => {
        db.autoscreenshot = value
      },
    },
    {
      type: "slider",
      name: GetString(SI_TEMPER_COMBAT_MENU_ML_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_ML_TOOLTIP),
      min: 1,
      max: 120,
      step: 1,
      disabled: () => !db.autoscreenshot,
      default: def.autoscreenshotmintime,
      getFunc: () => db.autoscreenshotmintime,
      setFunc: (value) => {
        db.autoscreenshotmintime = value
      },
    },
    {
      type: "slider",
      name: GetString(SI_TEMPER_COMBAT_MENU_SF_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SF_TOOLTIP),
      min: 50,
      max: 300,
      step: 1,
      default: def.FightReport.scale * 100,
      getFunc: () => db.FightReport.scale * 100,
      setFunc: (value) => {
        db.FightReport.scale = value / 100
        resizeReport(value / 100)
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_DISPLAYNAMES_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_DISPLAYNAMES_TOOLTIP),
      default: def.FightReport.useDisplayNames,
      getFunc: () => db.FightReport.useDisplayNames,
      setFunc: (value) => {
        db.FightReport.useDisplayNames = value
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_SHOWPETS_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SHOWPETS_TOOLTIP),
      default: def.FightReport.showPets,
      getFunc: () => db.FightReport.showPets,
      setFunc: (value) => {
        db.FightReport.showPets = value
      },
    },
    {
      type: "custom",
    },
    ...buildMenuOptionsTail(db, def),
  ]

  settingsPanel = registerPanel(menu, "TemperCombat_Options", panelData, options)
  return undefined
}

export function openSettings(this: void): undefined {
  if (LibAddonMenu2 !== undefined && settingsPanel !== undefined) {
    LibAddonMenu2.OpenToPanel(settingsPanel)
  }
  return undefined
}
