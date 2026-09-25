import { expect, test } from "bun:test"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import { mapBuildRow } from "akasha/temper/player/character/build/build-support/modules/build-row/build-row.module.code.ts"

const noMetadata = () => null

test("a build with a uuid version 7 id was created at the moment in that id", () => {
  const at = Date.parse("2026-09-20T08:30:00.000Z")
  expect(mapBuildRow({ id: uuidVersion7(at) }, noMetadata).createdAt).toBe(at)
})

test("a build whose id holds no moment has no creation time rather than 1970", () => {
  expect(mapBuildRow({ id: "88520d35-5c3f-4543-a3fe-a151bd84736a" }, noMetadata).createdAt).toBeNull()
  expect(mapBuildRow({}, noMetadata).createdAt).toBeNull()
})
