
import { describe, expect, test } from "bun:test"
import { type SizeChange, sizeLines } from "../../repo/land/land"

function line(change: SizeChange): string {
  const [only] = sizeLines([change])
  if (only === undefined) throw new Error("sizeLines returned nothing for one change")
  return only
}

describe("sizeLines", () => {
  test("a cut carries its own sign", () => {
    expect(line({ relPath: "a.md", before: 3826, after: 2414 })).toContain("(-1412)")
  })

  test("a growth is signed too, so the two never read alike", () => {
    expect(line({ relPath: "a.md", before: 100, after: 340 })).toContain("(+240)")
  })

  test("a file that did not exist counts from nothing and says which", () => {
    const only = line({ relPath: "a.md", before: null, after: 240 })
    expect(only).toContain("new")
    expect(only).toContain("(+240)")
  })

  test("a removal reports what went rather than a delta", () => {
    expect(line({ relPath: "a.md", before: 900, after: null })).toContain("900 → gone")
  })
})
