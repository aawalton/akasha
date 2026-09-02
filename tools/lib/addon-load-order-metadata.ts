import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { askComposed } from "@shared/pages-query/ask"
import {
  type AddonManifest,
  addonManifestSchema,
} from "@akasha/temper-addons-resolve/addon-json"

const CATALOG_DOMAIN_PAGE_TYPE_SLUG = "temper-catalog-domain"
const CATALOG_PROP_GEN_RAN_FOR_MANIFEST_API_VERSION = "generator-ran-for-manifest-api-version"
const CATALOG_PROP_DORMANT = "dormant"

function asNumberOrUndefined(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.length > 0) {
    const n = Number(value)
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback
}

function asBoolean(value: unknown): boolean {
  if (value === true) return true
  if (typeof value === "string") return value === "true"
  return false
}

export async function computeCatalogApiVersion(): Promise<string> {
  const asked = await askComposed({
    "page-type": CATALOG_DOMAIN_PAGE_TYPE_SLUG,
    keys: ["id", "title", CATALOG_PROP_DORMANT, CATALOG_PROP_GEN_RAN_FOR_MANIFEST_API_VERSION],
  })
  if (!asked.ok) {
    throw new Error(
      `computeCatalogApiVersion: reading ${CATALOG_DOMAIN_PAGE_TYPE_SLUG} pages: ${asked.why}`
    )
  }
  const rows = asked.answer.rows.map((row) => row.values)

  const active = rows.filter((r) => !asBoolean(r[CATALOG_PROP_DORMANT]))
  if (active.length === 0) {
    throw new Error(
      `computeCatalogApiVersion: no active ${CATALOG_DOMAIN_PAGE_TYPE_SLUG} pages found — every active domain must declare ${CATALOG_PROP_GEN_RAN_FOR_MANIFEST_API_VERSION}`
    )
  }

  const missing: string[] = []
  const manifestVersions: number[] = []
  for (const row of active) {
    const v = asNumberOrUndefined(row[CATALOG_PROP_GEN_RAN_FOR_MANIFEST_API_VERSION])
    if (v === undefined) {
      missing.push(asString(row.title, asString(row.id, "<unknown>")))
      continue
    }
    manifestVersions.push(v)
  }
  if (missing.length > 0) {
    throw new Error(
      `computeCatalogApiVersion: ${missing.length} active ${CATALOG_DOMAIN_PAGE_TYPE_SLUG} page(s) missing ${CATALOG_PROP_GEN_RAN_FOR_MANIFEST_API_VERSION}: ${missing.join(", ")}`
    )
  }

  return String(Math.min(...manifestVersions))
}

export async function readAdditionalLuaFiles(addonDir: string): Promise<readonly string[]> {
  const config = await loadAddonConfig(addonDir)
  return config?.additionalLuaFiles ?? []
}

interface ManifestLineInputs {
  readonly metadataHeader: string
  readonly buildIdFile?: string
  readonly additionalLuaFiles: readonly string[]
  readonly xmlBeforeBundle?: readonly string[]
  readonly xmlAfterBundle?: readonly string[]
  readonly luaPaths: readonly string[]
  readonly addonName: string
  readonly nameXmlExists: boolean
  readonly bindingsXmlExists: boolean
}

export function buildManifestLines(inputs: ManifestLineInputs): readonly string[] {
  const lines: string[] = [
    inputs.metadataHeader,
    "",
    ...(inputs.buildIdFile !== undefined ? [inputs.buildIdFile] : []),
    ...inputs.additionalLuaFiles,
    ...(inputs.xmlBeforeBundle ?? []),
    ...inputs.luaPaths,
    ...(inputs.xmlAfterBundle ?? []),
  ]
  if (inputs.nameXmlExists) lines.push(`${inputs.addonName}.xml`)
  if (inputs.bindingsXmlExists) lines.push("Bindings.xml")
  return lines
}

export async function readXmlFiles(addonDir: string): Promise<{
  readonly beforeBundle: readonly string[]
  readonly afterBundle: readonly string[]
}> {
  const config = await loadAddonConfig(addonDir)
  return {
    beforeBundle: config?.xmlFiles?.beforeBundle ?? [],
    afterBundle: config?.xmlFiles?.afterBundle ?? [],
  }
}

export async function loadAddonConfig(addonDir: string): Promise<AddonManifest | null> {
  const configPath = join(addonDir, "addon.json")
  try {
    const content = await readFile(configPath, "utf-8")
    return addonManifestSchema.parse(JSON.parse(content))
  } catch {
    return null
  }
}

export function normalizeDependency(dep: string): string {
  const sep = ">="
  const i = dep.indexOf(sep)
  if (i === -1) return dep
  const name = dep.slice(0, i)
  const version = dep.slice(i + sep.length)
  if (!/^\d+$/.test(version)) return dep
  const stripped = version.replace(/^0+(?=\d)/, "")
  if (stripped === "0") return name
  return `${name}${sep}${stripped}`
}

export async function readMetadataHeader(addonName: string, addonDir: string): Promise<string> {
  const config = await loadAddonConfig(addonDir)

  if (config) {
    let apiVersionLine: string
    if (addonName === "TemperCatalog") {
      const computed = await computeCatalogApiVersion()
      apiVersionLine = `## APIVersion: ${computed}`
    } else {
      if (config.apiVersion === undefined || config.apiVersion.length === 0) {
        throw new Error(
          `readMetadataHeader: ${addonName}/addon.json must declare a non-empty 'apiVersion' array`
        )
      }
      apiVersionLine = `## APIVersion: ${config.apiVersion.join(" ")}`
    }

    const lines = [
      `## Title: ${config.title}`,
      `## Description: ${config.description}`,
      `## Author: ${config.author}`,
      `## Version: ${config.version}`,
      `## AddOnVersion: ${config.addonVersion}`,
      apiVersionLine,
    ]
    if (config.savedVariables.length > 0) {
      lines.push(`## SavedVariables: ${config.savedVariables.join(" ")}`)
    }
    if (config.dependsOn.length > 0) {
      lines.push(`## DependsOn: ${config.dependsOn.map(normalizeDependency).join(" ")}`)
    }
    if (config.optionalDependsOn && config.optionalDependsOn.length > 0) {
      lines.push(
        `## OptionalDependsOn: ${config.optionalDependsOn.map(normalizeDependency).join(" ")}`
      )
    }
    return lines.join("\n")
  }

  throw new Error(`No addon.json found for ${addonName}`)
}
