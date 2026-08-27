import { MARKDOWN, pageFileIn } from "../../page/page-file.ts"
import { placeDirOf } from "../../page/page-types.ts"
import { RESTART_EXIT } from "./service-wrapper/command.ts"

export interface ServiceDoc {
  readonly slug: string
  readonly root: string
  readonly description: string
  readonly runs: readonly string[]
  readonly enabled: boolean
  readonly schedule: string | null
  readonly jitterSeconds: number | null
  readonly catchUp: boolean
  readonly accuracySeconds: number | null
  readonly restartDelaySeconds: number | null
  readonly restart: string | null
  readonly successExitStatus: number | null
  readonly restartForceExitStatus: number | null
  readonly startLimitIntervalSeconds: number | null
  readonly bootDelaySeconds: number | null
  readonly intervalSeconds: number | null
  readonly startTimeoutSeconds: number | null
  readonly stopTimeoutSeconds: number | null
  readonly killMode: string | null
  readonly needsSecrets: boolean
  readonly scope: string
  readonly after: readonly string[]
  readonly wants: readonly string[]
  readonly partOf: string | null
  readonly wantedBy: string | null
  readonly stops: readonly string[]
  readonly restartsOn: readonly string[]
  readonly nice: number | null
  readonly port: number | null
  readonly namespace: string | null
}

const PATH_ENV = "%h/.bun/bin:%h/.local/bin:/home/linuxbrew/.linuxbrew/bin:/usr/local/bin:/usr/bin:/bin"
const WRAPPER_RUNS = "bun tools/service-wrapper.ts"
const SIGTERM_EXIT = 143
export const GENERATED_PREFIX = "# Generated from domains/services/"
const GENERATED = `${GENERATED_PREFIX}<slug>.md by ops service install. Edits here are lost.`

function onCalendar(doc: ServiceDoc): string | null {
  return doc.schedule !== null && doc.schedule.trim() !== "" ? doc.schedule.trim() : null
}

export function isScheduled(doc: ServiceDoc): boolean {
  return onCalendar(doc) !== null || doc.intervalSeconds !== null
}

export function isSystemScoped(doc: ServiceDoc): boolean {
  return doc.scope === "system"
}

export function startsNow(doc: ServiceDoc): boolean {
  if (isScheduled(doc)) return true
  return doc.wantedBy === null || doc.wantedBy === "default.target"
}

export function documentPath(doc: ServiceDoc): string {
  const place = placeDirOf("workstation-service")
  return pageFileIn(doc.root, place, doc.slug) ?? `${place}/${doc.slug}${MARKDOWN}`
}

function checkoutPath(doc: ServiceDoc): string {
  return isSystemScoped(doc) ? doc.root : "%h/repos/akasha"
}

function described(doc: ServiceDoc): string {
  const one = doc.description
  return one.charAt(0).toUpperCase() + one.substring(1)
}

function header(slug: string): string {
  return GENERATED.replace("<slug>", slug)
}

export function isWrapped(doc: ServiceDoc): boolean {
  if (isScheduled(doc)) return false
  return doc.runs.some((one) => /(^|\s)\S+\.ts(\s|$)/.test(one))
}

export function underWrapper(doc: ServiceDoc, command: string): string {
  if (isScheduled(doc)) return command
  if (!/(^|\s)\S+\.ts(\s|$)/.test(command)) return command
  const also = doc.restartsOn.map((one) => `--also "${one}" `).join("")
  return `${WRAPPER_RUNS} ${also}-- ${command}`
}

function wrapped(doc: ServiceDoc, one: string, underWrap: boolean): string {
  const lenient = one.startsWith("-")
  const command = lenient ? one.slice(1) : one
  const run = underWrap ? underWrapper(doc, command) : command
  const inner = doc.needsSecrets
    ? `set -a; [ -f "%h/.secrets.env" ] && . "%h/.secrets.env"; exec ${run}`
    : `exec ${run}`
  return `${lenient ? "-" : ""}/usr/bin/env bash -c '${inner}'`
}

