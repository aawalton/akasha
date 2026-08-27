const CRLF = "\r\n"

interface SetBonus {
  readonly numRequired: number
  readonly description: string
}

export interface MinedItemFixture {
  readonly key: string
  readonly name: string
  readonly setName: string
  readonly requiredCP: number
  readonly unknownField?: boolean
  readonly malformedSetBonus?: boolean
}

export interface MinedQuestFixture {
  readonly key: string
  readonly name: string
  readonly zoneName: string
  readonly zoneId: number
}

const SET_BONUS_KEY_ORDER = [4, 1, 2, 3] as const

const SET_BONUSES: Record<number, SetBonus> = {
  1: { numRequired: 1, description: "Fabricated one-piece bonus" },
  2: { numRequired: 2, description: "Fabricated two-piece bonus" },
  3: { numRequired: 3, description: "Fabricated three-piece bonus" },
  4: { numRequired: 5, description: "Fabricated five-piece bonus" },
}

function luaString(value: string): string {
  return `"${value}"`
}

function scalar(indent: string, key: string, value: string): string {
  return `${indent}["${key}"] = ${value},`
}

function open(indent: string, key: string): readonly string[] {
  return [`${indent}["${key}"] = `, `${indent}{`]
}

function openRaw(indent: string, rawKey: string): readonly string[] {
  return [`${indent}${rawKey} = `, `${indent}{`]
}

function setBonusLines(fixture: MinedItemFixture): readonly string[] {
  const lines: string[] = [...open("                        ", "setBonuses")]
  for (const [position, key] of SET_BONUS_KEY_ORDER.entries()) {
    const bonus = SET_BONUSES[key]
    if (bonus === undefined) continue
    const broken = fixture.malformedSetBonus === true && position === 0
    lines.push(...openRaw("                            ", `[${key}]`))
    lines.push(scalar("                                ", "isPerfected", "false"))
    lines.push(
      scalar("                                ", "description", luaString(bonus.description))
    )
    lines.push(
      scalar(
        "                                ",
        "numRequired",
        broken ? luaString("five") : `${bonus.numRequired}`
      )
    )
    lines.push("                            },")
  }
  lines.push("                        },")
  return lines
}

function itemLines(fixture: MinedItemFixture): readonly string[] {
  const f = "                        "
  const lines: string[] = [...openRaw("                    ", fixture.key)]
  lines.push(scalar(f, "style", "4"))
  lines.push(scalar(f, "itemType", "2"))
  lines.push(scalar(f, "abilityHeader", luaString("")))
  lines.push(scalar(f, "icon", luaString("/esoui/art/icons/fabricated.dds")))
  lines.push(scalar(f, "setName", luaString(fixture.setName)))
  lines.push(scalar(f, "quality", "3"))
  lines.push(scalar(f, "traitType", "12"))
  lines.push(scalar(f, "equipType", "9"))
  lines.push(scalar(f, "isUniqueEquipped", "false"))
  lines.push(scalar(f, "flavorText", luaString("Fabricated flavor text.")))
  lines.push(scalar(f, "hasOnUseAbility", "false"))
  lines.push(scalar(f, "abilityCooldown", "0"))
  lines.push(scalar(f, "weaponPower", "0"))
  lines.push(scalar(f, "requiredCP", `${fixture.requiredCP}`))
  lines.push(scalar(f, "enchantHeader", luaString("Adds Fabricated Recovery")))
  lines.push(scalar(f, "setId", "4901"))
  lines.push(scalar(f, "armorRating", "0"))
  lines.push(scalar(f, "setMaxEquip", "5"))
  lines.push(scalar(f, "name", luaString(fixture.name)))
  lines.push(scalar(f, "filterType", "2"))
  lines.push(scalar(f, "traitDescription", luaString("Fabricated Trait")))
  lines.push(scalar(f, "weaponType", "0"))
  lines.push(scalar(f, "hasSet", "true"))
  lines.push(scalar(f, "abilityDescription", luaString("")))
  lines.push(scalar(f, "armorType", "2"))
  lines.push(scalar(f, "filterTypeSpecific", "0"))
  lines.push(scalar(f, "value", "1"))
  lines.push(scalar(f, "requiredLevel", "0"))
  lines.push(scalar(f, "enchantDescription", luaString("Adds 161 Fabricated Recovery")))
  lines.push(scalar(f, "isUnique", "false"))
  lines.push(scalar(f, "specializedItemType", "300"))
  if (fixture.unknownField === true) lines.push(scalar(f, "mysteryStat", "7"))
  lines.push(...setBonusLines(fixture))
  lines.push("                    },")
  return lines
}

function questLines(fixture: MinedQuestFixture): readonly string[] {
  const f = "                        "
  return [
    ...openRaw("                    ", fixture.key),
    scalar(f, "name", luaString(fixture.name)),
    scalar(f, "repeatableType", "0"),
    scalar(f, "questType", "0"),
    scalar(f, "zoneName", luaString(fixture.zoneName)),
    scalar(f, "zoneId", `${fixture.zoneId}`),
    "                    },",
  ]
}

function mapLines(key: string, entries: readonly (readonly string[])[]): readonly string[] {
  return [...open("                ", key), ...entries.flat(), "                },"]
}

export interface MinedDataMiningFixture {
  readonly items?: readonly MinedItemFixture[]
  readonly quests?: readonly MinedQuestFixture[]
}

export function minedDataMiningLua(fixture: MinedDataMiningFixture): string {
  const lines: string[] = [
    "TemperDataMining_SavedVariables =",
    "{",
    ...open("    ", "Default"),
    ...open("        ", "@Fabricated"),
    ...open("            ", "$AccountWide"),
    '                ["version"] = 1,',
    '                ["isRunning"] = false,',
    ...mapLines("quests", (fixture.quests ?? []).map(questLines)),
    '                ["consecutiveMisses"] = 100000,',
    ...mapLines("items", (fixture.items ?? []).map(itemLines)),
    '                ["nextItemId"] = 900001,',
    "            },",
    "        },",
    "    },",
    "}",
  ]
  return `${lines.join(CRLF)}${CRLF}`
}

export function readableItem(
  id: number,
  overrides: Partial<MinedItemFixture> = {}
): MinedItemFixture {
  return {
    key: `[${id}]`,
    name: `Fabricated Item ${id}`,
    setName: `Fabricated Set ${id}`,
    requiredCP: 160,
    ...overrides,
  }
}

export function readableQuest(
  id: number,
  overrides: Partial<MinedQuestFixture> = {}
): MinedQuestFixture {
  return {
    key: `[${id}]`,
    name: `Fabricated Quest ${id}`,
    zoneName: `Fabricated Zone ${id}`,
    zoneId: 101,
    ...overrides,
  }
}
