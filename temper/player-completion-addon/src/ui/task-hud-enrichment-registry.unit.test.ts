import { describe, expect, it } from "bun:test"
import type { ActiveAntiquityLead } from "../antiquity-lead-checks"
import type { TaskData } from "../saved-variables"

type GlobalsWithEsoStubs = typeof globalThis & {
  ZO_CreateStringId: (id: string, value: string) => undefined
  LuaSet: typeof Set
}

Object.assign(globalThis, {
  ZO_CreateStringId: (_id: string, _value: string): undefined => undefined,
  LuaSet: Set,
} satisfies Pick<GlobalsWithEsoStubs, "ZO_CreateStringId" | "LuaSet">)

const {
  antiquityLeadSpecs,
  dailyWritsSpecs,
  dungeonSetSpecs,
  ENRICHMENT_SELECTORS,
  flatSpecs,
  groupLabelSpecs,
  inventoryVenueSpecs,
  motifSpecs,
  scribingSpecs,
  skillMorphSpecs,
} = await import("./task-hud-enrichment-registry")

const { aggregateAntiquitySessionProgress, buildAntiquityLeadEnrichment } = await import(
  "./task-hud-enrichment"
)

function lead(antiquityId: number, name: string): ActiveAntiquityLead {
  return { antiquityId, name, quality: 1, loreRemaining: 1 }
}

describe("dailyWritsSpecs", () => {
  it("maps each displayed profession state to its semantic color and drops turned-in professions", () => {
    expect(
      dailyWritsSpecs([
        { label: "Blacksmithing", state: "notPickedUp" },
        { label: "Clothier", state: "pickedUp" },
        { label: "Enchanting", state: "crafted" },
        { label: "Alchemy", state: "completed" },
      ])
    ).toEqual([
      { text: "Blacksmithing", color: "default" },
      { text: "Clothier", color: "yellow" },
      { text: "Enchanting", color: "green" },
    ])
  })
})

describe("daily-writs selector", () => {
  it("matches the daily-writs card and nothing else", () => {
    const selector = ENRICHMENT_SELECTORS.find((s) => s.key === "dailyWrits")
    expect(selector).toBeDefined()
    const writTask: TaskData = {
      title: "Daily Writs",
      scope: "character",
      sortOrder: 0,
      completionCardId: "daily-writs",
    }
    const otherTask: TaskData = {
      title: "Cadwell's Almanac",
      scope: "account",
      sortOrder: 0,
      completionCardId: "cadwells-almanac",
    }
    expect(selector?.matches(writTask)).toBe(true)
    expect(selector?.matches(otherTask)).toBe(false)
  })
})

describe("groupLabelSpecs", () => {
  it("emits a level-1 header then leaves one level deeper (indent 2)", () => {
    expect(groupLabelSpecs("Auridon", ["Vulkhel Guard", "Skywatch"])).toEqual([
      { text: "Auridon", color: "default" },
      { text: "Vulkhel Guard", color: "default", indent: 2 },
      { text: "Skywatch", color: "default", indent: 2 },
    ])
  })

  it("emits a lone header when there are no leaves", () => {
    expect(groupLabelSpecs("Glenumbra Lore", [])).toEqual([
      { text: "Glenumbra Lore", color: "default" },
    ])
  })

  it("models the single-leaf companion-quest shape", () => {
    expect(groupLabelSpecs("Bastian", ["The Fateweaver Key"])).toEqual([
      { text: "Bastian", color: "default" },
      { text: "The Fateweaver Key", color: "default", indent: 2 },
    ])
  })

  it("appends a `(current/total)` suffix to the header when progress is given", () => {
    expect(groupLabelSpecs("Auridon", ["Mathiisen", "Skywatch"], { current: 2, total: 5 })).toEqual(
      [
        { text: "Auridon (2/5)", color: "default" },
        { text: "Mathiisen", color: "default", indent: 2 },
        { text: "Skywatch", color: "default", indent: 2 },
      ]
    )
  })

  it("leaves the header bare when progress is omitted (leaves still nest at indent 2)", () => {
    expect(groupLabelSpecs("Bastian", ["The Fateweaver Key"], undefined)).toEqual([
      { text: "Bastian", color: "default" },
      { text: "The Fateweaver Key", color: "default", indent: 2 },
    ])
  })
})

