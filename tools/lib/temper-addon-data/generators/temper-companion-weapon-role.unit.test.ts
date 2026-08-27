import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionWeaponRole } from "./temper-companion-weapon-role.ts"

const ROLE_NWR = "00000000-0000-0000-0000-00000000c001"
const ROLE_DW = "00000000-0000-0000-0000-00000000c002"
const ROLE_TH = "00000000-0000-0000-0000-00000000c003"
const ROLE_OHS = "00000000-0000-0000-0000-00000000c004"
const ROLE_BOW = "00000000-0000-0000-0000-00000000c005"
const ROLE_RS = "00000000-0000-0000-0000-00000000c006"
const ROLE_IS = "00000000-0000-0000-0000-00000000c007"
const ROLE_ICE = "00000000-0000-0000-0000-00000000c008"
const ROLE_LS = "00000000-0000-0000-0000-00000000c009"

const noRole = Page({
  id: ROLE_NWR,
  title: "No Weapon Role",
  key: "no-weapon-role",
  weaponSkillLineId: "no-skill-line",
  validMainHandWeaponTypes: [],
  validOffHandWeaponTypes: [],
})
const dualWield = Page({
  id: ROLE_DW,
  title: "Dual Wield",
  key: "dual-wield",
  weaponSkillLineId: "weapon-dual-wield",
  validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
  validOffHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
})
const twoHanded = Page({
  id: ROLE_TH,
  title: "Two Handed",
  key: "two-handed",
  weaponSkillLineId: "weapon-two-handed",
  validMainHandWeaponTypes: ["greatsword", "battleaxe", "maul"],
  validOffHandWeaponTypes: [],
})
const oneHandShield = Page({
  id: ROLE_OHS,
  title: "One Hand and Shield",
  key: "one-hand-and-shield",
  weaponSkillLineId: "weapon-one-hand-shield",
  validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
  validOffHandWeaponTypes: ["shield"],
})
const bow = Page({
  id: ROLE_BOW,
  title: "Bow",
  key: "bow",
  weaponSkillLineId: "weapon-bow",
  validMainHandWeaponTypes: ["bow"],
  validOffHandWeaponTypes: [],
})
const restoStaff = Page({
  id: ROLE_RS,
  title: "Restoration Staff",
  key: "restoration-staff",
  weaponSkillLineId: "weapon-restoration-staff",
  validMainHandWeaponTypes: ["restoration-staff"],
  validOffHandWeaponTypes: [],
})
const infernoStaff = Page({
  id: ROLE_IS,
  title: "Inferno Staff",
  key: "inferno-staff",
  weaponSkillLineId: "weapon-destruction-staff",
  validMainHandWeaponTypes: ["inferno-staff"],
  validOffHandWeaponTypes: [],
})
const iceStaff = Page({
  id: ROLE_ICE,
  title: "Ice Staff",
  key: "ice-staff",
  weaponSkillLineId: "weapon-destruction-staff",
  validMainHandWeaponTypes: ["ice-staff"],
  validOffHandWeaponTypes: [],
})
const lightningStaff = Page({
  id: ROLE_LS,
  title: "Lightning Staff",
  key: "lightning-staff",
  weaponSkillLineId: "weapon-destruction-staff",
  validMainHandWeaponTypes: ["lightning-staff"],
  validOffHandWeaponTypes: [],
})

describe("generateTemperCompanionWeaponRole", () => {
  test("emits roles in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperCompanionWeaponRole([
      lightningStaff,
      iceStaff,
      infernoStaff,
      restoStaff,
      bow,
      oneHandShield,
      twoHanded,
      dualWield,
      noRole,
    ])
    const idxNoRole = out.indexOf('  "no-weapon-role":')
    const idxDW = out.indexOf('  "dual-wield":')
    const idxTH = out.indexOf('  "two-handed":')
    const idxOHS = out.indexOf('  "one-hand-and-shield":')
    const idxBow = out.indexOf('  "bow":')
    const idxRS = out.indexOf('  "restoration-staff":')
    const idxIS = out.indexOf('  "inferno-staff":')
    const idxICE = out.indexOf('  "ice-staff":')
    const idxLS = out.indexOf('  "lightning-staff":')
    expect(idxNoRole).toBeGreaterThan(-1)
    expect(idxDW).toBeGreaterThan(idxNoRole)
    expect(idxTH).toBeGreaterThan(idxDW)
    expect(idxOHS).toBeGreaterThan(idxTH)
    expect(idxBow).toBeGreaterThan(idxOHS)
    expect(idxRS).toBeGreaterThan(idxBow)
    expect(idxIS).toBeGreaterThan(idxRS)
    expect(idxICE).toBeGreaterThan(idxIS)
    expect(idxLS).toBeGreaterThan(idxICE)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperCompanionWeaponRole([noRole, bow])
    expect(out).toContain(
      '"no-weapon-role": { id: "no-weapon-role" as const, name: "No Weapon Role", weaponSkillLineId: "no-skill-line", validMainHandWeaponTypes: [] as const, validOffHandWeaponTypes: [] as const },'
    )
    expect(out).toContain(
      '"bow": { id: "bow" as const, name: "Bow", weaponSkillLineId: "weapon-bow", validMainHandWeaponTypes: ["bow"] as const, validOffHandWeaponTypes: [] as const },'
    )
  })

  test("emits dual-wield with main-hand and off-hand arrays", () => {
    const out = generateTemperCompanionWeaponRole([dualWield])
    expect(out).toContain('validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"] as const')
    expect(out).toContain('validOffHandWeaponTypes: ["sword", "axe", "mace", "dagger"] as const')
  })

  test("emits a satisfies clause against CompanionWeaponRoleTemplate", () => {
    const out = generateTemperCompanionWeaponRole([noRole])
    expect(out).toContain("} as const satisfies Record<string, CompanionWeaponRoleTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0ff",
      title: null,
      key: "dual-wield",
      weaponSkillLineId: "weapon-dual-wield",
      validMainHandWeaponTypes: [],
      validOffHandWeaponTypes: [],
    })
    expect(() => generateTemperCompanionWeaponRole([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0fe",
      title: "Bow",
      weaponSkillLineId: "weapon-bow",
      validMainHandWeaponTypes: ["bow"],
      validOffHandWeaponTypes: [],
    })
    expect(() => generateTemperCompanionWeaponRole([broken])).toThrow()
  })
})
