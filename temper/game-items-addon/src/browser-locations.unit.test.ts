import { describe, expect, it } from "bun:test"
import { ESO_BAG_BACKPACK, ESO_BAG_WORN } from "@temper/game-items-core/eso-bag-constants"
import type { ItemLocationEntry } from "@temper/game-items-core/item-centric-inventory"
import type { LocationTypeId } from "@temper/game-items-core/location-type-data"
import { matchLocationView, quantityInView } from "./browser-locations"
import type { FixedLocationViewId, LocationViewOption } from "./browser-types"

const CURRENT_CHAR = "1001"
const OTHER_CHAR = "1002"

function loc(
  locationType: LocationTypeId,
  overrides: { key?: string; bagId?: number; qty?: number } = {}
): ItemLocationEntry {
  return {
    locationKey: overrides.key ?? locationType,
    locationType,
    displayName: "",
    bagId: overrides.bagId ?? ESO_BAG_BACKPACK,
    slotIndex: 0,
    stackCount: overrides.qty ?? 1,
    lastScanned: 0,
  }
}

function fixed(fixedId: FixedLocationViewId): LocationViewOption {
  return { label: fixedId, kind: "fixed", fixedId }
}

function matchOne(option: LocationViewOption, entry: ItemLocationEntry): boolean {
  return matchLocationView([entry], option, CURRENT_CHAR)
}

const charBackpack = loc("character", { key: CURRENT_CHAR, bagId: ESO_BAG_BACKPACK })
const charWorn = loc("character", { key: CURRENT_CHAR, bagId: ESO_BAG_WORN })
const otherCharBackpack = loc("character", { key: OTHER_CHAR, bagId: ESO_BAG_BACKPACK })
const bankSlot = loc("bank", { key: "Bank" })
const guildSlot = loc("guild", { key: "My Guild" })
const companionSlot = loc("companion", { key: "Companion:Bastian" })
const craftbagSlot = loc("craftbag", { key: "CraftBag" })
const housingSlot = loc("housing-storage", { key: "HouseBank:1:2" })
const houseSlot = loc("house", { key: "House:42" })

describe("matchLocationView — all", () => {
  it("matches any location", () => {
    expect(matchOne(fixed("all"), charBackpack)).toBe(true)
    expect(matchOne(fixed("all"), guildSlot)).toBe(true)
    expect(matchOne(fixed("all"), craftbagSlot)).toBe(true)
  })

  it("does not match an item with zero locations", () => {
    expect(matchLocationView([], fixed("all"), CURRENT_CHAR)).toBe(false)
  })
})

describe("matchLocationView — allBanks", () => {
  it("matches player bank and guild bank", () => {
    expect(matchOne(fixed("allBanks"), bankSlot)).toBe(true)
    expect(matchOne(fixed("allBanks"), guildSlot)).toBe(true)
  })

  it("rejects a character backpack slot", () => {
    expect(matchOne(fixed("allBanks"), charBackpack)).toBe(false)
  })
})

describe("matchLocationView — allGuildBanks", () => {
  it("matches only the guild bank", () => {
    expect(matchOne(fixed("allGuildBanks"), guildSlot)).toBe(true)
    expect(matchOne(fixed("allGuildBanks"), bankSlot)).toBe(false)
  })
})

describe("matchLocationView — allCharacters", () => {
  it("matches character and companion slots", () => {
    expect(matchOne(fixed("allCharacters"), charBackpack)).toBe(true)
    expect(matchOne(fixed("allCharacters"), charWorn)).toBe(true)
    expect(matchOne(fixed("allCharacters"), companionSlot)).toBe(true)
  })

  it("rejects a bank slot", () => {
    expect(matchOne(fixed("allCharacters"), bankSlot)).toBe(false)
  })
})

describe("matchLocationView — allCompanions", () => {
  it("matches only companion slots", () => {
    expect(matchOne(fixed("allCompanions"), companionSlot)).toBe(true)
    expect(matchOne(fixed("allCompanions"), charWorn)).toBe(false)
  })
})

