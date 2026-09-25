import { expect, test } from "bun:test"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import {
  buildVersionCreatedAt,
  newestCreatedFirst,
} from "akasha/temper/web/modules/build-version-created-at/build-version-created-at.module.code.ts"

const NOW = Date.parse("2026-09-24T12:00:00.000Z")

const VERSION_FOUR = "019db533-f382-457e-93d6-8b217ef99d58"

test("a version with a uuid version 7 id was created at the moment in that id", () => {
  const at = Date.parse("2026-09-20T08:30:00.000Z")
  expect(buildVersionCreatedAt(uuidVersion7(at), 3, NOW)).toBe("2026-09-20T08:30:00.000Z")
})

test("a version with a version 4 id falls back to a version number that is an instant", () => {
  const at = Date.parse("2026-09-24T11:59:00.000Z")
  expect(buildVersionCreatedAt(VERSION_FOUR, at, NOW)).toBe("2026-09-24T11:59:00.000Z")
})

test("a version with neither has no instant rather than 1970", () => {
  expect(buildVersionCreatedAt(VERSION_FOUR, 3, NOW)).toBeNull()
  expect(buildVersionCreatedAt(VERSION_FOUR, 0, NOW)).toBeNull()
  expect(buildVersionCreatedAt("", 0, NOW)).toBeNull()
  expect(buildVersionCreatedAt(VERSION_FOUR, NOW + 400 * 86_400_000, NOW)).toBeNull()
  expect(buildVersionCreatedAt(VERSION_FOUR, 1e17, NOW)).toBeNull()
})

test("versions are listed newest first, with those of no instant last", () => {
  const listed = [
    { key: "none", createdAt: null },
    { key: "old", createdAt: "2026-01-01T00:00:00.000Z" },
    { key: "new", createdAt: "2026-09-01T00:00:00.000Z" },
  ].sort(newestCreatedFirst)
  expect(listed.map((one) => one.key)).toEqual(["new", "old", "none"])
})
