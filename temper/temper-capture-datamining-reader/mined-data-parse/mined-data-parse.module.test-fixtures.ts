const CRLF = "\r\n"

const FIELD = "                        "

const MEMBER = "                            "

const VALUE = "                                "

export interface ItemFixture {
  readonly id: number
  readonly key?: string
  readonly name?: string
  readonly requiredCP?: number
  readonly unknownField?: boolean
  readonly malformedSetBonus?: boolean
}

const SET_BONUSES = [
  { key: 4, numRequired: 5 },
  { key: 1, numRequired: 1 },
  { key: 2, numRequired: 2 },
  { key: 3, numRequired: 3 },
] as const

function setBonusLines(malformed: boolean): readonly string[] {
  const lines: string[] = [`${FIELD}["setBonuses"] = `, `${FIELD}{`]
  for (const [at, bonus] of SET_BONUSES.entries()) {
    const key = bonus.key
    const numRequired = malformed && at === 0 ? '"five"' : `${bonus.numRequired}`
    lines.push(
      `${MEMBER}[${key}] = `,
      `${MEMBER}{`,
      `${VALUE}["isPerfected"] = false,`,
      `${VALUE}["description"] = "Bonus ${key}",`,
      `${VALUE}["numRequired"] = ${numRequired},`,
      `${MEMBER}},`
    )
  }
  lines.push(`${FIELD}},`)
  return lines
}

function itemLines(item: ItemFixture): readonly string[] {
  const fields: Record<string, string> = {
    name: `"${item.name ?? `Item ${item.id}`}"`,
    icon: '"/esoui/art/icons/fabricated.dds"',
    itemType: "2",
    specializedItemType: "300",
    equipType: "9",
    weaponType: "0",
    armorType: "2",
    weaponPower: "0",
    armorRating: "0",
    requiredLevel: "0",
    requiredCP: `${item.requiredCP ?? 160}`,
    value: "1",
    quality: "3",
    style: "4",
    filterType: "2",
    filterTypeSpecific: "0",
    isUnique: "false",
    isUniqueEquipped: "false",
    enchantHeader: '"Adds Recovery"',
    enchantDescription: '"Adds 161 Recovery"',
    hasOnUseAbility: "false",
    abilityHeader: '""',
    abilityDescription: '""',
    abilityCooldown: "0",
    traitType: "12",
    traitDescription: '"Divines"',
    hasSet: "true",
    setId: "4901",
    setName: `"Set ${item.id}"`,
    setMaxEquip: "5",
    flavorText: '"Flavor."',
    ...(item.unknownField === true ? { mysteryStat: "7" } : {}),
  }
  return [
    `                    ${item.key ?? `[${item.id}]`} = `,
    "                    {",
    ...Object.entries(fields).map(([key, value]) => `${FIELD}["${key}"] = ${value},`),
    ...setBonusLines(item.malformedSetBonus === true),
    "                    },",
  ]
}

function questLines(id: number): readonly string[] {
  return [
    `                    [${id}] = `,
    "                    {",
    `${FIELD}["name"] = "Quest ${id}",`,
    `${FIELD}["questType"] = 0,`,
    `${FIELD}["repeatableType"] = 0,`,
    `${FIELD}["zoneId"] = 101,`,
    `${FIELD}["zoneName"] = "Auridon",`,
    "                    },",
  ]
}

function mapLines(key: string, entries: readonly (readonly string[])[]): readonly string[] {
  return [
    `                ["${key}"] = `,
    "                {",
    ...entries.flat(),
    "                },",
  ]
}

export function minedLua(
  items: readonly ItemFixture[] = [],
  questIds: readonly number[] = []
): string {
  const lines = [
    "TemperDataMining_SavedVariables =",
    "{",
    '    ["Default"] = ',
    "    {",
    '        ["@tester"] = ',
    "        {",
    '            ["$AccountWide"] = ',
    "            {",
    '                ["version"] = 1,',
    '                ["isRunning"] = false,',
    ...mapLines("quests", questIds.map(questLines)),
    ...mapLines("items", items.map(itemLines)),
    '                ["nextItemId"] = 900001,',
    "            },",
    "        },",
    "    },",
    "}",
  ]
  return `${lines.join(CRLF)}${CRLF}`
}
