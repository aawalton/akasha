import { expect, test } from "bun:test"
import { mapBuildRow } from "akasha/temper/player/character/build/build-support/modules/build-row/build-row.module.code.ts"

const noMetadata = () => null

test("a build was created at the instant its page states", () => {
  const at = "2026-09-20T08:30:00.000Z"
  expect(mapBuildRow({ createdAt: at }, noMetadata).createdAt).toBe(Date.parse(at))
})

test("a build whose page states no instant has no creation time rather than 1970", () => {
  expect(mapBuildRow({}, noMetadata).createdAt).toBeNull()
})
