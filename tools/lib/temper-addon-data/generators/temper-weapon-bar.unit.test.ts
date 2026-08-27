import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperWeaponBar } from "./temper-weapon-bar.ts"

const PRIMARY_ID = "00000000-0000-0000-0000-00000000b001"
const BACKUP_ID = "00000000-0000-0000-0000-00000000b002"

const primary = Page({
  id: PRIMARY_ID,
  title: "Primary Bar",
  key: "primary-weapon-bar",
})
const backup = Page({
  id: BACKUP_ID,
  title: "Backup Bar",
  key: "backup-weapon-bar",
})

describe("generateTemperWeaponBar", () => {
  test("emits primary bar before backup bar regardless of input order", () => {
    const out = generateTemperWeaponBar([backup, primary])
    const idxPrimary = out.indexOf('"primary-weapon-bar"')
    const idxBackup = out.indexOf('"backup-weapon-bar"')
    expect(idxPrimary).toBeGreaterThan(-1)
    expect(idxBackup).toBeGreaterThan(idxPrimary)
  })

  test("emits each entry as an id-keyed record value", () => {
    const out = generateTemperWeaponBar([primary, backup])
    expect(out).toContain(
      '"primary-weapon-bar": { id: "primary-weapon-bar", name: "Primary Bar" },'
    )
    expect(out).toContain('"backup-weapon-bar": { id: "backup-weapon-bar", name: "Backup Bar" },')
  })

  test("declares the satisfies clause for WeaponBarTemplate", () => {
    const out = generateTemperWeaponBar([primary, backup])
    expect(out).toContain("as const satisfies Record<string, WeaponBarTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b003",
      title: null,
      key: "primary-weapon-bar",
    })
    expect(() => generateTemperWeaponBar([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b004",
      title: "Primary Bar",
    })
    expect(() => generateTemperWeaponBar([broken])).toThrow()
  })
})
