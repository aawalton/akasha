import "./test-eso-load-globals"

import { expect, test } from "bun:test"
import {
  beginMailSession,
  countCategoryMatches,
  decideAfterResponse,
  finishSession,
  onInboxUpdate,
  onTakeAllResponse,
} from "./mail-handler"
import {
  HIRELING_CATEGORY,
  HIRELING_SUBJECTS,
  isHirelingMailInfo,
  type MailHeader,
  type MailSourceCategory,
} from "./mail-source-category"

test("isHirelingMailInfo matches every hireling materials subject", () => {
  for (const subject of HIRELING_SUBJECTS) {
    expect(isHirelingMailInfo(subject, 2, 0, 0)).toBe(true)
  }
})

test("isHirelingMailInfo identifies hireling mail independent of sender flags", () => {
  expect(isHirelingMailInfo("Raw Blacksmith Materials", 3, 0, 0)).toBe(true)
})

test("isHirelingMailInfo rejects non-hireling and degenerate mail", () => {
  expect(isHirelingMailInfo("Currency from a Completed Sale", 1, 500, 0)).toBe(false)
  expect(isHirelingMailInfo("Raw Provisioner Materials", 0, 0, 0)).toBe(false)
  expect(isHirelingMailInfo("", 0, 0, 0)).toBe(false)
  expect(isHirelingMailInfo("Raw Woodworker Materials", 1, 0, 50)).toBe(false)
})

test("HIRELING_SUBJECTS holds the five crafting hirelings, no jewelry", () => {
  expect(HIRELING_SUBJECTS.length).toBe(5)
  expect(HIRELING_SUBJECTS).not.toContain("Raw Jewelcrafter Materials")
})

test("HIRELING_CATEGORY is the hireling instance of the generic engine", () => {
  expect(HIRELING_CATEGORY.id).toBe("hireling")
  expect(HIRELING_CATEGORY.scanCategory).toBe(MAIL_CATEGORY_SYSTEM_MAIL)
  const hirelingHeader: MailHeader = {
    senderDisplayName: "Blacksmith Hireling",
    subject: "Raw Blacksmith Materials",
    fromSystem: false,
    fromCustomerService: false,
    returned: false,
    numAttachments: 2,
    attachedMoney: 0,
    codAmount: 0,
    category: MAIL_CATEGORY_SYSTEM_MAIL,
  }
  expect(HIRELING_CATEGORY.matches(hirelingHeader)).toBe(true)
  expect(
    HIRELING_CATEGORY.matches({ ...hirelingHeader, subject: "Item Sold", attachedMoney: 500 })
  ).toBe(false)
})

test("decideAfterResponse continues on a SUCCESS that left more takeable mail", () => {
  expect(decideAfterResponse(true, true, 1, 25)).toBe("take")
})

test("decideAfterResponse finishes on a SUCCESS with nothing left to take", () => {
  expect(decideAfterResponse(true, false, 1, 25)).toBe("finish")
})

test("decideAfterResponse finishes on any non-SUCCESS result (e.g. inventory full)", () => {
  expect(decideAfterResponse(false, true, 1, 25)).toBe("finish")
})

test("decideAfterResponse finishes once the pass cap is reached, even with more mail", () => {
  expect(decideAfterResponse(true, true, 25, 25)).toBe("finish")
})

type TakeAllWorld = { bucket: string[]; canTry: boolean; takeAllCount: number }

function headerTuple(subject: string): readonly unknown[] {
  return [
    "Sender",
    "SenderChar",
    subject,
    "icon",
    false,
    false,
    false,
    false,
    2,
    0,
    0,
    30,
    5,
    MAIL_CATEGORY_SYSTEM_MAIL,
  ]
}