describe("matchLocationView — allEquipped", () => {
  it("matches character-worn and companion, not character backpack", () => {
    expect(matchOne(fixed("allEquipped"), charWorn)).toBe(true)
    expect(matchOne(fixed("allEquipped"), companionSlot)).toBe(true)
    expect(matchOne(fixed("allEquipped"), charBackpack)).toBe(false)
  })
})

describe("matchLocationView — allStorage", () => {
  it("matches character, bank, craftbag, companion, housing-storage", () => {
    expect(matchOne(fixed("allStorage"), charBackpack)).toBe(true)
    expect(matchOne(fixed("allStorage"), bankSlot)).toBe(true)
    expect(matchOne(fixed("allStorage"), craftbagSlot)).toBe(true)
    expect(matchOne(fixed("allStorage"), companionSlot)).toBe(true)
    expect(matchOne(fixed("allStorage"), housingSlot)).toBe(true)
  })

  it("rejects guild bank and standalone house", () => {
    expect(matchOne(fixed("allStorage"), guildSlot)).toBe(false)
    expect(matchOne(fixed("allStorage"), houseSlot)).toBe(false)
  })
})

describe("matchLocationView — everything", () => {
  it("matches allStorage plus houses", () => {
    expect(matchOne(fixed("everything"), charBackpack)).toBe(true)
    expect(matchOne(fixed("everything"), housingSlot)).toBe(true)
    expect(matchOne(fixed("everything"), houseSlot)).toBe(true)
  })
})

describe("matchLocationView — bankOnly", () => {
  it("matches the player bank, not guild bank or backpack", () => {
    expect(matchOne(fixed("bankOnly"), bankSlot)).toBe(true)
    expect(matchOne(fixed("bankOnly"), guildSlot)).toBe(false)
    expect(matchOne(fixed("bankOnly"), charBackpack)).toBe(false)
  })
})

describe("matchLocationView — bankAndCharacters", () => {
  it("matches bank, character, and companion", () => {
    expect(matchOne(fixed("bankAndCharacters"), bankSlot)).toBe(true)
    expect(matchOne(fixed("bankAndCharacters"), charBackpack)).toBe(true)
    expect(matchOne(fixed("bankAndCharacters"), charWorn)).toBe(true)
    expect(matchOne(fixed("bankAndCharacters"), companionSlot)).toBe(true)
  })

  it("rejects craft bag and guild bank", () => {
    expect(matchOne(fixed("bankAndCharacters"), craftbagSlot)).toBe(false)
    expect(matchOne(fixed("bankAndCharacters"), guildSlot)).toBe(false)
  })
})

describe("matchLocationView — craftBag", () => {
  it("matches only the craft bag", () => {
    expect(matchOne(fixed("craftBag"), craftbagSlot)).toBe(true)
    expect(matchOne(fixed("craftBag"), charBackpack)).toBe(false)
  })
})

describe("matchLocationView — housingStorage", () => {
  it("matches only housing storage", () => {
    expect(matchOne(fixed("housingStorage"), housingSlot)).toBe(true)
    expect(matchOne(fixed("housingStorage"), bankSlot)).toBe(false)
  })
})

describe("matchLocationView — allHouses", () => {
  it("matches house and housing-storage", () => {
    expect(matchOne(fixed("allHouses"), houseSlot)).toBe(true)
    expect(matchOne(fixed("allHouses"), housingSlot)).toBe(true)
    expect(matchOne(fixed("allHouses"), charBackpack)).toBe(false)
  })
})

describe("matchLocationView — bankCurrentCharacter", () => {
  it("matches the bank unconditionally", () => {
    expect(matchOne(fixed("bankCurrentCharacter"), bankSlot)).toBe(true)
  })

  it("matches a character slot only when it belongs to the current character", () => {
    expect(matchOne(fixed("bankCurrentCharacter"), charBackpack)).toBe(true)
    expect(matchOne(fixed("bankCurrentCharacter"), charWorn)).toBe(true)
    expect(matchOne(fixed("bankCurrentCharacter"), otherCharBackpack)).toBe(false)
  })
})

