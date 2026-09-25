import { expect, test } from "bun:test"
import {
  CATALOG_DOMAIN_PAGE_TYPE_SLUG,
  catalogDomainSlug,
  isNewerCapture,
  NO_ACCOUNT_WIDE_TABLE,
  NO_CAPTURE_VERSION,
  NO_DOMAIN_PRESENT,
  newestCaptureByDomain,
  presentCatalogDomainKeys,
  runImportCatalog,
} from "akasha/temper/watcher/modules/watcher-import-catalog/watcher-import-catalog.module.code.ts"

interface Call {
  readonly slug: string
  readonly set: Record<string, unknown>
}

function recorder(answer: (slug: string) => unknown) {
  const calls: Call[] = []
  const patch = async (args: {
    pageTypeSlug: string
    where: readonly { key: string; eq: string }[]
    set: Record<string, unknown>
  }): Promise<unknown> => {
    expect(args.pageTypeSlug).toBe(CATALOG_DOMAIN_PAGE_TYPE_SLUG)
    expect(args.where.length).toBe(1)
    expect(args.where[0]?.key).toBe("slug")
    const slug = args.where[0]?.eq ?? ""
    calls.push({ slug, set: args.set })
    return answer(slug)
  }
  return { calls, patch }
}

const FIVE_DOMAINS = `
TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@aawalton"] =
        {
            ["$AccountWide"] =
            {
                ["completed"] = true,
                ["apiVersion"] = "eso.live.12.0.8.3288357",
                ["manifestApiVersion"] = 101050,
                ["lastSeenInvalidateVersion"] = 4,
                ["perf"] =
                {
                    ["ms"] = 12,
                },
                ["collectionSkips"] =
                {
                    ["a"] = "b",
                },
                ["achievementCatalog"] =
                {
                    ["1"] = "Alpha",
                },
                ["loreLibraryCatalog"] =
                {
                    ["2"] = "Beta",
                },
                ["poiCatalog"] =
                {
                },
                ["zoneCompletionCatalog"] =
                {
                    ["3"] = "Gamma",
                },
                ["skillCatalog"] =
                {
                    ["4"] = "Delta",
                },
            },
        },
    },
}
`

const TWO_ACCOUNTS = `
TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@first"] =
        {
            ["$AccountWide"] =
            {
                ["apiVersion"] = "one",
                ["manifestApiVersion"] = 1,
                ["recipeCatalog"] = { ["a"] = 1 },
            },
        },
        ["@second"] =
        {
            ["$AccountWide"] =
            {
                ["apiVersion"] = "two",
                ["manifestApiVersion"] = 2,
                ["skillCatalog"] = { ["b"] = 2 },
            },
        },
    },
}
`

const NO_VERSIONS = `
TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@aawalton"] =
        {
            ["$AccountWide"] =
            {
                ["recipeCatalog"] = { ["a"] = 1 },
            },
        },
    },
}
`

const METADATA_ONLY = `
TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@aawalton"] =
        {
            ["$AccountWide"] =
            {
                ["apiVersion"] = "one",
                ["manifestApiVersion"] = 1,
                ["completed"] = true,
                ["perf"] = { ["ms"] = 3 },
            },
        },
    },
}
`

test("a domain key becomes the slug of its catalog domain page", () => {
  expect(catalogDomainSlug("achievementCatalog")).toBe("achievement")
  expect(catalogDomainSlug("loreLibraryCatalog")).toBe("lore-library")
  expect(catalogDomainSlug("antiquityLoreCatalog")).toBe("antiquity-lore")
  expect(catalogDomainSlug("companionEquipmentCatalog")).toBe("companion-equipment")
  expect(catalogDomainSlug("inventoryConstantsCatalog")).toBe("inventory-constants")
  expect(catalogDomainSlug("zoneCompletionCatalog")).toBe("zone-completion")
  expect(catalogDomainSlug("poiCatalog")).toBe("poi")
  expect(catalogDomainSlug("classCatalog")).toBe("class")
  expect(catalogDomainSlug("companionSkillCatalog")).toBe("companion-skill")
})