describe("flatSpecs", () => {
  it("maps plain strings to default-color rows with no indentation", () => {
    expect(flatSpecs(["Delve Daily", "Dragon Hunt Daily"])).toEqual([
      { text: "Delve Daily", color: "default" },
      { text: "Dragon Hunt Daily", color: "default" },
    ])
  })

  it("returns an empty list for no entries", () => {
    expect(flatSpecs([])).toEqual([])
  })
})

describe("motifSpecs", () => {
  it("formats `${name} (${source}) (${known}/${total})` as default-color rows", () => {
    expect(
      motifSpecs([
        {
          name: "Dwemer",
          known: 7,
          total: 10,
          sourceDescription: "Gold Road Incursion Daily (Gold Road)",
        },
      ])
    ).toEqual([
      {
        text: "Dwemer (Gold Road Incursion Daily (Gold Road)) (7/10)",
        color: "default",
      },
    ])
  })
})

describe("scribingSpecs (three-tier fallback ladder)", () => {
  const primary = [{ achievementName: "Apex Scriber", current: 3, total: 5 }]
  const motif = [
    { activityLabel: "Gold Road Incursion Daily", name: "Apocrypha", known: 4, total: 10 },
  ]

  it("tier 1: renders primary achievements in default color when present", () => {
    expect(scribingSpecs(primary, motif, "Mages Guild Daily")).toEqual([
      { text: "Apex Scriber (3/5)", color: "default" },
    ])
  })

  it("tier 2: falls back to motif sources in purple when no primary", () => {
    expect(scribingSpecs([], motif, "Mages Guild Daily")).toEqual([
      { text: "Gold Road Incursion Daily (Apocrypha 4/10)", color: "purple" },
    ])
  })

  it("tier 3: falls back to the guild daily string in default color", () => {
    expect(scribingSpecs([], [], "Mages Guild Daily")).toEqual([
      { text: "Mages Guild Daily", color: "default" },
    ])
  })
})

describe("skillMorphSpecs (per-row semantic color)", () => {
  it("maps line conflict → purple (outranks equipped)", () => {
    expect(
      skillMorphSpecs([{ skillName: "Crystal Fragments", isLineConflict: true, isEquipped: true }])
    ).toEqual([{ text: "Crystal Fragments", color: "purple" }])
  })

  it("maps equipped (no conflict) → green", () => {
    expect(
      skillMorphSpecs([{ skillName: "Force Pulse", isLineConflict: false, isEquipped: true }])
    ).toEqual([{ text: "Force Pulse", color: "green" }])
  })

  it("maps unequipped (no conflict) → yellow", () => {
    expect(
      skillMorphSpecs([
        { skillName: "Elemental Blockade", isLineConflict: false, isEquipped: false },
      ])
    ).toEqual([{ text: "Elemental Blockade", color: "yellow" }])
  })
})

describe("inventoryVenueSpecs", () => {
  it("maps each venue to a flush default-color leaf with an em-dash count suffix", () => {
    expect(
      inventoryVenueSpecs([
        { label: "Bank", count: 12 },
        { label: "Craft Bag", count: 3 },
      ])
    ).toEqual([
      { text: "Bank — 12 items", color: "default" },
      { text: "Craft Bag — 3 items", color: "default" },
    ])
  })

  it("returns an empty list for no venues", () => {
    expect(inventoryVenueSpecs([])).toEqual([])
  })
})

describe("dungeonSetSpecs", () => {
  it("emits a zone-name group header then a leaf per incomplete set", () => {
    expect(
      dungeonSetSpecs("Fungal Grotto", [
        { name: "Spider Cultist Cowl", slotsUnlocked: 2, totalSlots: 5 },
        { name: "Sentinel of Rkugamz", slotsUnlocked: 0, totalSlots: 3 },
      ])
    ).toEqual([
      { text: "Fungal Grotto", color: "default" },
      { text: "2/5 Spider Cultist Cowl", color: "default", indent: 2 },
      { text: "0/3 Sentinel of Rkugamz", color: "default", indent: 2 },
    ])
  })
})

