export interface NoThankYouSettings {
  ava: number
  friends: boolean
  boss: boolean
  screenshot: boolean
  enlightened: boolean
  craftingResults: boolean
  repair: boolean
  alertTextExpiryDelay: number
  emptyMail: boolean
  guildAlerts: number
  guildAlertsGuilds: Record<number, boolean>
  raid: number
  raidToChat: boolean
  raidGuilds: Record<number, boolean>
  endless: boolean
  notificationSound: boolean
  motd: number
  motdGuilds: Record<number, boolean>
  nonstopHarvest: boolean
  noCameraSpin: boolean
  noCameraSpinStats: boolean
  noCameraSpinInv: boolean
  fenceDialog: boolean
  ultimateSound: number
  disbandDialog: boolean
  largeGroupDialog: boolean
  marketAnnouncement: boolean
  crownCrate: boolean
  improveDialog: boolean
  guildInvites: number
  luaError: number
  dontReadBooks: boolean
  noUniversalStones: boolean
  noGuildLeave: number
  guildLeave: Record<number, boolean>
  craftBag: boolean
  groupZone: number
  dontShowLoreDiscoveries: number
  dontShowSkillProgression: number
  noReportOnItems: boolean
  hideTamrielWayhsrines: number
  hideTamrielDungeons: number
  unownedHouses: number
  ownedHouses: number
  hideTamriel: boolean
  dontAcceptWritQuest: boolean
  disableChatAutoComplete: boolean
  chatForTradingHouse: boolean
  noBindAlert: boolean
  noPortOnLeader: number
  emptyInteractions: boolean
  guildApps: boolean
  reticleTake: boolean
}

export const DEFAULTS: NoThankYouSettings = {
  ava: 1,
  friends: false,
  boss: false,
  screenshot: false,
  enlightened: false,
  craftingResults: false,
  repair: false,
  alertTextExpiryDelay: 3,
  emptyMail: true,
  guildAlerts: 0,
  guildAlertsGuilds: {},
  raid: 0,
  raidToChat: true,
  raidGuilds: {},
  endless: true,
  notificationSound: false,
  motd: 0,
  motdGuilds: {},
  nonstopHarvest: false,
  noCameraSpin: false,
  noCameraSpinStats: false,
  noCameraSpinInv: false,
  fenceDialog: false,
  ultimateSound: 0,
  disbandDialog: false,
  largeGroupDialog: false,
  marketAnnouncement: false,
  crownCrate: false,
  improveDialog: false,
  guildInvites: 0,
  luaError: 1,
  dontReadBooks: false,
  noUniversalStones: false,
  noGuildLeave: 0,
  guildLeave: {},
  craftBag: false,
  groupZone: 1,
  dontShowLoreDiscoveries: 0,
  dontShowSkillProgression: 0,
  noReportOnItems: false,
  hideTamrielWayhsrines: 0,
  hideTamrielDungeons: 0,
  unownedHouses: 0,
  ownedHouses: 0,
  hideTamriel: false,
  dontAcceptWritQuest: false,
  disableChatAutoComplete: false,
  chatForTradingHouse: false,
  noBindAlert: false,
  noPortOnLeader: 0,
  emptyInteractions: false,
  guildApps: false,
  reticleTake: false,
}

export function fillGuildDefaults(this: void): undefined {
  for (let i = 1; i <= MAX_GUILDS; i++) {
    DEFAULTS.guildAlertsGuilds[i] = true
    DEFAULTS.raidGuilds[i] = true
    DEFAULTS.motdGuilds[i] = true
  }
}
