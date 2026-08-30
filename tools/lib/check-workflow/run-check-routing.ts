export const RUN_CHECK_PATH = "infra/cluster-checks/src/run-check.ts"

export const RUN_CHECK_INVOCATION = `$AKASHA_ROOT/${RUN_CHECK_PATH}`

const ROUTE_PREFIXES: readonly string[] = [
  `${RUN_CHECK_INVOCATION} `,
  `${RUN_CHECK_PATH} `,
]

function isRunCheckPath(script: string): boolean {
  return script === RUN_CHECK_PATH || script.endsWith(`/${RUN_CHECK_PATH}`)
}

export interface RoutedCheckInput {
  readonly script: string
  readonly args?: readonly string[]
}

export function routedCheckArgv({ script, args = [] }: RoutedCheckInput): readonly string[] {
  return ["bun", RUN_CHECK_INVOCATION, script, ...args]
}

export function routedCheckCommand(input: RoutedCheckInput & { readonly cwd: string }): string {
  return `cd ${input.cwd} && ${routedCheckArgv(input).join(" ")}`
}

const SCRIPT_PATH = /(?<![\w./-])((?:[\w.-]+\/)+[\w.-]+\.ts)(?![\w./-])/g

export const DECLARED_CHECK_ENTRYPOINTS: readonly { path: string; reason: string }[] = []

const declaredEntrypoints = new Set(DECLARED_CHECK_ENTRYPOINTS.map((e) => e.path))

export function isCheckScript(path: string): boolean {
  if (declaredEntrypoints.has(path)) return true
  const name = path.slice(path.lastIndexOf("/") + 1)
  return name.startsWith("check-") && name.endsWith(".ts") && !name.endsWith(".test.ts")
}

export interface CheckInvocation {
  readonly script: string
  readonly routed: boolean
}

export function findCheckInvocations(command: string): readonly CheckInvocation[] {
  const found: CheckInvocation[] = []
  for (const match of command.matchAll(SCRIPT_PATH)) {
    const script = match[1] ?? ""
    if (isRunCheckPath(script) || !isCheckScript(script)) continue
    found.push({
      script,
      routed: ROUTE_PREFIXES.some((prefix) =>
        command.slice(0, match.index).endsWith(prefix)
      ),
    })
  }
  return found
}

export function findUnjudgedScriptPaths(command: string): readonly string[] {
  const found: string[] = []
  for (const match of command.matchAll(SCRIPT_PATH)) {
    const script = match[1] ?? ""
    if (isRunCheckPath(script) || isCheckScript(script)) continue
    found.push(script)
  }
  return found
}

export interface ScannedCommand {
  readonly sourcePath: string
  readonly workflow: string
  readonly step: string
  readonly command: string
}

export interface RoutingExemption {
  readonly sourcePath: string
  readonly step: string
  readonly script: string
  readonly reason: string
}

export interface UnexaminedSourceDeclaration {
  readonly sourcePath: string
  readonly reason: string
}

export interface RoutingViolation {
  readonly kind:
    | "unrouted-invocation"
    | "missing-script"
    | "undeclared-unexamined-source"
    | "stale-exemption"
    | "stale-unexamined-declaration"
  readonly sourcePath: string
  readonly message: string
}

export interface RoutingScanInput {
  readonly commands: readonly ScannedCommand[]
  readonly scannedSources: readonly string[]
  readonly unexaminedSources: readonly string[]
  readonly exemptions: readonly RoutingExemption[]
  readonly declaredUnexamined: readonly UnexaminedSourceDeclaration[]
  readonly scriptExists: (script: string) => boolean
}

const exemptionKey = (e: { sourcePath: string; step: string; script: string }): string =>
  `${e.sourcePath}\0${e.step}\0${e.script}`

export function findRoutingViolations(input: RoutingScanInput): readonly RoutingViolation[] {
  const violations: RoutingViolation[] = []
  const scanned = new Set(input.scannedSources)
  const exemptions = new Map(input.exemptions.map((e) => [exemptionKey(e), e]))
  const matchedExemptions = new Set<string>()

  for (const scanned of input.commands) {
    for (const invocation of findCheckInvocations(scanned.command)) {
      if (!input.scriptExists(invocation.script)) {
        violations.push({
          kind: "missing-script",
          sourcePath: scanned.sourcePath,
          message:
            `${scanned.workflow} → ${scanned.step} names ${invocation.script}, which is not a file ` +
            `in the tree. The step would exit 1 without running anything.`,
        })
        continue
      }
      if (invocation.routed) continue
      const key = exemptionKey({ ...scanned, script: invocation.script })
      if (exemptions.has(key)) {
        matchedExemptions.add(key)
        continue
      }
      violations.push({
        kind: "unrouted-invocation",
        sourcePath: scanned.sourcePath,
        message:
          `${scanned.workflow} → ${scanned.step} invokes ${invocation.script} directly, so a death ` +
          `at module resolution reports as a violation of this branch. Route it through ` +
          `${RUN_CHECK_PATH}, or declare it with a reason.`,
      })
    }
  }

  const declared = new Set(input.declaredUnexamined.map((d) => d.sourcePath))
  for (const sourcePath of input.unexaminedSources) {
    if (declared.has(sourcePath)) continue
    violations.push({
      kind: "undeclared-unexamined-source",
      sourcePath,
      message:
        "is inside the scanned tree but yielded no workflow to read, so nothing here has been " +
        "checked. Declare why that is expected, or fix what stops it loading.",
    })
  }

  for (const [key, exemption] of exemptions) {
    if (matchedExemptions.has(key)) continue
    if (!scanned.has(exemption.sourcePath)) continue
    violations.push({
      kind: "stale-exemption",
      sourcePath: exemption.sourcePath,
      message: `exempts ${exemption.step} → ${exemption.script}, which the scan did not find. Remove it.`,
    })
  }

  const unexamined = new Set(input.unexaminedSources)
  for (const declaration of input.declaredUnexamined) {
    if (unexamined.has(declaration.sourcePath)) continue
    if (!scanned.has(declaration.sourcePath)) continue
    violations.push({
      kind: "stale-unexamined-declaration",
      sourcePath: declaration.sourcePath,
      message: "is declared unexaminable but was examined. Remove the declaration.",
    })
  }

  return violations
}

export function unjudgedDeclarations(input: {
  readonly scannedSources: readonly string[]
  readonly exemptions: readonly RoutingExemption[]
  readonly declaredUnexamined: readonly UnexaminedSourceDeclaration[]
}): { readonly exemptions: number; readonly unexamined: number } {
  const scanned = new Set(input.scannedSources)
  return {
    exemptions: input.exemptions.filter((e) => !scanned.has(e.sourcePath)).length,
    unexamined: input.declaredUnexamined.filter((d) => !scanned.has(d.sourcePath)).length,
  }
}

export const ROUTING_EXEMPTIONS: readonly RoutingExemption[] = []

export const DECLARED_UNEXAMINED_SOURCES: readonly UnexaminedSourceDeclaration[] = []
