
import { readdirSync, readFileSync } from "node:fs"
import { type Frontmatter, listField, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { fileStemOf } from "../../page/name/name"
import {
  installedUnitName,
  isSystemScoped,
  startsNow,
  type ServiceDoc,
  serviceUnitText,
  timerUnitText,
} from "./service-unit.ts"

const SERVICES_DIRS = ["pages/workstation-service", "domains/services"]
const DEFINITION = /^- \*\*[^*]+\*\*\s+—\s+(.+?)\s*$/m

export class ServiceDocRefused extends Error {}
export class NothingRead extends Error {}

export function descriptionOf(body: string): string | null {
  const found = body.match(DEFINITION)
  return found === null ? null : (found[1] as string)
}

function numberField(fm: Frontmatter, key: string): number | null {
  const raw = textField(fm, key)
  if (raw === null) return null
  const read = Number(raw)
  return Number.isFinite(read) ? read : null
}

function booleanField(fm: Frontmatter, key: string, fallback: boolean): boolean {
  const raw = textField(fm, key)
  return raw === null ? fallback : raw === "true"
}

export function readServiceDoc(root: string, slug: string, body: string): ServiceDoc {
  const fm = parseFrontmatter(body)
  if (fm.error !== null) throw new ServiceDocRefused(`${slug}: ${fm.error}`)

  const runs = listField(fm, "runs")
  if (runs.length === 0) {
    throw new ServiceDocRefused(`${slug}: states no runs, so the unit would execute nothing`)
  }

  const description = descriptionOf(body)
  if (description === null) {
    throw new ServiceDocRefused(`${slug}: carries no Definition bullet to describe the unit with`)
  }

  const scope = textField(fm, "scope") ?? "user"
  if (scope !== "user" && scope !== "system") {
    throw new ServiceDocRefused(`${slug}: states scope \`${scope}\`, which is neither user nor system`)
  }

  return {
    slug,
    root,
    description,
    runs,
    enabled: booleanField(fm, "enabled", true),
    schedule: textField(fm, "schedule"),
    jitterSeconds: numberField(fm, "jitter-seconds"),
    catchUp: booleanField(fm, "catch-up", false),
    accuracySeconds: numberField(fm, "accuracy-seconds"),
    restartDelaySeconds: numberField(fm, "restart-delay-seconds"),
    restart: textField(fm, "restart"),
    successExitStatus: numberField(fm, "success-exit-status"),
    restartForceExitStatus: numberField(fm, "restart-force-exit-status"),
    startLimitIntervalSeconds: numberField(fm, "start-limit-interval-seconds"),
    bootDelaySeconds: numberField(fm, "boot-delay-seconds"),
    intervalSeconds: numberField(fm, "interval-seconds"),
    startTimeoutSeconds: numberField(fm, "start-timeout-seconds"),
    stopTimeoutSeconds: numberField(fm, "stop-timeout-seconds"),
    killMode: textField(fm, "kill-mode"),
    needsSecrets: booleanField(fm, "needs-secrets", true),
    scope,
    after: listField(fm, "after"),
    wants: listField(fm, "wants"),
    partOf: textField(fm, "part-of"),
    wantedBy: textField(fm, "wanted-by"),
    stops: listField(fm, "stops"),
    restartsOn: listField(fm, "restarts-on"),
    nice: numberField(fm, "nice"),
    port: numberField(fm, "port"),
    namespace: textField(fm, "namespace"),
  }
}

export function readServiceDocs(root: string): readonly ServiceDoc[] {
  const docs = new Map<string, ServiceDoc>()
  for (const where of SERVICES_DIRS) {
    const dir = `${root}/${where}`
    let names: readonly string[]
    try {
      names = readdirSync(dir).filter((one) => one.endsWith(".md"))
    } catch {
      continue
    }
    for (const name of names) {
      const slug = fileStemOf(name)
      if (docs.has(slug)) continue
      docs.set(slug, readServiceDoc(root, slug, readFileSync(`${dir}/${name}`, "utf8")))
    }
  }
  return [...docs.values()].sort((a, b) => a.slug.localeCompare(b.slug))
}

export interface Projection {
  readonly write: ReadonlyMap<string, string>
  readonly enable: readonly string[]
  readonly enableIdle: readonly string[]
  readonly remove: readonly string[]
  readonly held: readonly string[]
}

export function planProjection(
  docs: readonly ServiceDoc[],
  installed: readonly string[],
  scope: string = "user"
): Projection {
  if (docs.length === 0) {
    throw new NothingRead(
      "no service document was read, so nothing here can say which units should stand"
    )
  }

  const write = new Map<string, string>()
  const enable: string[] = []
  const enableIdle: string[] = []
  const held: string[] = []

  for (const doc of docs) {
    if ((isSystemScoped(doc) ? "system" : "user") !== scope) continue
    if (!doc.enabled) {
      held.push(doc.slug)
      continue
    }
    write.set(`${doc.slug}.service`, serviceUnitText(doc))
    const timer = timerUnitText(doc)
    if (timer !== null) write.set(`${doc.slug}.timer`, timer)
    ;(startsNow(doc) ? enable : enableIdle).push(installedUnitName(doc))
  }

  const ours = new Set(write.keys())
  const remove = [...installed].filter((one) => !ours.has(one)).sort()

  return { write, enable, enableIdle, remove, held }
}

export function serviceNamed(root: string, slug: string): ServiceDoc {
  const docs = readServiceDocs(root)
  const found = docs.find((one) => one.slug === slug)
  if (found === undefined) {
    throw new ServiceDocRefused(
      `no service document is named \`${slug}\`. There: ${docs.map((one) => one.slug).join(", ")}`
    )
  }
  return found
}