export function execLines(doc: ServiceDoc): readonly string[] {
  return doc.runs.map((one) => `ExecStart=${wrapped(doc, one, true)}`)
}

export function stopLines(doc: ServiceDoc): readonly string[] {
  return doc.stops.map((one) => `ExecStop=${wrapped(doc, one, false)}`)
}

export function serviceUnitText(doc: ServiceDoc): string {
  const scheduled = isScheduled(doc)
  const checkout = checkoutPath(doc)
  const lines: string[] = [
    header(doc.slug),
    "",
    "[Unit]",
    `Description=${described(doc)}`,
    `Documentation=file://${checkout}/${documentPath(doc)}`,
    ...doc.after.map((one) => `After=${one}`),
    ...doc.wants.map((one) => `Wants=${one}`),
    ...(doc.partOf === null ? [] : [`PartOf=${doc.partOf}`]),
    ...(doc.startLimitIntervalSeconds === null
      ? []
      : [`StartLimitIntervalSec=${doc.startLimitIntervalSeconds}`]),
    "",
    "[Service]",
    `Type=${scheduled ? "oneshot" : "simple"}`,
    `WorkingDirectory=${checkout}`,
    `Environment=PATH=${PATH_ENV}`,
    `Environment=INSTRUCTIONS_ROOT=${checkout}`,
    ...execLines(doc),
    ...stopLines(doc),
  ]

  if (doc.nice !== null) lines.push(`Nice=${doc.nice}`)
  if (doc.startTimeoutSeconds !== null) lines.push(`TimeoutStartSec=${doc.startTimeoutSeconds}`)
  if (doc.stopTimeoutSeconds !== null) lines.push(`TimeoutStopSec=${doc.stopTimeoutSeconds}`)
  if (doc.killMode !== null) lines.push(`KillMode=${doc.killMode}`)

  if (!scheduled) {
    lines.push(`Restart=${doc.restart ?? "always"}`)
    if (doc.restartDelaySeconds !== null) lines.push(`RestartSec=${doc.restartDelaySeconds}`)
    lines.push(`SuccessExitStatus=${doc.successExitStatus ?? SIGTERM_EXIT}`)
    const forced = [
      ...(doc.restartForceExitStatus === null ? [] : [doc.restartForceExitStatus]),
      ...(isWrapped(doc) ? [RESTART_EXIT] : []),
    ]
    if (forced.length > 0) lines.push(`RestartForceExitStatus=${forced.join(" ")}`)
    lines.push("", "[Install]", `WantedBy=${doc.wantedBy ?? "default.target"}`)
  }

  return `${lines.join("\n")}\n`
}

export function timerUnitText(doc: ServiceDoc): string | null {
  if (!isScheduled(doc)) return null

  const lines: string[] = [
    header(doc.slug),
    "",
    "[Unit]",
    `Description=${described(doc)}`,
    `Documentation=file://${checkoutPath(doc)}/${documentPath(doc)}`,
    "",
    "[Timer]",
  ]

  if (doc.bootDelaySeconds !== null) lines.push(`OnBootSec=${doc.bootDelaySeconds}s`)
  const calendar = onCalendar(doc)
  if (calendar !== null) lines.push(`OnCalendar=${calendar}`)
  if (doc.intervalSeconds !== null) lines.push(`OnUnitActiveSec=${doc.intervalSeconds}s`)
  if (doc.jitterSeconds !== null) lines.push(`RandomizedDelaySec=${doc.jitterSeconds}`)
  if (doc.accuracySeconds !== null) lines.push(`AccuracySec=${doc.accuracySeconds}s`)
  if (doc.catchUp) lines.push("Persistent=true")

  lines.push("", "[Install]", "WantedBy=timers.target")

  return `${lines.join("\n")}\n`
}

export function unitFileNames(doc: ServiceDoc): readonly string[] {
  return isScheduled(doc) ? [`${doc.slug}.service`, `${doc.slug}.timer`] : [`${doc.slug}.service`]
}

export function installedUnitName(doc: ServiceDoc): string {
  return isScheduled(doc) ? `${doc.slug}.timer` : `${doc.slug}.service`
}
