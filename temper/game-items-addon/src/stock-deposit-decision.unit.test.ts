import { describe, expect, test } from "bun:test"
import { computeStockTierDeposit } from "./stock-deposit-decision"

describe("computeStockTierDeposit", () => {
  test("uncapped tier deposits all excess above the self target (2-tier chain / flat rule)", () => {
    expect(
      computeStockTierDeposit({
        stackCount: 250,
        backpackCount: 250,
        selfTarget: 200,
        alreadyDispatched: 0,
        tierCap: undefined,
        tierAccountWideCount: 0,
      })
    ).toBe(50)
  })

  test("at or below the self target deposits nothing", () => {
    expect(
      computeStockTierDeposit({
        stackCount: 200,
        backpackCount: 200,
        selfTarget: 200,
        alreadyDispatched: 0,
        tierCap: undefined,
        tierAccountWideCount: 0,
      })
    ).toBe(0)
  })

  test("capped bank tier deposits only up to its remaining account-wide cap", () => {
    expect(
      computeStockTierDeposit({
        stackCount: 300,
        backpackCount: 300,
        selfTarget: 5,
        alreadyDispatched: 0,
        tierCap: 200,
        tierAccountWideCount: 180,
      })
    ).toBe(20)
  })

  test("a full capped tier deposits nothing (overflow falls to the next tier)", () => {
    expect(
      computeStockTierDeposit({
        stackCount: 300,
        backpackCount: 300,
        selfTarget: 5,
        alreadyDispatched: 0,
        tierCap: 200,
        tierAccountWideCount: 200,
      })
    ).toBe(0)
  })

  test("uncapped overflow tier (house coffer) deposits all remaining excess", () => {
    expect(
      computeStockTierDeposit({
        stackCount: 100,
        backpackCount: 105,
        selfTarget: 5,
        alreadyDispatched: 0,
        tierCap: undefined,
        tierAccountWideCount: 200,
      })
    ).toBe(100)
  })

  test("alreadyDispatched this pass reduces both the excess and the remaining cap", () => {
    expect(
      computeStockTierDeposit({
        stackCount: 280,
        backpackCount: 300,
        selfTarget: 5,
        alreadyDispatched: 20,
        tierCap: 200,
        tierAccountWideCount: 180,
      })
    ).toBe(0)
  })

  test("never moves more than the current stack", () => {
    expect(
      computeStockTierDeposit({
        stackCount: 10,
        backpackCount: 300,
        selfTarget: 5,
        alreadyDispatched: 0,
        tierCap: undefined,
        tierAccountWideCount: 0,
      })
    ).toBe(10)
  })
})
