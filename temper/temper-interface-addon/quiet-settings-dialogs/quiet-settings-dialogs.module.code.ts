import { dropdown } from "@akasha/temper-settings-panel/dropdown"
import { DEFAULTS } from "../quiet-defaults/quiet-defaults.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { header } from "../quiet-settings-header/quiet-settings-header.module.code.ts"
import { STRINGS } from "../quiet-strings/quiet-strings.module.code.ts"
import { noUniversalStones } from "../quiet-world/quiet-world.module.code.ts"

export function buildDialogSections(this: void): LamControlData[] {
  const savedVars = getSavedVariables()
  return [
    header(GetString(SI_GAMEPAD_MAIN_MENU_CROWN_STORE_CATEGORY)),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_MARKET_ADS,
      tooltip: STRINGS.NOTYOU_MARKET_ADS_TOOLTIP,
      getFunc: () => savedVars.marketAnnouncement,
      setFunc: (value) => {
        savedVars.marketAnnouncement = value
      },
      default: DEFAULTS.marketAnnouncement,
      disabled: () => SCENE_MANAGER.scenes.marketAnnouncement === undefined,
    },
    header(STRINGS.NOTYOU_MAIL_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_MAIL,
      tooltip: STRINGS.NOTYOU_MAIL_TOOLTIP,
      getFunc: () => savedVars.emptyMail,
      setFunc: (value) => {
        savedVars.emptyMail = value
      },
      default: DEFAULTS.emptyMail,
    },
    header(STRINGS.NOTYOU_FENCE_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_FENCE,
      tooltip: STRINGS.NOTYOU_FENCE_TOOLTIP,
      getFunc: () => savedVars.fenceDialog,
      setFunc: (value) => {
        savedVars.fenceDialog = value
      },
      default: DEFAULTS.fenceDialog,
    },
    header(STRINGS.NOTYOU_GROUPS_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_GROUPS_DISBAND,
      tooltip: STRINGS.NOTYOU_GROUPS_DISBAND_TOOLTIP,
      getFunc: () => savedVars.disbandDialog,
      setFunc: (value) => {
        savedVars.disbandDialog = value
      },
      default: DEFAULTS.disbandDialog,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_GROUPS_LARGE,
      tooltip: STRINGS.NOTYOU_GROUPS_LARGE_TOOLTIP,
      getFunc: () => savedVars.largeGroupDialog,
      setFunc: (value) => {
        savedVars.largeGroupDialog = value
      },
      default: DEFAULTS.largeGroupDialog,
    },
    dropdown({
      name: STRINGS.NOTYOU_NOPORTONLEADER,
      tooltip: STRINGS.NOTYOU_NOPORTONLEADER_TOOLTIP,
      choices: STRINGS.NOPORTONLEADER_OPTION,
      get: () => savedVars.noPortOnLeader,
      set: (index) => {
        savedVars.noPortOnLeader = index
      },
      defaultIndex: DEFAULTS.noPortOnLeader,
    }),
    header(STRINGS.NOTYOU_CRAFT_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_CRAFT,
      tooltip: STRINGS.NOTYOU_CRAFT_TOOLTIP,
      getFunc: () => savedVars.improveDialog,
      setFunc: (value) => {
        savedVars.improveDialog = value
      },
      default: DEFAULTS.improveDialog,
    },
    header(STRINGS.NOTYOU_CHAMELEON_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_CHAMELEON,
      tooltip: STRINGS.NOTYOU_CHAMELEON_TOOLTIP,
      getFunc: () => savedVars.noUniversalStones,
      setFunc: (value) => {
        savedVars.noUniversalStones = value
        noUniversalStones()
      },
      default: DEFAULTS.noUniversalStones,
    },
    header(STRINGS.NOTYOU_RETICLE_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_RETICLE_TAKE,
      tooltip: STRINGS.NOTYOU_RETICLE_TAKE_TOOLTIP,
      getFunc: () => savedVars.reticleTake,
      setFunc: (value) => {
        savedVars.reticleTake = value
      },
      default: DEFAULTS.reticleTake,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_EMPTY_INTERACT,
      tooltip: STRINGS.NOTYOU_EMPTY_INTERACT_TOOLTIP,
      getFunc: () => savedVars.emptyInteractions,
      setFunc: (value) => {
        savedVars.emptyInteractions = value
      },
      default: DEFAULTS.emptyInteractions,
    },
    header(STRINGS.NOTYOU_GUILDS_HEADER),
    dropdown({
      name: STRINGS.NOTYOU_GUILDS,
      tooltip: STRINGS.NOTYOU_GUILDS_TOOLTIP,
      choices: STRINGS.GUILD_INV_OPTION,
      get: () => savedVars.guildInvites,
      set: (index) => {
        savedVars.guildInvites = index
      },
      defaultIndex: DEFAULTS.guildInvites,
    }),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_GUILDSAPP,
      tooltip: STRINGS.NOTYOU_GUILDSAPP_TOOLTIP,
      getFunc: () => savedVars.guildApps,
      setFunc: (value) => {
        savedVars.guildApps = value
      },
      default: DEFAULTS.guildApps,
    },
  ]
}