describe("antiquityLeadSpecs", () => {
  it("renders each dig-zone group as a `(completed/total)` header with nested lead leaves", () => {
    expect(
      antiquityLeadSpecs({
        groups: [
          {
            digZone: "Summerset",
            completedThisSession: 1,
            totalAtSessionStart: 3,
            leadNames: ["Ancestral High Elf Belt", "Sea Elf Jewelry"],
          },
          {
            digZone: "Stonefalls",
            completedThisSession: 0,
            totalAtSessionStart: 1,
            leadNames: ["Dwarven Puzzle Box"],
          },
        ],
        ungrouped: [],
      })
    ).toEqual([
      { text: "Summerset (1/3)", color: "default" },
      { text: "Ancestral High Elf Belt", color: "default", indent: 2 },
      { text: "Sea Elf Jewelry", color: "default", indent: 2 },
      { text: "Stonefalls (0/1)", color: "default" },
      { text: "Dwarven Puzzle Box", color: "default", indent: 2 },
    ])
  })

  it("renders unresolved-zone leads as flat bare-name rows after the groups", () => {
    expect(antiquityLeadSpecs({ groups: [], ungrouped: ["Mysterious Lead"] })).toEqual([
      { text: "Mysterious Lead", color: "default" },
    ])
  })
})

describe("buildAntiquityLeadEnrichment", () => {
  const ZONE: Record<number, string | undefined> = {
    1: "Summerset",
    2: "Summerset",
    3: "Summerset",
    4: "Stonefalls",
    5: undefined,
  }
  const resolve = (id: number): string | undefined => ZONE[id]

  it("groups by dig zone, sorts leaf names, and counts completed-this-session vs total-at-start", () => {
    const baseline = [lead(1, "A"), lead(2, "C"), lead(3, "B"), lead(4, "Dwarven Puzzle Box")]
    const current = [lead(3, "B"), lead(2, "C"), lead(4, "Dwarven Puzzle Box")]
    expect(buildAntiquityLeadEnrichment(current, baseline, resolve)).toEqual({
      groups: [
        {
          digZone: "Summerset",
          completedThisSession: 1,
          totalAtSessionStart: 3,
          leadNames: ["B", "C"],
        },
        {
          digZone: "Stonefalls",
          completedThisSession: 0,
          totalAtSessionStart: 1,
          leadNames: ["Dwarven Puzzle Box"],
        },
      ],
      ungrouped: [],
    })
  })

  it("routes leads with no resolvable dig zone to ungrouped", () => {
    expect(
      buildAntiquityLeadEnrichment([lead(5, "Mystery")], [lead(5, "Mystery")], resolve)
    ).toEqual({ groups: [], ungrouped: ["Mystery"] })
  })

  it("falls back to the current count for a zone that first appeared mid-session", () => {
    expect(buildAntiquityLeadEnrichment([lead(1, "A"), lead(2, "B")], [], resolve)).toEqual({
      groups: [
        {
          digZone: "Summerset",
          completedThisSession: 0,
          totalAtSessionStart: 2,
          leadNames: ["A", "B"],
        },
      ],
      ungrouped: [],
    })
  })
})

describe("aggregateAntiquitySessionProgress", () => {
  it("returns undefined when there were no leads at session start", () => {
    expect(aggregateAntiquitySessionProgress([lead(1, "A")], [])).toBeUndefined()
  })

  it("counts baseline leads no longer active as completed this session", () => {
    const baseline = [lead(1, "A"), lead(2, "B"), lead(3, "C")]
    expect(aggregateAntiquitySessionProgress([lead(2, "B"), lead(3, "C")], baseline)).toEqual({
      current: 1,
      total: 3,
    })
  })

  it("reads 0/total at session start when nothing is done yet", () => {
    const baseline = [lead(1, "A"), lead(2, "B")]
    expect(aggregateAntiquitySessionProgress(baseline, baseline)).toEqual({ current: 0, total: 2 })
  })

  it("reads total/total once every session-start lead is completed", () => {
    expect(aggregateAntiquitySessionProgress([], [lead(1, "A"), lead(2, "B")])).toEqual({
      current: 2,
      total: 2,
    })
  })
})

