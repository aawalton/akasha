import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperGrimoire } from "./temper-grimoire.ts"

const GRIMOIRE_VAULT = "00000000-0000-0000-0000-00000000a001"
const GRIMOIRE_WIELD_SOUL = "00000000-0000-0000-0000-00000000a002"
const GRIMOIRE_SMASH = "00000000-0000-0000-0000-00000000a004"

const vault = Page({
  id: GRIMOIRE_VAULT,
  title: "Vault",
  icon: "/esoui/art/icons/item_grimoire_bow.dds",
  key: "vault",
  abilityIcon: "/esoui/art/icons/ability_grimoire_bow.dds",
  skillLineId: "weapon-bow",
  itemId: 204485,
  uespId: 1,
  compatibleFocusScripts: ["bleed-damage", "physical-damage"],
  compatibleSignatureScripts: ["lingering-torment", "class-mastery"],
  compatibleAffixScripts: ["off-balance"],
  signatureScripts: {
    "lingering-torment": {
      scriptId: "lingering-torment",
      description: "Deals 2980 Physical Damage over 20 seconds to enemies.",
    },
    "class-mastery": {
      scriptId: "class-mastery",
      description:
        "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times.",
      classId: "necromancer",
    },
  },
  affixScripts: {
    "off-balance": {
      scriptId: "off-balance",
      description: "Sets enemies Off Balance for 7 seconds.",
    },
  },
})

const wieldSoul = Page({
  id: GRIMOIRE_WIELD_SOUL,
  title: "Wield Soul",
  icon: "/esoui/art/icons/item_grimoire_soulmagic1.dds",
  key: "wield-soul",
  abilityIcon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  skillLineId: "world-soul-magic",
  itemId: 204491,
  uespId: 2,
  compatibleFocusScripts: ["magic-damage"],
  compatibleSignatureScripts: ["anchorites-cruelty"],
  compatibleAffixScripts: ["resolve"],
  signatureScripts: {
    "anchorites-cruelty": {
      scriptId: "anchorites-cruelty",
      description: "Consumes a Soul Gem to deal Oblivion Damage.",
    },
  },
  affixScripts: {
    resolve: {
      scriptId: "resolve",
      description: "Grants Major Resolve, increasing Physical and Spell Resistance by 5948.",
    },
  },
})

const smash = Page({
  id: GRIMOIRE_SMASH,
  title: "Smash",
  icon: "/esoui/art/icons/item_grimoire_2h.dds",
  key: "smash",
  abilityIcon: "/esoui/art/icons/ability_grimoire_2h.dds",
  skillLineId: "weapon-two-handed",
  itemId: 204487,
  uespId: 4,
  compatibleFocusScripts: ["physical-damage"],
  compatibleSignatureScripts: ["lingering-torment"],
  compatibleAffixScripts: ["berserk"],
  signatureScripts: {
    "lingering-torment": {
      scriptId: "lingering-torment",
      description: "Deals 1500 Physical Damage over 10 seconds.",
    },
  },
  affixScripts: {
    berserk: {
      scriptId: "berserk",
      description: "Grants Minor Berserk for 20 seconds.",
    },
  },
})

describe("generateTemperGrimoire", () => {
  test("emits grimoires sorted by uespId regardless of input order", () => {
    const out = generateTemperGrimoire([smash, wieldSoul, vault])
    const idxVault = out.indexOf('"vault":')
    const idxWieldSoul = out.indexOf('"wield-soul":')
    const idxSmash = out.indexOf('"smash":')
    expect(idxVault).toBeGreaterThan(-1)
    expect(idxWieldSoul).toBeGreaterThan(idxVault)
    expect(idxSmash).toBeGreaterThan(idxWieldSoul)
  })

  test("emits each entry with id/name/icon/abilityIcon/skillLineId/itemId/uespId", () => {
    const out = generateTemperGrimoire([vault])
    expect(out).toContain('id: "vault"')
    expect(out).toContain('name: "Vault"')
    expect(out).toContain('icon: "/esoui/art/icons/item_grimoire_bow.dds"')
    expect(out).toContain('abilityIcon: "/esoui/art/icons/ability_grimoire_bow.dds"')
    expect(out).toContain('skillLineId: "weapon-bow"')
    expect(out).toContain("itemId: 204485")
    expect(out).toContain("uespId: 1")
  })

  test("emits compatibleXxxScripts arrays preserving seed order", () => {
    const out = generateTemperGrimoire([vault])
    expect(out).toContain('compatibleFocusScripts: ["bleed-damage", "physical-damage"]')
    expect(out).toContain('compatibleSignatureScripts: ["lingering-torment", "class-mastery"]')
    expect(out).toContain('compatibleAffixScripts: ["off-balance"]')
  })

  test("emits signatureScripts map with optional classId when present", () => {
    const out = generateTemperGrimoire([vault])
    expect(out).toContain(
      '"class-mastery": { scriptId: "class-mastery", description: "Once every 3 seconds, increase your Health, Magicka, and Stamina by 2% for 10 seconds for each corpse within 12 meters, up to 10 times.", classId: "necromancer" }'
    )
    expect(out).toContain('"lingering-torment": { scriptId: "lingering-torment"')
  })

  test("emits signatureScripts entries sorted by scriptId key for determinism", () => {
    const out = generateTemperGrimoire([vault])
    const sigOffset = out.indexOf("signatureScripts: {")
    const idxClassMastery = out.indexOf('"class-mastery"', sigOffset)
    const idxLingering = out.indexOf('"lingering-torment"', sigOffset)
    expect(idxClassMastery).toBeGreaterThan(sigOffset)
    expect(idxLingering).toBeGreaterThan(idxClassMastery)
  })

  test("emits affixScripts map without classId", () => {
    const out = generateTemperGrimoire([vault])
    expect(out).toContain(
      '"off-balance": { scriptId: "off-balance", description: "Sets enemies Off Balance for 7 seconds." }'
    )
  })

  test("emits a satisfies clause against GrimoireTemplate", () => {
    const out = generateTemperGrimoire([vault])
    expect(out).toContain("} as const satisfies Record<string, GrimoireTemplate>")
    expect(out).toContain('import type { GrimoireTemplate } from "../scribing/grimoires-data"')
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a0ff",
      title: null,
      icon: "",
      key: "vault",
      abilityIcon: "",
      skillLineId: "weapon-bow",
      itemId: 204485,
      uespId: 1,
      compatibleFocusScripts: [],
      compatibleSignatureScripts: [],
      compatibleAffixScripts: [],
      signatureScripts: {},
      affixScripts: {},
    })
    expect(() => generateTemperGrimoire([broken])).toThrow(/null title/)
  })

  test("throws when a required key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a0fe",
      title: "Broken",
      icon: "",
    })
    expect(() => generateTemperGrimoire([broken])).toThrow()
  })

  test("throws when signature variant shape is malformed", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a0fd",
      title: "Broken",
      icon: "",
      key: "vault",
      abilityIcon: "",
      skillLineId: "weapon-bow",
      itemId: 204485,
      uespId: 1,
      compatibleFocusScripts: [],
      compatibleSignatureScripts: [],
      compatibleAffixScripts: [],
      signatureScripts: { foo: { description: "nope" } },
      affixScripts: {},
    })
    expect(() => generateTemperGrimoire([broken])).toThrow()
  })
})