function installTakeAllWorld(world: TakeAllWorld): undefined {
  Reflect.set(globalThis, "GetNumMailItemsByCategory", (): number => world.bucket.length)
  Reflect.set(globalThis, "GetMailIdByIndex", (_cat: unknown, index: number): string =>
    String(index)
  )
  Reflect.set(globalThis, "GetMailItemInfo", (id: string): readonly unknown[] =>
    headerTuple(world.bucket[Number(id) - 1] ?? "")
  )
  Reflect.set(globalThis, "CanTryTakeAllMailAttachmentsInCategory", (): boolean => world.canTry)
  Reflect.set(globalThis, "TakeAllMailAttachmentsInCategory", (): undefined => {
    world.takeAllCount++
  })
  const noop = (): undefined => undefined
  Reflect.set(globalThis, "EVENT_MANAGER", {
    RegisterForEvent: noop,
    RegisterForUpdate: noop,
    UnregisterForEvent: noop,
    UnregisterForUpdate: noop,
  })
  Reflect.set(globalThis, "d", noop)
  Reflect.set(globalThis, "MAIL_INBOX", undefined)
  Reflect.set(globalThis, "EVENT_MAIL_TAKE_ALL_ATTACHMENTS_IN_CATEGORY_RESPONSE", 10)
  Reflect.set(globalThis, "EVENT_MAIL_INBOX_UPDATE", 4)
  Reflect.set(globalThis, "EVENT_MAIL_CLOSE_MAILBOX", 3)
  Reflect.set(globalThis, "EVENT_MAIL_OPEN_MAILBOX", 5)
}

function spyCategory(): { category: MailSourceCategory; reported: number[] } {
  const reported: number[] = []
  const category: MailSourceCategory = {
    id: "test",
    scanCategory: MAIL_CATEGORY_SYSTEM_MAIL,
    matches: (header: MailHeader): boolean => HIRELING_SUBJECTS.includes(header.subject),
    onComplete: (count: number): undefined => {
      reported.push(count)
    },
  }
  return { category, reported }
}

test("countCategoryMatches counts only headers matching the predicate", () => {
  installTakeAllWorld({
    bucket: ["Raw Blacksmith Materials", "Item Sold", "Raw Clothier Materials"],
    canTry: true,
    takeAllCount: 0,
  })
  const { category } = spyCategory()
  expect(countCategoryMatches(category)).toBe(2)
})

test("beginMailSession fires one Take All and reports the counted hireling delta on SUCCESS", () => {
  const world: TakeAllWorld = {
    bucket: ["Raw Blacksmith Materials", "Item Sold", "Raw Clothier Materials"],
    canTry: true,
    takeAllCount: 0,
  }
  installTakeAllWorld(world)
  const { category, reported } = spyCategory()
  finishSession()
  beginMailSession(category)
  expect(world.takeAllCount).toBe(1)
  world.canTry = false
  onTakeAllResponse(0, MAIL_TAKE_ATTACHMENT_RESULT_SUCCESS, MAIL_CATEGORY_SYSTEM_MAIL, true)
  expect(reported).toEqual([2])
})

test("a SUCCESS that leaves more takeable mail re-fires Take All (paging loop)", () => {
  const world: TakeAllWorld = {
    bucket: ["Raw Woodworker Materials"],
    canTry: true,
    takeAllCount: 0,
  }
  installTakeAllWorld(world)
  const { category } = spyCategory()
  finishSession()
  beginMailSession(category)
  expect(world.takeAllCount).toBe(1)
  onTakeAllResponse(0, MAIL_TAKE_ATTACHMENT_RESULT_SUCCESS, MAIL_CATEGORY_SYSTEM_MAIL, true)
  expect(world.takeAllCount).toBe(2)
})

test("a non-SUCCESS response finishes without re-firing and reports no delta", () => {
  const world: TakeAllWorld = {
    bucket: ["Raw Enchanter Materials"],
    canTry: true,
    takeAllCount: 0,
  }
  installTakeAllWorld(world)
  const { category, reported } = spyCategory()
  finishSession()
  beginMailSession(category)
  expect(world.takeAllCount).toBe(1)
  onTakeAllResponse(
    0,
    MAIL_TAKE_ATTACHMENT_RESULT_FAIL_NO_INVENTORY_SPACE,
    MAIL_CATEGORY_SYSTEM_MAIL,
    false
  )
  expect(world.takeAllCount).toBe(1)
  expect(reported).toEqual([])
})

test("a cold-open empty bucket stays armed until an inbox update delivers headers", () => {
  const world: TakeAllWorld = { bucket: [], canTry: false, takeAllCount: 0 }
  installTakeAllWorld(world)
  const { category } = spyCategory()
  finishSession()
  beginMailSession(category)
  expect(world.takeAllCount).toBe(0)
  world.bucket = ["Raw Provisioner Materials"]
  world.canTry = true
  onInboxUpdate()
  expect(world.takeAllCount).toBe(1)
})
