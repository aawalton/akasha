import "../test-eso-load-globals"

import { describe, expect, test } from "bun:test"

import { getPendingAction } from "../rules-core"
import { freezeStockBackpackCounts as frozen } from "../rules-dispatch-bank-reconcile"
import { collectBankWithdrawals } from "../rules-dispatch-bank-withdrawals"
import { evaluateRules } from "../rules-eval"
import {
  BAG_BACKPACK_ID,
  BAG_BANK_ID,
  bankCtx,
  makeSlot,
  OTHER,
  SELF,
  setSlot,
  stubCompiledConfig,
  useBagWorld,
} from "./bag-world"

useBagWorld()

describe("collectBankWithdrawals — cross-char vendor target awareness", () => {
  test("cross-char list item in bank, current char IS target: withdrawn to backpack", () => {
    stubCompiledConfig({ 300: { action: "list", destination: `character:${SELF}` } })
    setSlot(BAG_BANK_ID, 3, makeSlot(300, 1))
    const withdrawals = collectBankWithdrawals(bankCtx(), SELF, frozen())
    const w = withdrawals.find((x) => x.bagId === BAG_BANK_ID && x.slotIndex === 3)
    expect(w).toBeDefined()
    expect(w?.dest).toBe("backpack")
  })

  test("cross-char list item in bank, current char is NOT target: left in bank", () => {
    stubCompiledConfig({ 301: { action: "list", destination: `character:${OTHER}` } })
    setSlot(BAG_BANK_ID, 3, makeSlot(301, 1))
    const withdrawals = collectBankWithdrawals(bankCtx(), SELF, frozen())
    const w = withdrawals.find((x) => x.bagId === BAG_BANK_ID && x.slotIndex === 3)
    expect(w).toBeUndefined()
    expect(getPendingAction(BAG_BANK_ID, 3)).toBeUndefined()
  })

  test("destination-less list item in bank: withdrawn (in-place vendor needs backpack)", () => {
    stubCompiledConfig({ 304: { action: "list" } })
    setSlot(BAG_BANK_ID, 5, makeSlot(304, 1))
    const withdrawals = collectBankWithdrawals(bankCtx(), SELF, frozen())
    const w = withdrawals.find((x) => x.bagId === BAG_BANK_ID && x.slotIndex === 5)
    expect(w).toBeDefined()
    expect(w?.dest).toBe("backpack")
  })

  test("cross-char fence-sell item in bank, current char is NOT target: left in bank", () => {
    stubCompiledConfig({ 302: { action: "fence-sell", destination: `character:${OTHER}` } })
    setSlot(BAG_BANK_ID, 4, makeSlot(302, 1, { stolen: true }))
    const withdrawals = collectBankWithdrawals(bankCtx(), SELF, frozen())
    const w = withdrawals.find((x) => x.bagId === BAG_BANK_ID && x.slotIndex === 4)
    expect(w).toBeUndefined()
  })

  test("cross-char fence-sell item in bank, current char IS target: withdrawn", () => {
    stubCompiledConfig({ 303: { action: "fence-sell", destination: `character:${SELF}` } })
    setSlot(BAG_BANK_ID, 4, makeSlot(303, 1, { stolen: true }))
    const withdrawals = collectBankWithdrawals(bankCtx(), SELF, frozen())
    const w = withdrawals.find((x) => x.bagId === BAG_BANK_ID && x.slotIndex === 4)
    expect(w).toBeDefined()
    expect(w?.dest).toBe("backpack")
  })
})

describe("collectBankWithdrawals — move-to character self target", () => {
  test("move-to item in bank, current char IS target: withdrawn to that character", () => {
    stubCompiledConfig({ 305: { action: "move-to", destination: `character:${SELF}` } })
    setSlot(BAG_BANK_ID, 6, makeSlot(305, 1))
    const withdrawals = collectBankWithdrawals(bankCtx(), SELF, frozen())
    const w = withdrawals.find((x) => x.bagId === BAG_BANK_ID && x.slotIndex === 6)
    expect(w).toBeDefined()
    expect(w?.dest).toBe(`character:${SELF}`)
  })

  test("move-to item already in backpack, current char IS target: no action (already at destination)", () => {
    stubCompiledConfig({ 306: { action: "move-to", destination: `character:${SELF}` } })
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(306, 1))
    evaluateRules(BAG_BACKPACK_ID, 0)
    expect(getPendingAction(BAG_BACKPACK_ID, 0)).toBeUndefined()
  })
})
