import "../test-eso-load-globals"

import { describe, expect, test } from "bun:test"

import { applyAction, getPendingAction } from "../rules-core"
import { executeBankDeposits } from "../rules-dispatch-bank-deposits"
import { freezeStockBackpackCounts as frozen } from "../rules-dispatch-bank-reconcile"
import {
  BAG_BACKPACK_ID,
  BAG_BANK_ID,
  bankCtx,
  makeSlot,
  OTHER,
  recordMove,
  SELF,
  setSlot,
  useBagWorld,
  world,
} from "./bag-world"

useBagWorld()

describe("executeBankDeposits — cross-char vendor admission", () => {
  test("cross-char list (backpack) is deposited to the bank", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(200, 1))
    applyAction(BAG_BACKPACK_ID, 0, "list", `character:${OTHER}`)
    const ctx = bankCtx()
    const { depositedLinks } = executeBankDeposits(ctx, SELF, frozen(), 0, 100, recordMove)
    expect(depositedLinks.length).toBe(1)
    const moveToBank = world.moves.find(
      (m) => m.srcBag === BAG_BACKPACK_ID && m.tgtBag === BAG_BANK_ID
    )
    expect(moveToBank).toBeDefined()
  })

  test("same-char list (backpack) is NOT deposited — stays for the trading house", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(201, 1))
    applyAction(BAG_BACKPACK_ID, 0, "list", `character:${SELF}`)
    const ctx = bankCtx()
    const { depositedLinks } = executeBankDeposits(ctx, SELF, frozen(), 0, 100, recordMove)
    expect(depositedLinks.length).toBe(0)
    expect(world.moves.length).toBe(0)
  })

  test("destination-less list (backpack) is NOT deposited", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(202, 1))
    applyAction(BAG_BACKPACK_ID, 0, "list", undefined)
    const ctx = bankCtx()
    const { depositedLinks } = executeBankDeposits(ctx, SELF, frozen(), 0, 100, recordMove)
    expect(depositedLinks.length).toBe(0)
  })

  test("cross-char stolen fence-sell (backpack) is deposited to the bank", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(203, 1, { stolen: true }))
    applyAction(BAG_BACKPACK_ID, 0, "sell", `character:${OTHER}`)
    expect(getPendingAction(BAG_BACKPACK_ID, 0)).toBe("fence-sell")
    const ctx = bankCtx()
    const { depositedLinks } = executeBankDeposits(ctx, SELF, frozen(), 0, 100, recordMove)
    expect(depositedLinks.length).toBe(1)
  })

  test("cross-char non-stolen sell carrier (backpack) is deposited to the bank", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(204, 1))
    applyAction(BAG_BACKPACK_ID, 0, "sell", `character:${OTHER}`)
    expect(getPendingAction(BAG_BACKPACK_ID, 0)).toBe("sell")
    const ctx = bankCtx()
    const { depositedLinks } = executeBankDeposits(ctx, SELF, frozen(), 0, 100, recordMove)
    expect(depositedLinks.length).toBe(1)
  })
})