describe("ENRICHMENT_SELECTORS registry", () => {
  it("registers all fifteen families, each with matches + select", () => {
    expect(ENRICHMENT_SELECTORS).toHaveLength(15)
    for (const selector of ENRICHMENT_SELECTORS) {
      expect(typeof selector.matches).toBe("function")
      expect(typeof selector.select).toBe("function")
    }
  })

  it("matches the Cadwell family on its card id and nothing else", () => {
    const cadwell = ENRICHMENT_SELECTORS.find((s) => s.key === "cadwell")
    expect(cadwell).toBeDefined()
    const cadwellTask: TaskData = {
      title: "Cadwell's Almanac",
      scope: "account",
      sortOrder: 0,
      completionCardId: "cadwells-almanac",
    }
    const otherTask: TaskData = {
      title: "Something else",
      scope: "account",
      sortOrder: 0,
      completionCardId: "daily-writs",
    }
    expect(cadwell?.matches(cadwellTask)).toBe(true)
    expect(cadwell?.matches(otherTask)).toBe(false)
  })

  it("disambiguates lore-library vs motif on completionItemPath[0]", () => {
    const lore = ENRICHMENT_SELECTORS.find((s) => s.key === "loreLibrary")
    const motif = ENRICHMENT_SELECTORS.find((s) => s.key === "motif")
    const loreTask: TaskData = {
      title: "Shalidor's Library",
      scope: "character",
      sortOrder: 0,
      completionCardId: "lore-library-character",
      completionItemPath: [1],
    }
    const motifTask: TaskData = {
      title: "Crafting Motifs",
      scope: "character",
      sortOrder: 0,
      completionCardId: "lore-library-character",
      completionItemPath: [2],
    }
    expect(lore?.matches(loreTask)).toBe(true)
    expect(lore?.matches(motifTask)).toBe(false)
    expect(motif?.matches(motifTask)).toBe(true)
    expect(motif?.matches(loreTask)).toBe(false)
  })

  it("matches the container selectors on their card ids and nothing else", () => {
    const inventory = ENRICHMENT_SELECTORS.find((s) => s.key === "inventoryManagement")
    const dungeon = ENRICHMENT_SELECTORS.find((s) => s.key === "dungeonSets")
    expect(inventory).toBeDefined()
    expect(dungeon).toBeDefined()
    const inventoryTask: TaskData = {
      title: "Inventory Management",
      scope: "all_characters",
      sortOrder: 0,
      completionCardId: "inventory-management",
    }
    const dungeonTask: TaskData = {
      title: "Dungeon Sets",
      scope: "all_characters",
      sortOrder: 0,
      completionCardId: "dungeon-sets",
    }
    expect(inventory?.matches(inventoryTask)).toBe(true)
    expect(inventory?.matches(dungeonTask)).toBe(false)
    expect(dungeon?.matches(dungeonTask)).toBe(true)
    expect(dungeon?.matches(inventoryTask)).toBe(false)
  })

  it("matches each antiquity selector on its own card id and nothing else", () => {
    const cards = [
      { key: "antiquityLore", cardId: "antiquity-lore" },
      { key: "antiquityMotifs", cardId: "antiquity-leads-motifs" },
      { key: "antiquityLegendary", cardId: "antiquity-leads-legendary" },
    ] as const
    for (const { key, cardId } of cards) {
      const selector = ENRICHMENT_SELECTORS.find((s) => s.key === key)
      expect(selector).toBeDefined()
      for (const { cardId: otherCardId } of cards) {
        const task: TaskData = {
          title: cardId,
          scope: "account",
          sortOrder: 0,
          completionCardId: otherCardId,
        }
        expect(selector?.matches(task)).toBe(cardId === otherCardId)
      }
    }
  })
})