describe("matchLocationView — bankOtherCharacters", () => {
  it("matches the bank unconditionally", () => {
    expect(matchOne(fixed("bankOtherCharacters"), bankSlot)).toBe(true)
  })

  it("matches a character slot only when it belongs to a different character", () => {
    expect(matchOne(fixed("bankOtherCharacters"), otherCharBackpack)).toBe(true)
    expect(matchOne(fixed("bankOtherCharacters"), charBackpack)).toBe(false)
  })
})

describe("matchLocationView — ANY-location semantics", () => {
  it("matches when at least one of several slots satisfies the view", () => {
    expect(matchLocationView([charBackpack, bankSlot], fixed("bankOnly"), CURRENT_CHAR)).toBe(true)
  })

  it("rejects when no slot satisfies the view", () => {
    expect(matchLocationView([charBackpack, charWorn], fixed("bankOnly"), CURRENT_CHAR)).toBe(false)
  })
})

describe("matchLocationView — dynamic character view (by locationKey)", () => {
  const otherCharView: LocationViewOption = {
    label: "Char Two",
    kind: "character",
    locationKey: OTHER_CHAR,
  }

  it("matches an item that has a slot at the selected character", () => {
    expect(matchLocationView([otherCharBackpack], otherCharView, CURRENT_CHAR)).toBe(true)
  })

  it("rejects an item held only at other location keys", () => {
    expect(matchLocationView([charBackpack], otherCharView, CURRENT_CHAR)).toBe(false)
  })

  it("matches via ANY-slot when one of several slots is at the selected character", () => {
    expect(matchLocationView([charBackpack, otherCharBackpack], otherCharView, CURRENT_CHAR)).toBe(
      true
    )
  })
})

describe("matchLocationView — dynamic companion / guild / house views", () => {
  it("matches a companion view by locationKey", () => {
    const view: LocationViewOption = {
      label: "Bastian",
      kind: "companion",
      locationKey: "Companion:Bastian",
    }
    expect(matchLocationView([companionSlot], view, CURRENT_CHAR)).toBe(true)
    expect(matchLocationView([charBackpack], view, CURRENT_CHAR)).toBe(false)
  })

  it("matches a guild-bank view by locationKey", () => {
    const view: LocationViewOption = {
      label: "My Guild",
      kind: "guildBank",
      locationKey: "My Guild",
    }
    expect(matchLocationView([guildSlot], view, CURRENT_CHAR)).toBe(true)
    expect(matchLocationView([bankSlot], view, CURRENT_CHAR)).toBe(false)
  })

  it("matches a house-bank view by locationKey", () => {
    const view: LocationViewOption = {
      label: "Grand Psijic Villa",
      kind: "houseBank",
      locationKey: "HouseBank:1:2",
    }
    expect(matchLocationView([housingSlot], view, CURRENT_CHAR)).toBe(true)
    expect(matchLocationView([bankSlot], view, CURRENT_CHAR)).toBe(false)
  })
})

const ALL_FIXED_IDS: readonly FixedLocationViewId[] = [
  "all",
  "allBanks",
  "allGuildBanks",
  "allCharacters",
  "allCompanions",
  "allEquipped",
  "allStorage",
  "everything",
  "bankOnly",
  "bankAndCharacters",
  "bankCurrentCharacter",
  "bankOtherCharacters",
  "craftBag",
  "housingStorage",
  "allHouses",
]