test("a key outside the catalog domain list is left out, and the rest keep the declared order", () => {
  expect(
    presentCatalogDomainKeys([
      "skillCatalog",
      "perf",
      "achievementCatalog",
      "somethingElse",
      "poiCatalog",
    ])
  ).toEqual(["achievementCatalog", "poiCatalog", "skillCatalog"])
})

test("the five domains the sample capture holds each reach their own page", async () => {
  const { calls, patch } = recorder((slug) => ({ id: slug }))
  const outcome = await runImportCatalog(FIVE_DOMAINS, {
    patch,
    now: () => "2026-09-02T00:00:00.000Z",
    report: () => {},
  })
  expect(outcome.changedSlugs).toEqual([
    "achievement",
    "lore-library",
    "zone-completion",
    "poi",
    "skill",
  ])
  expect(outcome.absentSlugs).toEqual([])
  expect(outcome.skipped).toBeUndefined()
  expect(calls.map((c) => c.slug)).toEqual([...outcome.changedSlugs])
})

test("every page a run reaches is given the same three values", async () => {
  const { calls, patch } = recorder((slug) => ({ id: slug }))
  await runImportCatalog(FIVE_DOMAINS, {
    patch,
    now: () => "2026-09-02T00:00:00.000Z",
    report: () => {},
  })
  for (const call of calls) {
    expect(call.set).toEqual({
      apiVersion: "eso.live.12.0.8.3288357",
      manifestApiVersion: 101050,
      capturedAt: "2026-09-02T00:00:00.000Z",
    })
  }
})

test("every account of a capture holding two stamps the domains that account holds", async () => {
  const { calls, patch } = recorder((slug) => ({ id: slug }))
  const outcome = await runImportCatalog(TWO_ACCOUNTS, {
    patch,
    now: () => "2026-09-02T00:00:00.000Z",
    report: () => {},
  })
  expect(outcome.changedSlugs).toEqual(["recipe", "skill"])
  expect(calls).toEqual([
    {
      slug: "recipe",
      set: { apiVersion: "one", manifestApiVersion: 1, capturedAt: "2026-09-02T00:00:00.000Z" },
    },
    {
      slug: "skill",
      set: { apiVersion: "two", manifestApiVersion: 2, capturedAt: "2026-09-02T00:00:00.000Z" },
    },
  ])
})

function capturesOf(
  accounts: readonly { account: string; apiVersion?: string; manifestApiVersion?: number }[]
): string {
  const tables = accounts.map((a) => {
    const versions = [
      a.apiVersion === undefined ? "" : `["apiVersion"] = "${a.apiVersion}",`,
      a.manifestApiVersion === undefined ? "" : `["manifestApiVersion"] = ${a.manifestApiVersion},`,
    ].join(" ")
    return `["${a.account}"] = { ["$AccountWide"] = { ${versions} ["skillCatalog"] = { ["b"] = 2 }, }, },`
  })
  return `TemperCatalog_SavedVariables =\n{\n    ["Default"] =\n    {\n${tables.join("\n")}\n    },\n}\n`
}

async function skillStamp(content: string): Promise<Record<string, unknown> | undefined> {
  const { calls, patch } = recorder((slug) => ({ id: slug }))
  await runImportCatalog(content, {
    patch,
    now: () => "2026-09-02T00:00:00.000Z",
    report: () => {},
  })
  return calls.find((c) => c.slug === "skill")?.set
}

test("a domain two accounts hold is given the newer capture whichever account comes first", async () => {
  const older = { account: "@older", apiVersion: "eso.live.12.0.8.1", manifestApiVersion: 101049 }
  const newer = { account: "@newer", apiVersion: "eso.live.12.0.9.1", manifestApiVersion: 101050 }
  expect((await skillStamp(capturesOf([older, newer])))?.apiVersion).toBe("eso.live.12.0.9.1")
  expect((await skillStamp(capturesOf([newer, older])))?.apiVersion).toBe("eso.live.12.0.9.1")
})

