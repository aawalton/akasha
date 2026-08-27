import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperStatusEffectType } from "./temper-status-effect-type.ts"

const STATUS_STUN = "00000000-0000-0000-0000-00000000f001"
const STATUS_FEAR = "00000000-0000-0000-0000-00000000f002"
const STATUS_OFF_BALANCE = "00000000-0000-0000-0000-00000000f006"
const STATUS_INVISIBLE = "00000000-0000-0000-0000-00000000f00c"

const stun = Page({
  id: STATUS_STUN,
  title: "Stun",
  key: "stun",
})

const fear = Page({
  id: STATUS_FEAR,
  title: "Fear",
  key: "fear",
})

const offBalance = Page({
  id: STATUS_OFF_BALANCE,
  title: "Off Balance",
  key: "off-balance",
})

const invisible = Page({
  id: STATUS_INVISIBLE,
  title: "Invisible",
  key: "invisible",
})

describe("generateTemperStatusEffectType", () => {
  test("emits effects in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperStatusEffectType([invisible, offBalance, fear, stun])
    const idxStun = out.indexOf('"stun"')
    const idxFear = out.indexOf('"fear"')
    const idxOffBalance = out.indexOf('"off-balance"')
    const idxInvisible = out.indexOf('"invisible"')
    expect(idxStun).toBeGreaterThan(-1)
    expect(idxFear).toBeGreaterThan(idxStun)
    expect(idxOffBalance).toBeGreaterThan(idxFear)
    expect(idxInvisible).toBeGreaterThan(idxOffBalance)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperStatusEffectType([stun])
    expect(out).toContain('"stun": { id: "stun", name: "Stun" },')
  })

  test("emits a satisfies clause against StatusEffectTypeTemplate", () => {
    const out = generateTemperStatusEffectType([stun])
    expect(out).toContain("} as const satisfies Record<string, StatusEffectTypeTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000f0ff",
      title: null,
      key: "stun",
    })
    expect(() => generateTemperStatusEffectType([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000f0fe",
      title: "Stun",
    })
    expect(() => generateTemperStatusEffectType([broken])).toThrow()
  })
})