describe("quantityInView", () => {
  const splitStock: readonly ItemLocationEntry[] = [
    loc("bank", { key: "Bank", qty: 1 }),
    loc("craftbag", { key: "CraftBag", qty: 199 }),
  ]

  it("counts only the bank stack under bankOnly", () => {
    expect(quantityInView(splitStock, fixed("bankOnly"), CURRENT_CHAR)).toBe(1)
  })

  it("counts only the craft-bag stack under craftBag", () => {
    expect(quantityInView(splitStock, fixed("craftBag"), CURRENT_CHAR)).toBe(199)
  })

  it("counts every stack under the default all view", () => {
    expect(quantityInView(splitStock, fixed("all"), CURRENT_CHAR)).toBe(200)
  })

  it("returns 0 when the view selects none of the item's slots", () => {
    expect(quantityInView(splitStock, fixed("allCharacters"), CURRENT_CHAR)).toBe(0)
  })

  it("excludes character stacks from a bank view", () => {
    const banked = [
      loc("bank", { key: "Bank", qty: 1 }),
      loc("character", { key: CURRENT_CHAR, bagId: ESO_BAG_BACKPACK, qty: 5 }),
    ]
    expect(quantityInView(banked, fixed("bankOnly"), CURRENT_CHAR)).toBe(1)
  })

  it("excludes worn and companion stacks from a bank view", () => {
    const banked = [
      loc("bank", { key: "Bank", qty: 2 }),
      loc("character", { key: CURRENT_CHAR, bagId: ESO_BAG_WORN, qty: 1 }),
      loc("companion", { key: "Companion:Bastian", qty: 1 }),
    ]
    expect(quantityInView(banked, fixed("bankOnly"), CURRENT_CHAR)).toBe(2)
  })

  it("returns 0 for an item held nowhere", () => {
    expect(quantityInView([], fixed("all"), CURRENT_CHAR)).toBe(0)
  })

  it("sums several matching slots at one location", () => {
    const stacks = [
      loc("character", { key: CURRENT_CHAR, bagId: ESO_BAG_BACKPACK, qty: 40 }),
      loc("character", { key: CURRENT_CHAR, bagId: ESO_BAG_BACKPACK, qty: 60 }),
    ]
    expect(quantityInView(stacks, fixed("allCharacters"), CURRENT_CHAR)).toBe(100)
  })

  it("splits worn from backpack the way the view does", () => {
    const stacks = [
      loc("character", { key: CURRENT_CHAR, bagId: ESO_BAG_WORN, qty: 1 }),
      loc("character", { key: CURRENT_CHAR, bagId: ESO_BAG_BACKPACK, qty: 5 }),
    ]
    expect(quantityInView(stacks, fixed("allEquipped"), CURRENT_CHAR)).toBe(1)
    expect(quantityInView(stacks, fixed("allCharacters"), CURRENT_CHAR)).toBe(6)
  })

  it("counts only the selected character under a dynamic character view", () => {
    const view: LocationViewOption = {
      label: "Char Two",
      kind: "character",
      locationKey: OTHER_CHAR,
    }
    const stacks = [
      loc("character", { key: CURRENT_CHAR, qty: 7 }),
      loc("character", { key: OTHER_CHAR, qty: 3 }),
    ]
    expect(quantityInView(stacks, view, CURRENT_CHAR)).toBe(3)
  })
})

describe("quantityInView agrees with matchLocationView", () => {
  const everywhere: readonly ItemLocationEntry[] = [
    charBackpack,
    charWorn,
    otherCharBackpack,
    bankSlot,
    guildSlot,
    companionSlot,
    craftbagSlot,
    housingSlot,
    houseSlot,
  ]

  it("admits a row iff the view counts at least one of its stacks", () => {
    for (const id of ALL_FIXED_IDS) {
      const view = fixed(id)
      const admitted = matchLocationView(everywhere, view, CURRENT_CHAR)
      expect(admitted).toBe(quantityInView(everywhere, view, CURRENT_CHAR) > 0)
    }
  })

  it("holds for an item in a single location too", () => {
    for (const id of ALL_FIXED_IDS) {
      const view = fixed(id)
      const admitted = matchLocationView([bankSlot], view, CURRENT_CHAR)
      expect(admitted).toBe(quantityInView([bankSlot], view, CURRENT_CHAR) > 0)
    }
  })
})
