import { collectPages } from "@shared/pages-access/iterate"
import { patchPageById } from "@shared/pages-access/patch"
import { asRecord } from "../../../../shared/utils-narrow/src/as-record"
import type { DomainKey } from "@temper/catalog-core/domain-keys"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"

const CATALOG_DOMAINS: ReadonlyArray<{ savedVarKey: DomainKey; pageTitle: string }> = [
  { savedVarKey: "achievementCatalog", pageTitle: "Achievement" },
  { savedVarKey: "recipeCatalog", pageTitle: "Recipe" },
  { savedVarKey: "loreLibraryCatalog", pageTitle: "Lore Library" },
  { savedVarKey: "antiquityLoreCatalog", pageTitle: "Antiquity Lore" },
  { savedVarKey: "cadwellCatalog", pageTitle: "Cadwell" },
  { savedVarKey: "itemSetCatalog", pageTitle: "Item Set" },
  { savedVarKey: "scribingCatalog", pageTitle: "Scribing" },
  { savedVarKey: "traitResearchCatalog", pageTitle: "Trait Research" },
  { savedVarKey: "collectiblesCatalog", pageTitle: "Collectibles" },
  { savedVarKey: "tributeCatalog", pageTitle: "Tribute" },
  { savedVarKey: "zoneCompletionCatalog", pageTitle: "Zone Completion" },
  { savedVarKey: "poiCatalog", pageTitle: "POI" },
  { savedVarKey: "companionEquipmentCatalog", pageTitle: "Companion Equipment" },
  { savedVarKey: "currencyCatalog", pageTitle: "Currency" },
  { savedVarKey: "inventoryConstantsCatalog", pageTitle: "Inventory Constants" },
  { savedVarKey: "furnitureCatalog", pageTitle: "Furniture" },
  { savedVarKey: "skillCatalog", pageTitle: "Skill" },
]

const CATALOG_DOMAIN_PAGE_TYPE_SLUG = "temper-catalog-domain"

interface ParsedCatalog {
  apiVersion: string | undefined
  manifestApiVersion: number | undefined
  presentDomainKeys: ReadonlySet<string>
}

function parseCatalogSavedVariables(content: string): ParsedCatalog {
  const root = parseLuaSavedVariablesFile(content, "TemperCatalog_SavedVariables")

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("runImportCatalog: missing Default table in saved variables")
  }

  let accountWide: Record<string, unknown> | undefined
  for (const key of Object.keys(defaultTable)) {
    if (key.startsWith("@")) {
      const accountTable = asRecord(defaultTable[key])
      accountWide = asRecord(accountTable?.["$AccountWide"])
      if (accountWide) break
    }
  }

  if (!accountWide) {
    throw new Error("runImportCatalog: could not find $AccountWide in saved variables")
  }

  const apiVersionRaw = accountWide.apiVersion
  const apiVersion = typeof apiVersionRaw === "string" ? apiVersionRaw : undefined
  const manifestRaw = accountWide.manifestApiVersion
  const manifestApiVersion = typeof manifestRaw === "number" ? manifestRaw : undefined

  const presentDomainKeys = new Set<string>()
  for (const { savedVarKey } of CATALOG_DOMAINS) {
    if (accountWide[savedVarKey] !== undefined) {
      presentDomainKeys.add(savedVarKey)
    }
  }

  return { apiVersion, manifestApiVersion, presentDomainKeys }
}

export async function runImportCatalog(content: string): Promise<void> {
  const { apiVersion, manifestApiVersion, presentDomainKeys } = parseCatalogSavedVariables(content)

  if (apiVersion === undefined || manifestApiVersion === undefined) {
    console.log(
      "runImportCatalog: apiVersion / manifestApiVersion missing on $AccountWide, skipping write"
    )
    return
  }

  if (presentDomainKeys.size === 0) {
    console.log("runImportCatalog: no catalog buckets present in saved variables, skipping write")
    return
  }

  const capturedAt = new Date().toISOString()

  const rows = await collectPages({
    pageTypeSlug: CATALOG_DOMAIN_PAGE_TYPE_SLUG,
    pageSize: 1000,
  })

  const titleToId = new Map<string, string>()
  for (const row of rows) {
    const title = row.title
    const id = row.id
    if (typeof title === "string" && typeof id === "string") {
      titleToId.set(title, id)
    }
  }

  console.log(
    `runImportCatalog: apiVersion=${apiVersion}, manifestApiVersion=${manifestApiVersion}, ${presentDomainKeys.size} domain(s) present`
  )

  for (const { savedVarKey, pageTitle } of CATALOG_DOMAINS) {
    if (!presentDomainKeys.has(savedVarKey)) continue

    const pageId = titleToId.get(pageTitle)
    if (pageId === undefined) {
      console.log(`  ${pageTitle}: no temper-catalog-domain page found by title, skipping`)
      continue
    }

    await patchPageById({
      pageTypeSlug: CATALOG_DOMAIN_PAGE_TYPE_SLUG,
      id: pageId,
      set: { apiVersion, manifestApiVersion, capturedAt },
    })
    console.log(`  ${pageTitle}: patched (apiVersion=${apiVersion})`)
  }
}
