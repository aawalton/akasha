import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"

interface LamApi {
  OpenToPanel: (this: LamApi, panel: unknown) => void
}

function asLamApi(value: unknown): LamApi {
  return value as LamApi
}

INTERNAL.SettingsRankingsGetList = function (this: void, server: string): string {
  const characters = PUBLIC.GetCharacterList(server)
  let result: string

  if (characters.length === 0) {
    result = GetString(SI_ANTIQUITY_EMPTY_LIST)
  } else {
    const results: string[] = []
    for (const [, character] of ipairs(characters)) {
      results.push(character.name)
    }
    result = table.concat(results, ", ")
  }

  return string.format("|cC5C29E%s|r", result)
}

type UsersMap = Record<string, string[] | undefined>

INTERNAL.SettingsBuildMainSection = function (this: void): unknown[] {
  const verbose = ZO_IsConsoleOrGameCoreUI()
  const options: Record<string, { values: number[]; labels: string[] }> = {
    tracking: { values: [], labels: [] },
    scrib_res: { values: [], labels: [] },
    enabled: { values: [], labels: [] },
    enabledND: { values: [], labels: [] },
  }
  const optionsND: Record<string, { values: number[]; labels: string[] }> = {
    tracking: { values: [], labels: [] },
    scrib_res: { values: [], labels: [] },
  }

  {
    const [values, labels, valuesND, labelsND] = INTERNAL.SettingsBuildOptionsList(
      1,
      4,
      function (this: void, idx: number): string {
        return GetString("SI_LCK_SETTINGS_TRACKING", idx)
      }
    )
    asOptionSet(options["tracking"]).values = values
    asOptionSet(options["tracking"]).labels = labels
    asOptionSet(optionsND["tracking"]).values = valuesND
    asOptionSet(optionsND["tracking"]).labels = labelsND
  }

  {
    const [values, labels, valuesND, labelsND] = INTERNAL.SettingsBuildOptionsList(
      1,
      2,
      function (this: void, idx: number): string {
        return GetString(idx === 1 ? SI_NO : SI_YES)
      }
    )
    asOptionSet(options["scrib_res"]).values = values
    asOptionSet(options["scrib_res"]).labels = labels
    asOptionSet(optionsND["scrib_res"]).values = valuesND
    asOptionSet(optionsND["scrib_res"]).labels = labelsND
  }

  {
    const [values, labels, valuesND, labelsND] = INTERNAL.SettingsBuildOptionsList(
      1,
      2,
      function (this: void, idx: number): string {
        return GetString(idx === 1 ? SI_YES : SI_NO)
      }
    )
    asOptionSet(options["enabled"]).values = values
    asOptionSet(options["enabled"]).labels = labels
    asOptionSet(options["enabledND"]).values = valuesND
    asOptionSet(options["enabledND"]).labels = labelsND
  }

  const controls: unknown[] = [
    {
      type: "header",
      name: SI_LCK_SETTINGS_MAIN_SECTION,
    },
    {
      type: "submenu",
      name: SI_OPTIONS_DEFAULTS,
      controls: [
        {
          type: "description",
          text: SI_LCK_SETTINGS_SYSTEM_DEFAULTS,
        },
        ...INTERNAL.SettingsBuildControlCluster(optionsND),
      ],
    },
  ]

  for (const [, server] of ipairs(PUBLIC.GetServerList())) {
    const users: UsersMap = {}
    const accounts: string[] = []

    for (const [id, data] of pairs(asCharacterMap(INTERNAL.characters[server]))) {
      if (users[data.account] === undefined) {
        users[data.account] = []
      }
      asCharIdList(users[data.account]).push(id)
    }

    for (const [account] of pairs(users)) {
      accounts.push(account)
    }
    table.sort(accounts)

    const controlsAccts: unknown[] = [
      {
        type: "description",
        text: function (this: void): string {
          return INTERNAL.SettingsRankingsGetList(server)
        },
        title: SI_LCK_SETTINGS_RANKING_PREVIEW,
      },
      {
        type: "submenu",
        name: verbose
          ? string.format("%s > %s", server, GetString(SI_OPTIONS_DEFAULTS))
          : SI_OPTIONS_DEFAULTS,
        controls: [
          {
            type: "description",
            text: SI_LCK_SETTINGS_SERVER_DEFAULTS,
          },
          ...INTERNAL.SettingsBuildControlCluster(options, server),
        ],
      },
    ]

    for (const [, account] of ipairs(accounts)) {
      const controlsChars: unknown[] = [
        {
          type: "submenu",
          name: verbose
            ? string.format("%s > %s > %s", server, account, GetString(SI_OPTIONS_DEFAULTS))
            : SI_OPTIONS_DEFAULTS,
          controls: [
            {
              type: "description",
              text: SI_LCK_SETTINGS_ACCOUNT_DEFAULTS,
            },
            ...INTERNAL.SettingsBuildControlCluster(options, server, account),
          ],
        },
      ]

      INTERNAL.Sort(server, asCharIdList(users[account]))
      for (const [, id] of ipairs(asCharIdList(users[account]))) {
        const charName = asCharacterEntry(asCharacterMap(INTERNAL.characters[server])[id]).name
        controlsChars.push({
          type: "submenu",
          name: verbose ? string.format("%s > %s > %s", server, account, charName) : charName,
          controls: INTERNAL.SettingsBuildControlCluster(options, server, undefined, id),
        })
      }

      controlsAccts.push({
        type: "submenu",
        name: verbose ? string.format("%s > %s", server, account) : account,
        controls: controlsChars,
      })
    }

    controls.push({
      type: "submenu",
      name: server,
      controls: controlsAccts,
    })
  }

  return controls
}

PUBLIC.OpenSettingsPanel = function (this: void): undefined {
  if (INTERNAL.settingsPanel !== undefined) {
    asLamApi(LibAddonMenu2).OpenToPanel(INTERNAL.settingsPanel)
  }
}

type CharacterMap = Record<string, { account: string; name: string }>
function asCharacterMap(value: unknown): CharacterMap {
  return value as CharacterMap
}

type CharIdList = string[]
function asCharIdList(value: unknown): CharIdList {
  return value as CharIdList
}

type OptionSet = { values: number[]; labels: string[] }
function asOptionSet(value: unknown): OptionSet {
  return value as OptionSet
}

type CharacterEntry = { account: string; name: string }
function asCharacterEntry(value: unknown): CharacterEntry {
  return value as CharacterEntry
}
