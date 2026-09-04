import { expect, test } from "bun:test"
import {
  CATALOG_DOMAIN_PAGE_TYPE_SLUG,
  catalogDomainSlug,
  NO_ACCOUNT_WIDE_TABLE,
  NO_CAPTURE_VERSION,
  NO_DOMAIN_PRESENT,
  presentCatalogDomainKeys,
  runImportCatalog,
} from "./watcher-import-catalog.module.code.ts"

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

test("the first account of a capture holding two is the one read", async () => {
  const { calls, patch } = recorder((slug) => ({ id: slug }))
  const outcome = await runImportCatalog(TWO_ACCOUNTS, {
    patch,
    now: () => "2026-09-02T00:00:00.000Z",
    report: () => {},
  })
  expect(outcome.changedSlugs).toEqual(["recipe"])
  expect(calls[0]?.set.apiVersion).toBe("one")
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
