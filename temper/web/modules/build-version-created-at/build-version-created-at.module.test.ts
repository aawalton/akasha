import { expect, test } from "bun:test"
import {
  buildVersionCreatedAt,
  newestCreatedFirst,
} from "akasha/temper/web/modules/build-version-created-at/build-version-created-at.module.code.ts"

test("a version was created at the instant its page states", () => {
  const at = "2026-09-20T08:30:00.000Z"
  expect(buildVersionCreatedAt({ createdAt: at, versionNumber: 3 })).toBe(at)
})

test("a version whose page states no instant has none rather than 1970", () => {
  expect(
    buildVersionCreatedAt({ versionNumber: Date.parse("2026-09-20T08:30:00.000Z") })
  ).toBeNull()
  expect(buildVersionCreatedAt({})).toBeNull()
})

test("versions are listed newest first, with those of no instant last", () => {
  const listed = [
    { key: "none", createdAt: null },
    { key: "old", createdAt: "2026-01-01T00:00:00.000Z" },
    { key: "new", createdAt: "2026-09-01T00:00:00.000Z" },
  ].sort(newestCreatedFirst)
  expect(listed.map((one) => one.key)).toEqual(["new", "old", "none"])
})
