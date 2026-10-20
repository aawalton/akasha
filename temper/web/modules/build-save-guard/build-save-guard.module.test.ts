import { expect, test } from "bun:test"
import {
  buildSaveRefusal,
  refusedBuildSave,
} from "akasha/temper/web/modules/build-save-guard/build-save-guard.module.code.ts"

const ID = { key: "id", eq: "01a1f000-0000-7000-8000-000000000000" }

test("a build hash patch naming no hash it replaces is refused", () => {
  const refused = buildSaveRefusal({
    op: "patchPage",
    args: { pageTypeSlug: "character-build", where: [ID], set: { buildHash: "newer" } },
  })
  expect(refused).toContain("names none")
})

test("a build hash patch naming the hash it replaces is let through", () => {
  const refused = buildSaveRefusal({
    op: "patchPage",
    args: {
      pageTypeSlug: "companion-build",
      where: [ID, { key: "buildHash", eq: "older" }],
      set: { buildHash: "newer" },
    },
  })
  expect(refused).toBeNull()
})

test("a build patch leaving the hash alone is let through", () => {
  const refused = buildSaveRefusal({
    op: "patchPage",
    args: { pageTypeSlug: "character-build", where: [ID], set: { title: "Renamed" } },
  })
  expect(refused).toBeNull()
})

test("a patch to another page type is let through", () => {
  const refused = buildSaveRefusal({
    op: "patchPage",
    args: { pageTypeSlug: "temper-account-character", where: [ID], set: { buildHash: "x" } },
  })
  expect(refused).toBeNull()
})

test("a refused save is answered 409 and leaves the request unread", async () => {
  const request = new Request("http://temper.test/api/page-write", {
    method: "POST",
    body: JSON.stringify({
      op: "patchPages",
      args: { pageTypeSlug: "character-build", where: [ID], set: { buildHash: "newer" } },
    }),
  })
  const answered = await refusedBuildSave(request)
  expect(answered?.status).toBe(409)
  expect(request.bodyUsed).toBe(false)
})
