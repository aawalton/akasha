import { describe, expect, test } from "bun:test"
import { LIBSETS_UPSTREAM } from "./upstream-pin"
import {
  countBundleMarkers,
  parseAddOnVersion,
  type UpstreamProbe,
  verifyUpstream,
} from "./verify-upstream"

function genuine(): UpstreamProbe {
  return {
    checkedOutCommit: LIBSETS_UPSTREAM.commit,
    manifestText: [
      "## Title: LibSets",
      "## APIVersion: 101050 101051",
      `## Version: ${LIBSETS_UPSTREAM.version}`,
      `## AddOnVersion: ${LIBSETS_UPSTREAM.addOnVersion}`,
    ].join("\n"),
    missingFiles: [],
    bundleMarkerHits: 0,
    workingTreeDirty: false,
  }
}

function reasonOf(probe: UpstreamProbe): string {
  const verdict = verifyUpstream(probe, LIBSETS_UPSTREAM)
  if (verdict.ok) throw new Error("expected a rejection, got ok")
  return verdict.reason
}

describe("verifyUpstream — the positive", () => {
  test("accepts genuine upstream at the pinned commit", () => {
    expect(verifyUpstream(genuine(), LIBSETS_UPSTREAM)).toEqual({ ok: true })
  })
})

describe("verifyUpstream — the negatives it must be able to return", () => {
  test("rejects our own compiled TSTL bundle, and says so", () => {
    const reason = reasonOf({ ...genuine(), bundleMarkerHits: 622, missingFiles: [] })
    expect(reason).toContain("own compiled")
  })

  test("rejects the wrong upstream VERSION, naming both", () => {
    const reason = reasonOf({
      ...genuine(),
      manifestText: "## Version: 0.9.3\n## AddOnVersion: 0009030",
      checkedOutCommit: "76f2adab4e495f0b3ddb9884cb10c47f32e9f4b1",
    })
    expect(reason).toContain("0009030")
    expect(reason).toContain(LIBSETS_UPSTREAM.addOnVersion)
  })

  test("rejects the wrong COMMIT even when the version matches", () => {
    const reason = reasonOf({ ...genuine(), checkedOutCommit: "0".repeat(40) })
    expect(reason).toContain(LIBSETS_UPSTREAM.commit)
  })

  test("rejects a tree whose commit cannot be proved", () => {
    const reason = reasonOf({ ...genuine(), checkedOutCommit: undefined })
    expect(reason).toContain("commit")
  })

  test("rejects an incomplete tree, naming the missing files", () => {
    const reason = reasonOf({ ...genuine(), missingFiles: ["Data/LibSets_Data_Sets.lua"] })
    expect(reason).toContain("Data/LibSets_Data_Sets.lua")
  })

  test("rejects a tree with no manifest at all", () => {
    const reason = reasonOf({ ...genuine(), manifestText: undefined })
    expect(reason).toContain(LIBSETS_UPSTREAM.manifestFile)
  })

  test("rejects a manifest carrying no AddOnVersion line", () => {
    const reason = reasonOf({ ...genuine(), manifestText: "## Title: LibSets" })
    expect(reason).toContain("AddOnVersion")
  })

  test("rejects a checkout at the right commit whose bytes have been edited", () => {
    const reason = reasonOf({ ...genuine(), workingTreeDirty: true })
    expect(reason).toContain("local modifications")
  })

  test("rejects the empty tree (nothing materialized at all)", () => {
    const reason = reasonOf({
      checkedOutCommit: undefined,
      manifestText: undefined,
      missingFiles: [...LIBSETS_UPSTREAM.requiredFiles],
      bundleMarkerHits: 0,
      workingTreeDirty: false,
    })
    expect(reason.length).toBeGreaterThan(0)
  })
})

describe("parseAddOnVersion", () => {
  test("reads the manifest's AddOnVersion verbatim, zero-padding included", () => {
    expect(parseAddOnVersion("## AddOnVersion: 0009020")).toBe("0009020")
  })

  test("tolerates surrounding lines and CRLF", () => {
    expect(parseAddOnVersion("## Title: X\r\n## AddOnVersion: 0009030\r\n## Author: Y")).toBe(
      "0009030"
    )
  })

  test("returns undefined when absent", () => {
    expect(parseAddOnVersion("## Title: X")).toBeUndefined()
  })
})

describe("countBundleMarkers — the tell-tale that we are reading our own output", () => {
  test("counts every TSTL marker occurrence, not just marked lines", () => {
    expect(countBundleMarkers("____exports.a = 1; ____lualib(); ____exports.b = 2")).toBe(3)
  })

  test("finds markers that share a line", () => {
    expect(countBundleMarkers("local x = ____exports.f(____exports.g)")).toBe(2)
  })

  test("stays silent on genuine upstream Lua", () => {
    expect(countBundleMarkers("local lib = LibSets\nlib.setDataPreloaded = {}\n")).toBe(0)
  })
})

describe("the pin itself", () => {
  test("pins a full 40-character commit SHA, not a moving branch name", () => {
    expect(LIBSETS_UPSTREAM.commit).toMatch(/^[0-9a-f]{40}$/)
  })

  test("declares the data files port-data.ts loads", () => {
    expect(LIBSETS_UPSTREAM.requiredFiles).toContain("Data/LibSets_Data_Sets.lua")
    expect(LIBSETS_UPSTREAM.requiredFiles).toContain("LibSets_ConstantsLibraryInternal.lua")
  })
})
