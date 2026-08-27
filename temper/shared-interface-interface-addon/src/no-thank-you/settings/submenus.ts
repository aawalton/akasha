import { dropdown } from "@temper/shared-interface-lam/dropdown"
import { defaults } from "../defaults"
import { handleLuaErrorEvent } from "../hooks/notifications/lua-errors"
import { noGuildLeave } from "../hooks/world"
import { getSavedVariables } from "../saved-variables"
import { strings } from "../strings"
import { header } from "./lam-helpers"

function questDivider(this: void): LamTextureData {
  return {
    type: "texture",
    image: "EsoUI/Art/Quest/questJournal_divider.dds",
    imageWidth: 510,
    imageHeight: 4,
  }
}

export function buildGuildSubmenus(this: void): LamControlData[] {
  const SV = getSavedVariables()

  const guildAlertsControls: LamControlData[] = [
    dropdown({
      name: strings.NOTYOU_GROSTER,
      tooltip: strings.NOTYOU_GROSTER_TOOLTIP,
      choices: strings.GALERTS_OPTION,
      get: () => SV.guildAlerts,
      set: (index) => {
        SV.guildAlerts = index
      },
      defaultIndex: defaults.guildAlerts,
    }),
    questDivider(),
  ]

  const raidScoreControls: LamControlData[] = [
    dropdown({
      name: strings.NOTYOU_RAIDSCORE_ONLYFOR,
      tooltip: strings.NOTYOU_RAIDSCORE_ONLYFOR_TOOLTIP,
      choices: strings.RAID_OPTION,
      get: () => SV.raid,
      set: (index) => {
        SV.raid = index
      },
      defaultIndex: defaults.raid,
    }),
    {
      type: "checkbox",
      name: strings.NOTYOU_RAIDSCORE_ENDLESS,
      getFunc: () => SV.endless,
      setFunc: (value) => {
        SV.endless = value
      },
      default: defaults.endless,
      disabled: () => SV.raid === 1,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_RAIDSCORE_REDIRECT,
      getFunc: () => SV.raidToChat,
      setFunc: (value) => {
        SV.raidToChat = value
      },
      default: defaults.raidToChat,
      disabled: () => SV.raid === 1,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_RAIDSCORE_SOUND,
      tooltip: strings.NOTYOU_RAIDSCORE_SOUND_TOOLTIP,
      getFunc: () => SV.notificationSound,
      setFunc: (value) => {
        SV.notificationSound = value
      },
      default: defaults.notificationSound,
    },
  ]

  const motdControls: LamControlData[] = [
    dropdown({
      name: strings.NOTYOU_MOTD_BLOCK,
      tooltip: strings.NOTYOU_MOTD_BLOCK_TOOLTIP,
      choices: strings.MOTD_OPTION,
      get: () => SV.motd,
      set: (index) => {
        SV.motd = index
      },
      defaultIndex: defaults.motd,
    }),
    questDivider(),
  ]

  const guildLeaveControls: LamControlData[] = [
    dropdown({
      name: strings.NOTYOU_GUILDLEAVE_BLOCK,
      tooltip: strings.NOTYOU_GUILDLEAVE_BLOCK_TOOLTIP,
      choices: strings.GUILDLEAVE_OPTION,
      get: () => SV.noGuildLeave,
      set: (index) => {
        SV.noGuildLeave = index
        noGuildLeave()
      },
      defaultIndex: defaults.noGuildLeave,
    }),
    questDivider(),
  ]

  for (let i = 1; i <= MAX_GUILDS; i++) {
    const guildIndex = i
    const gname = GetGuildName(GetGuildId(guildIndex))
    const name = gname !== "" ? gname : `Guild ${guildIndex}`

    guildAlertsControls.push({
      type: "checkbox",
      name,
      getFunc: () => SV.guildAlertsGuilds[guildIndex] === true,
      setFunc: (value) => {
        SV.guildAlertsGuilds[guildIndex] = value
        noGuildLeave()
      },
      default: defaults.guildAlertsGuilds[guildIndex] ?? false,
      disabled: () => SV.guildAlerts === 0,
    })

    motdControls.push({
      type: "checkbox",
      name,
      getFunc: () => SV.motdGuilds[guildIndex] === true,
      setFunc: (value) => {
        SV.motdGuilds[guildIndex] = value
        NOTIFICATIONS.RefreshNotificationList()
      },
      default: defaults.motdGuilds[guildIndex] ?? false,
      disabled: () => SV.motd === 0,
    })

    guildLeaveControls.push({
      type: "checkbox",
      name,
      getFunc: () => SV.guildLeave[guildIndex] === true,
      setFunc: (value) => {
        SV.guildLeave[guildIndex] = value
      },
      default: defaults.guildLeave[guildIndex] ?? false,
      disabled: () => SV.noGuildLeave !== 2,
    })
  }

  const submenuGuildAlerts: LamSubmenuData = {
    type: "submenu",
    name: ZO_HIGHLIGHT_TEXT.Colorize(strings.NOTYOU_GROSTER_HEADER),
    tooltip: strings.NOTYOU_GROSTER_HEADER_TOOLTIP,
    controls: guildAlertsControls,
  }
  const submenuRaidScore: LamSubmenuData = {
    type: "submenu",
    name: ZO_HIGHLIGHT_TEXT.Colorize(strings.NOTYOU_RAIDSCORE_HEADER),
    tooltip: strings.NOTYOU_RAIDSCORE_HEADER_TOOLTIP,
    controls: raidScoreControls,
  }
  const submenuGuildMotD: LamSubmenuData = {
    type: "submenu",
    name: ZO_HIGHLIGHT_TEXT.Colorize(strings.NOTYOU_MOTD_HEADER),
    tooltip: strings.NOTYOU_MOTD_HEADER_TOOLTIP,
    controls: motdControls,
  }
  const submenuGuildLeave: LamSubmenuData = {
    type: "submenu",
    name: ZO_HIGHLIGHT_TEXT.Colorize(strings.NOTYOU_GUILDLEAVE_HEADER),
    tooltip: strings.NOTYOU_GUILDLEAVE_HEADER_TOOLTIP,
    controls: guildLeaveControls,
  }

  return [
    submenuGuildAlerts,
    submenuRaidScore,
    submenuGuildMotD,
    submenuGuildLeave,
    header(strings.NOTYOU_LUA_HEADER),
    dropdown({
      name: strings.NOTYOU_LUA_ERROR,
      tooltip: strings.NOTYOU_LUA_ERROR_TOOLTIP,
      choices: strings.LUAERR_OPTION,
      get: () => SV.luaError,
      set: (index) => {
        SV.luaError = index
        handleLuaErrorEvent()
      },
      defaultIndex: defaults.luaError,
    }),
    {
      type: "divider",
      width: "full",
      height: 70,
      alpha: 0.25,
    },
  ]
}
