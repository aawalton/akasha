const FIELD = "                        "

const MEMBER = "                            "

const VALUE = "                                "

const SET_BONUSES = [
  { key: 4, numRequired: 5 },
  { key: 1, numRequired: 1 },
  { key: 2, numRequired: 2 },
  { key: 3, numRequired: 3 },
] as const

function setBonusLines(): readonly string[] {
  const lines: string[] = [`${FIELD}["setBonuses"] =`, `${FIELD}{`]
  for (const { key, numRequired } of SET_BONUSES) {
    lines.push(
      `${MEMBER}[${key}] =`,
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

function itemLines(id: number): readonly string[] {
  const fields: Record<string, string> = {
    name: `"Item ${id}"`,
    icon: '"/esoui/art/icons/an_icon.dds"',
    itemType: "2",
    specializedItemType: "300",
    equipType: "9",
    weaponType: "0",
    armorType: "2",
    weaponPower: "0",
    armorRating: "0",
    requiredLevel: "0",
    requiredCP: "160",
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
    setName: `"Set ${id}"`,
    setMaxEquip: "5",
    flavorText: '"Flavor."',
  }
  return [
    `                    [${id}] =`,
    "                    {",
    ...Object.entries(fields).map(([key, value]) => `${FIELD}["${key}"] = ${value},`),
    ...setBonusLines(),
    "                    },",
  ]
}

export const ITEM_IDS = [101, 102] as const

export const GOOD_ITEMS = [
  '                ["items"] =',
  "                {",
  ...ITEM_IDS.flatMap(itemLines),
  "                },",
].join("\n")

export const CLEARED_ITEMS = ['                ["items"] =', "                {},"].join("\n")