test("an account naming no version is passed over while another account stamps the page", async () => {
  const set = await skillStamp(
    capturesOf([
      { account: "@unversioned" },
      { account: "@versioned", apiVersion: "eso.live.12.0.8.3288357", manifestApiVersion: 101050 },
    ])
  )
  expect(set?.apiVersion).toBe("eso.live.12.0.8.3288357")
  expect(set?.manifestApiVersion).toBe(101050)
})

test("a higher manifestApiVersion is newer whatever the apiVersion says", () => {
  expect(
    isNewerCapture(
      { apiVersion: "eso.live.12.0.1.1", manifestApiVersion: 101050 },
      { apiVersion: "eso.live.12.0.9.9", manifestApiVersion: 101049 }
    )
  ).toBe(true)
})

test("under one manifestApiVersion the apiVersion is weighed by its numbers rather than its letters", () => {
  const nine = { apiVersion: "eso.live.12.0.8.999", manifestApiVersion: 101050 }
  const thousand = { apiVersion: "eso.live.12.0.8.1000", manifestApiVersion: 101050 }
  expect(isNewerCapture(thousand, nine)).toBe(true)
  expect(isNewerCapture(nine, thousand)).toBe(false)
  expect(isNewerCapture(nine, nine)).toBe(false)
})

test("of captures equally new, the first the saved variables name is taken", () => {
  const first = {
    account: "@first",
    apiVersion: "same",
    manifestApiVersion: 1,
    domainKeys: ["skillCatalog"] as const,
  }
  const second = { ...first, account: "@second" }
  expect(newestCaptureByDomain([first, second])).toEqual([{ key: "skillCatalog", capture: first }])
})

test("a domain whose page came back empty is reported apart from the ones that changed", async () => {
  const { patch } = recorder((slug) => (slug === "poi" ? null : { id: slug }))
  const outcome = await runImportCatalog(FIVE_DOMAINS, {
    patch,
    now: () => "2026-09-02T00:00:00.000Z",
    report: () => {},
  })
  expect(outcome.absentSlugs).toEqual(["poi"])
  expect(outcome.changedSlugs).toEqual(["achievement", "lore-library", "zone-completion", "skill"])
})

test("an account-wide table naming no version changes no page", async () => {
  const { calls, patch } = recorder(() => ({ id: "x" }))
  const said: string[] = []
  const outcome = await runImportCatalog(NO_VERSIONS, {
    patch,
    now: () => "2026-09-02T00:00:00.000Z",
    report: (m) => said.push(m),
  })
  expect(outcome.skipped).toBe(NO_CAPTURE_VERSION)
  expect(calls).toEqual([])
  expect(said).toEqual([NO_CAPTURE_VERSION])
})

test("an account-wide table of metadata alone changes no page", async () => {
  const { calls, patch } = recorder(() => ({ id: "x" }))
  const outcome = await runImportCatalog(METADATA_ONLY, {
    patch,
    now: () => "2026-09-02T00:00:00.000Z",
    report: () => {},
  })
  expect(outcome.skipped).toBe(NO_DOMAIN_PRESENT)
  expect(calls).toEqual([])
})

test("text the parser refuses is an error rather than a quiet run", async () => {
  await expect(
    runImportCatalog("this is not lua at all", {
      patch: async () => ({ id: "x" }),
      now: () => "2026-09-02T00:00:00.000Z",
      report: () => {},
    })
  ).rejects.toThrow(NO_ACCOUNT_WIDE_TABLE)
})

test("a capture with no Default table is an error", async () => {
  await expect(
    runImportCatalog(`TemperCatalog_SavedVariables =\n{\n    ["Other"] = {},\n}\n`, {
      patch: async () => ({ id: "x" }),
      now: () => "2026-09-02T00:00:00.000Z",
      report: () => {},
    })
  ).rejects.toThrow(NO_ACCOUNT_WIDE_TABLE)
})
