import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperTargetType } from "./temper-target-type.ts"

const TYPE_SELF = "00000000-0000-0000-0000-00000000a001"
const TYPE_ENEMY = "00000000-0000-0000-0000-00000000a002"
const TYPE_ALLY = "00000000-0000-0000-0000-00000000a003"
const TYPE_SELF_AND_ALLY = "00000000-0000-0000-0000-00000000a004"
const TYPE_SELF_OR_ALLY = "00000000-0000-0000-0000-00000000a005"
const TYPE_LOWEST_HEALTH_ALLY = "00000000-0000-0000-0000-00000000a006"
const TYPE_GROUND = "00000000-0000-0000-0000-00000000a007"

const self = Page({
  id: TYPE_SELF,
  title: "Self",
  key: "self",
})

const enemy = Page({
  id: TYPE_ENEMY,
  title: "Enemy",
  key: "enemy",
})

const ally = Page({
  id: TYPE_ALLY,
  title: "Ally",
  key: "ally",
})

const selfAndAlly = Page({
  id: TYPE_SELF_AND_ALLY,
  title: "Self + Ally",
  key: "self-and-ally",
})

const selfOrAlly = Page({
  id: TYPE_SELF_OR_ALLY,
  title: "Self / Ally",
  key: "self-or-ally",
})

const lowestHealthAlly = Page({
  id: TYPE_LOWEST_HEALTH_ALLY,
  title: "Lowest Health Ally",
  key: "lowest-health-ally",
})

const ground = Page({
  id: TYPE_GROUND,
  title: "Ground",
  key: "ground",
})

describe("generateTemperTargetType", () => {
  test("emits types in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperTargetType([
      ground,
      lowestHealthAlly,
      selfOrAlly,
      selfAndAlly,
      ally,
      enemy,
      self,
    ])
    const idxSelf = out.indexOf('"self":')
    const idxEnemy = out.indexOf('"enemy"')
    const idxAlly = out.indexOf('"ally"')
    const idxSelfAndAlly = out.indexOf('"self-and-ally"')
    const idxSelfOrAlly = out.indexOf('"self-or-ally"')
    const idxLowestHealthAlly = out.indexOf('"lowest-health-ally"')
    const idxGround = out.indexOf('"ground"')
    expect(idxSelf).toBeGreaterThan(-1)
    expect(idxEnemy).toBeGreaterThan(idxSelf)
    expect(idxAlly).toBeGreaterThan(idxEnemy)
    expect(idxSelfAndAlly).toBeGreaterThan(idxAlly)
    expect(idxSelfOrAlly).toBeGreaterThan(idxSelfAndAlly)
    expect(idxLowestHealthAlly).toBeGreaterThan(idxSelfOrAlly)
    expect(idxGround).toBeGreaterThan(idxLowestHealthAlly)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperTargetType([selfAndAlly])
    expect(out).toContain('"self-and-ally": { id: "self-and-ally", name: "Self + Ally" },')
  })

  test("emits a satisfies clause against TargetTypeTemplate", () => {
    const out = generateTemperTargetType([self])
    expect(out).toContain("} as const satisfies Record<string, TargetTypeTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a0ff",
      title: null,
      key: "self",
    })
    expect(() => generateTemperTargetType([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a0fe",
      title: "Self",
    })
    expect(() => generateTemperTargetType([broken])).toThrow()
  })
})
