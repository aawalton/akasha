import { describe, expect, test } from "bun:test"
import type { MountTrainingProgress } from "@akasha/temper-completion/completion-progress"
import { isMountTrainingPathComplete } from "./completion-mount-training-completeness.module.code.ts"

const MAXED: MountTrainingProgress = {
  speed: 60,
  maxSpeed: 60,
  stamina: 60,
  maxStamina: 60,
  carryCapacity: 60,
  maxCarryCapacity: 60,
}

describe("isMountTrainingPathComplete asked about the whole card", () => {
  test("complete when all three statistics are maxed", () => {
    expect(isMountTrainingPathComplete(MAXED)).toBe(true)
  })

  test("incomplete when speed is below max", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, speed: 59 })).toBe(false)
  })

  test("incomplete when stamina is below max", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, stamina: 0 })).toBe(false)
  })

  test("incomplete when carryCapacity is below max", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, carryCapacity: 30 })).toBe(false)
  })

  test("incomplete when mount-training data is missing", () => {
    expect(isMountTrainingPathComplete(undefined)).toBe(false)
  })

  test("treats an empty path the same as no path", () => {
    expect(isMountTrainingPathComplete(MAXED, [])).toBe(true)
    expect(isMountTrainingPathComplete({ ...MAXED, speed: 0 }, [])).toBe(false)
  })
})

describe("isMountTrainingPathComplete asked about one item", () => {
  test("complete for a single maxed statistic", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, stamina: 0 }, ["speed"])).toBe(true)
  })

  test("incomplete for a single non-maxed statistic", () => {
    expect(isMountTrainingPathComplete({ ...MAXED, speed: 59 }, ["speed"])).toBe(false)
  })

  test("checks stamina and carryCapacity independently", () => {
    const mountTraining = { ...MAXED, speed: 0, carryCapacity: 0 }
    expect(isMountTrainingPathComplete(mountTraining, ["stamina"])).toBe(true)
    expect(isMountTrainingPathComplete(mountTraining, ["carryCapacity"])).toBe(false)
  })

  test("incomplete for an unknown statistic", () => {
    expect(isMountTrainingPathComplete(MAXED, ["unknown"])).toBe(false)
  })

  test("incomplete when data is missing regardless of path", () => {
    expect(isMountTrainingPathComplete(undefined, ["speed"])).toBe(false)
  })
})
