import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperRotationBreakdownRow } from "./temper-rotation-breakdown-row.ts"

const ROW_DAMAGE = "00000000-0000-0000-0000-00000000b001"
const ROW_D_PERCENT = "00000000-0000-0000-0000-00000000b002"
const ROW_DPS = "00000000-0000-0000-0000-00000000b003"
const ROW_DPC = "00000000-0000-0000-0000-00000000b004"
const ROW_HEALING = "00000000-0000-0000-0000-00000000b005"
const ROW_H_PERCENT = "00000000-0000-0000-0000-00000000b006"
const ROW_SPS = "00000000-0000-0000-0000-00000000b007"
const ROW_SPC = "00000000-0000-0000-0000-00000000b008"
const ROW_HPS = "00000000-0000-0000-0000-00000000b009"
const ROW_HPC = "00000000-0000-0000-0000-00000000b00a"
const ROW_CASTS = "00000000-0000-0000-0000-00000000b00b"
const ROW_UPTIME = "00000000-0000-0000-0000-00000000b00c"
const ROW_TPS = "00000000-0000-0000-0000-00000000b00d"

const damage = Page({
  id: ROW_DAMAGE,
  title: "Damage",
  key: "damage",
  fullName: "Total Damage",
  description: "Total damage dealt over the rotation",
})

const dPercent = Page({
  id: ROW_D_PERCENT,
  title: "D %",
  key: "d-percent",
  fullName: "Damage Percent",
  description: "Percentage of total damage dealt",
})

const dps = Page({
  id: ROW_DPS,
  title: "DPS",
  key: "dps",
  fullName: "Damage Per Second",
  description: "Average damage dealt per second",
})

const dpc = Page({
  id: ROW_DPC,
  title: "DPC",
  key: "dpc",
  fullName: "Damage Per Cast",
  description: "Average damage dealt per skill cast",
})

const healing = Page({
  id: ROW_HEALING,
  title: "Healing",
  key: "healing",
  fullName: "Total Healing",
  description: "Total healing done over the rotation",
})

const hPercent = Page({
  id: ROW_H_PERCENT,
  title: "H %",
  key: "h-percent",
  fullName: "Healing Percent",
  description: "Percentage of total healing done",
})

const sps = Page({
  id: ROW_SPS,
  title: "SPS",
  key: "sps",
  fullName: "Shielding Per Second",
  description: "Average shielding applied per second",
})

const spc = Page({
  id: ROW_SPC,
  title: "SPC",
  key: "spc",
  fullName: "Shielding Per Cast",
  description: "Average shielding applied per skill cast",
})

const hps = Page({
  id: ROW_HPS,
  title: "HPS",
  key: "hps",
  fullName: "Healing Per Second",
  description: "Average healing done per second",
})

const hpc = Page({
  id: ROW_HPC,
  title: "HPC",
  key: "hpc",
  fullName: "Healing Per Cast",
  description: "Average healing done per skill cast",
})

const casts = Page({
  id: ROW_CASTS,
  title: "Casts",
  key: "casts",
  fullName: "Total Casts",
  description: "Number of times the skill was used",
})

const uptime = Page({
  id: ROW_UPTIME,
  title: "Uptime",
  key: "uptime",
  fullName: "Effect Uptime",
  description: "Percentage of time the effect was active",
})

const tps = Page({
  id: ROW_TPS,
  title: "TPS",
  key: "tps",
  fullName: "Average Effective Health",
  description: "Effective health contribution from defensive effects",
})

describe("generateTemperRotationBreakdownRow", () => {
  test("emits rows in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperRotationBreakdownRow([
      tps,
      uptime,
      casts,
      hpc,
      hps,
      spc,
      sps,
      hPercent,
      healing,
      dpc,
      dps,
      dPercent,
      damage,
    ])
    const idxDamage = out.indexOf('"damage":')
    const idxDPercent = out.indexOf('"d-percent"')
    const idxDps = out.indexOf('"dps"')
    const idxDpc = out.indexOf('"dpc"')
    const idxHealing = out.indexOf('"healing"')
    const idxHPercent = out.indexOf('"h-percent"')
    const idxSps = out.indexOf('"sps"')
    const idxSpc = out.indexOf('"spc"')
    const idxHps = out.indexOf('"hps"')
    const idxHpc = out.indexOf('"hpc"')
    const idxCasts = out.indexOf('"casts"')
    const idxUptime = out.indexOf('"uptime"')
    const idxTps = out.indexOf('"tps"')
    expect(idxDamage).toBeGreaterThan(-1)
    expect(idxDPercent).toBeGreaterThan(idxDamage)
    expect(idxDps).toBeGreaterThan(idxDPercent)
    expect(idxDpc).toBeGreaterThan(idxDps)
    expect(idxHealing).toBeGreaterThan(idxDpc)
    expect(idxHPercent).toBeGreaterThan(idxHealing)
    expect(idxSps).toBeGreaterThan(idxHPercent)
    expect(idxSpc).toBeGreaterThan(idxSps)
    expect(idxHps).toBeGreaterThan(idxSpc)
    expect(idxHpc).toBeGreaterThan(idxHps)
    expect(idxCasts).toBeGreaterThan(idxHpc)
    expect(idxUptime).toBeGreaterThan(idxCasts)
    expect(idxTps).toBeGreaterThan(idxUptime)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperRotationBreakdownRow([dPercent])
    expect(out).toContain(
      '"d-percent": { id: "d-percent", name: "D %", fullName: "Damage Percent", description: "Percentage of total damage dealt" },'
    )
  })

  test("emits a satisfies clause against RotationBreakdownRowTemplate", () => {
    const out = generateTemperRotationBreakdownRow([damage])
    expect(out).toContain("} as const satisfies Record<string, RotationBreakdownRowTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b0ff",
      title: null,
      key: "damage",
      fullName: "Total Damage",
      description: "Total damage dealt over the rotation",
    })
    expect(() => generateTemperRotationBreakdownRow([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b0fe",
      title: "Damage",
      fullName: "Total Damage",
      description: "Total damage dealt over the rotation",
    })
    expect(() => generateTemperRotationBreakdownRow([broken])).toThrow()
  })

  test("throws when fullName is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b0fd",
      title: "Damage",
      key: "damage",
      description: "Total damage dealt over the rotation",
    })
    expect(() => generateTemperRotationBreakdownRow([broken])).toThrow()
  })
})
