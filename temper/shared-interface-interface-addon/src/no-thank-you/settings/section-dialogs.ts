import { dropdown } from "@temper/shared-interface-lam/dropdown"
import { defaults } from "../defaults"
import { noUniversalStones } from "../hooks/world"
import { getSavedVariables } from "../saved-variables"
import { strings } from "../strings"
import { header } from "./lam-helpers"

export function buildDialogSections(this: void): LamControlData[] {
  const SV = getSavedVariables()
  return [
    header(GetString(SI_GAMEPAD_MAIN_MENU_CROWN_STORE_CATEGORY)),
    {
      type: "checkbox",
      name: strings.NOTYOU_MARKET_ADS,
      tooltip: strings.NOTYOU_MARKET_ADS_TOOLTIP,
      getFunc: () => SV.marketAnnouncement,
      setFunc: (value) => {
        SV.marketAnnouncement = value
      },
      default: defaults.marketAnnouncement,
      disabled: () => SCENE_MANAGER.scenes.marketAnnouncement === undefined,
    },
    header(strings.NOTYOU_MAIL_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_MAIL,
      tooltip: strings.NOTYOU_MAIL_TOOLTIP,
      getFunc: () => SV.emptyMail,
      setFunc: (value) => {
        SV.emptyMail = value
      },
      default: defaults.emptyMail,
    },
    header(strings.NOTYOU_FENCE_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_FENCE,
      tooltip: strings.NOTYOU_FENCE_TOOLTIP,
      getFunc: () => SV.fenceDialog,
      setFunc: (value) => {
        SV.fenceDialog = value
      },
      default: defaults.fenceDialog,
    },
    header(strings.NOTYOU_GROUPS_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_GROUPS_DISBAND,
      tooltip: strings.NOTYOU_GROUPS_DISBAND_TOOLTIP,
      getFunc: () => SV.disbandDialog,
      setFunc: (value) => {
        SV.disbandDialog = value
      },
      default: defaults.disbandDialog,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_GROUPS_LARGE,
      tooltip: strings.NOTYOU_GROUPS_LARGE_TOOLTIP,
      getFunc: () => SV.largeGroupDialog,
      setFunc: (value) => {
        SV.largeGroupDialog = value
      },
      default: defaults.largeGroupDialog,
    },
    dropdown({
      name: strings.NOTYOU_NOPORTONLEADER,
      tooltip: strings.NOTYOU_NOPORTONLEADER_TOOLTIP,
      choices: strings.NOPORTONLEADER_OPTION,
      get: () => SV.noPortOnLeader,
      set: (index) => {
        SV.noPortOnLeader = index
      },
      defaultIndex: defaults.noPortOnLeader,
    }),
    header(strings.NOTYOU_CRAFT_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_CRAFT,
      tooltip: strings.NOTYOU_CRAFT_TOOLTIP,
      getFunc: () => SV.improveDialog,
      setFunc: (value) => {
        SV.improveDialog = value
      },
      default: defaults.improveDialog,
    },
    header(strings.NOTYOU_CHAMELEON_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_CHAMELEON,
      tooltip: strings.NOTYOU_CHAMELEON_TOOLTIP,
      getFunc: () => SV.noUniversalStones,
      setFunc: (value) => {
        SV.noUniversalStones = value
        noUniversalStones()
      },
      default: defaults.noUniversalStones,
    },
    header(strings.NOTYOU_RETICLE_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_RETICLE_TAKE,
      tooltip: strings.NOTYOU_RETICLE_TAKE_TOOLTIP,
      getFunc: () => SV.reticleTake,
      setFunc: (value) => {
        SV.reticleTake = value
      },
      default: defaults.reticleTake,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_EMPTY_INTERACT,
      tooltip: strings.NOTYOU_EMPTY_INTERACT_TOOLTIP,
      getFunc: () => SV.emptyInteractions,
      setFunc: (value) => {
        SV.emptyInteractions = value
      },
      default: defaults.emptyInteractions,
    },
    header(strings.NOTYOU_GUILDS_HEADER),
    dropdown({
      name: strings.NOTYOU_GUILDS,
      tooltip: strings.NOTYOU_GUILDS_TOOLTIP,
      choices: strings.GUILD_INV_OPTION,
      get: () => SV.guildInvites,
      set: (index) => {
        SV.guildInvites = index
      },
      defaultIndex: defaults.guildInvites,
    }),
    {
      type: "checkbox",
      name: strings.NOTYOU_GUILDSAPP,
      tooltip: strings.NOTYOU_GUILDSAPP_TOOLTIP,
      getFunc: () => SV.guildApps,
      setFunc: (value) => {
        SV.guildApps = value
      },
      default: defaults.guildApps,
    },
  ]
}
