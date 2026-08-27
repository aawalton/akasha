import { describe, expect, it } from "bun:test"
import type { MountTrainingProgress } from "@temper/game-completion/completion-types"
import { isMountTrainingPathComplete } from "./completion-mount-training-completeness"

const MAXED: MountTrainingProgress = {
  speed: 60,
  maxSpeed: 60,
  stamina: 60,
  maxStamina: 60,
  carryCapacity: 60,
  maxCarryCapacity: 60,
}

describe("isMountTrainingPathComplete — card level", () => {
  it("complete when all three stats are maxed", () => {
    expect(isMountTrainingPathComplete(MAXED)).toBe(true)
  })

  it("incomplete when speed is below max", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, speed: 59 })).toBe(false)
  })

  it("incomplete when stamina is below max", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, stamina: 0 })).toBe(false)
  })

  it("incomplete when carryCapacity is below max", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, carryCapacity: 30 })).toBe(false)
  })

  it("incomplete when mount-training data is missing", () => {
    expect(isMountTrainingPathComplete(undefined)).toBe(false)
  })

  it("treats an empty path the same as no path", () => {
    expect(isMountTrainingPathComplete(MAXED, [])).toBe(true)
    expect(isMountTrainingPathComplete({ ...MAXED, speed: 0 }, [])).toBe(false)
  })
})

describe("isMountTrainingPathComplete — item level", () => {
  it("complete for a single maxed stat", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, stamina: 0 }, ["speed"])).toBe(true)
  })

  it("incomplete for a single non-maxed stat", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, speed: 59 }, ["speed"])).toBe(false)
  })

  it("checks stamina and carryCapacity independently", () => {
    const mt = { ...MAXED, speed: 0, carryCapacity: 0 }
    expect(isMountTrainingPathComplete(mt, ["stamina"])).toBe(true)
    expect(isMountTrainingPathComplete(mt, ["carryCapacity"])).toBe(false)
  })

  it("incomplete for an unknown stat", () => {
    expect(isMountTrainingPathComplete(MAXED, ["unknown"])).toBe(false)
  })

  it("incomplete when data is missing regardless of path", () => {
    expect(isMountTrainingPathComplete(undefined, ["speed"])).toBe(false)
  })
})
