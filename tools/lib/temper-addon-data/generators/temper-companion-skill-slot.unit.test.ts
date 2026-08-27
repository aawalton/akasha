import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionSkillSlot } from "./temper-companion-skill-slot.ts"

const SLOT_ACTIVE_1 = "00000000-0000-0000-0000-00000000a001"
const SLOT_ACTIVE_2 = "00000000-0000-0000-0000-00000000a002"
const SLOT_ACTIVE_3 = "00000000-0000-0000-0000-00000000a003"
const SLOT_ACTIVE_4 = "00000000-0000-0000-0000-00000000a004"
const SLOT_ACTIVE_5 = "00000000-0000-0000-0000-00000000a005"
const SLOT_ULTIMATE = "00000000-0000-0000-0000-00000000a006"

const active1 = Page({ id: SLOT_ACTIVE_1, title: "Active 1", key: "active-1" })
const active2 = Page({ id: SLOT_ACTIVE_2, title: "Active 2", key: "active-2" })
const active3 = Page({ id: SLOT_ACTIVE_3, title: "Active 3", key: "active-3" })
const active4 = Page({ id: SLOT_ACTIVE_4, title: "Active 4", key: "active-4" })
const active5 = Page({ id: SLOT_ACTIVE_5, title: "Active 5", key: "active-5" })
const ultimate = Page({ id: SLOT_ULTIMATE, title: "Ultimate", key: "ultimate" })

describe("generateTemperCompanionSkillSlot", () => {
  test("emits slots in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperCompanionSkillSlot([
      ultimate,
      active5,
      active4,
      active3,
      active2,
      active1,
    ])
    const idx1 = out.indexOf('"active-1"')
    const idx2 = out.indexOf('"active-2"')
    const idx3 = out.indexOf('"active-3"')
    const idx4 = out.indexOf('"active-4"')
    const idx5 = out.indexOf('"active-5"')
    const idxUlt = out.indexOf('"ultimate"')
    expect(idx1).toBeGreaterThan(-1)
    expect(idx2).toBeGreaterThan(idx1)
    expect(idx3).toBeGreaterThan(idx2)
    expect(idx4).toBeGreaterThan(idx3)
    expect(idx5).toBeGreaterThan(idx4)
    expect(idxUlt).toBeGreaterThan(idx5)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperCompanionSkillSlot([active1, ultimate])
    expect(out).toContain('"active-1": { id: "active-1", name: "Active 1" },')
    expect(out).toContain('"ultimate": { id: "ultimate", name: "Ultimate" },')
  })

  test("emits a satisfies clause against CompanionSkillSlotTemplate", () => {
    const out = generateTemperCompanionSkillSlot([active1])
    expect(out).toContain("} as const satisfies Record<string, CompanionSkillSlotTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a0ff",
      title: null,
      key: "active-1",
    })
    expect(() => generateTemperCompanionSkillSlot([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a0fe",
      title: "Active 1",
    })
    expect(() => generateTemperCompanionSkillSlot([broken])).toThrow()
  })
})
