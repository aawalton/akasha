import { expect, test } from "bun:test"
import { asRecord } from "akasha/utils/narrow/as-record/as-record.module.code.ts"

test("only a plain object reads as a record", () => {
  expect(asRecord({ a: 1 })).toEqual({ a: 1 })
  expect(asRecord([1])).toBeUndefined()
  expect(asRecord(null)).toBeUndefined()
  expect(asRecord("a")).toBeUndefined()
})
