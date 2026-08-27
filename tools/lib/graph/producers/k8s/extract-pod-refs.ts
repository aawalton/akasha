import {
  parseMappingLine,
  type RawLine,
  resolveMappingPath,
  unquote,
} from "@infra/k8s-types/k8s-manifest-walker"

export type NamedRef = {
  readonly name: string
  readonly line: number
}

export type PodSpec = {
  readonly startIndex: number
  readonly endIndex: number
  readonly indent: number
}

const POD_TEMPLATE_PATHS = new Map<string, readonly string[]>([
  ["Deployment", ["spec", "template", "spec"]],
  ["StatefulSet", ["spec", "template", "spec"]],
  ["DaemonSet", ["spec", "template", "spec"]],
  ["Job", ["spec", "template", "spec"]],
  ["CronJob", ["spec", "jobTemplate", "spec", "template", "spec"]],
])

export function podTemplateSpec(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number },
  kind: string
): PodSpec | null {
  const path = POD_TEMPLATE_PATHS.get(kind)
  if (path === undefined) return null
  const block = resolveMappingPath(lines, span, path)
  if (block === null) return null
  return { startIndex: block.startIndex, endIndex: block.endIndex, indent: block.indent }
}

function readMappingLine(stripped: string): { key: string; value: string | undefined } | null {
  const trimmed = stripped.trimStart()
  const candidate = trimmed.startsWith("- ") ? trimmed.slice(2).trim() : trimmed
  return parseMappingLine(candidate)
}

function topLevelMapping(
  lines: readonly RawLine[],
  podSpec: PodSpec,
  key: string
): NamedRef | null {
  for (let i = podSpec.startIndex; i < podSpec.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent !== podSpec.indent) continue
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (parsed.key !== key) continue
    if (parsed.value === undefined) continue
    return { name: unquote(parsed.value), line: ln.lineNumber }
  }
  return null
}

export function findTriggerChildRefs(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number },
  triggerKey: string,
  childKey: string
): readonly NamedRef[] {
  const out: NamedRef[] = []
  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    const parsed = readMappingLine(ln.stripped)
    if (parsed === null) continue
    if (parsed.key !== triggerKey) continue
    if (parsed.value !== undefined) continue
    const parentIndent = ln.indent
    for (let j = i + 1; j < span.endIndex; j++) {
      const sub = lines[j]
      if (sub === undefined) continue
      if (sub.blank) continue
      if (sub.indent <= parentIndent) break
      const subParsed = readMappingLine(sub.stripped)
      if (subParsed === null) continue
      if (subParsed.key === childKey && subParsed.value !== undefined) {
        out.push({ name: unquote(subParsed.value), line: sub.lineNumber })
        break
      }
    }
  }
  return out
}

export function extractServiceAccountName(
  lines: readonly RawLine[],
  podSpec: PodSpec
): NamedRef | null {
  return topLevelMapping(lines, podSpec, "serviceAccountName")
}

export function extractImagePullSecrets(
  lines: readonly RawLine[],
  podSpec: PodSpec
): readonly NamedRef[] {
  const out: NamedRef[] = []
  let parentIdx = -1
  for (let i = podSpec.startIndex; i < podSpec.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent !== podSpec.indent) continue
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (parsed.key !== "imagePullSecrets") continue
    if (parsed.value !== undefined) continue
    parentIdx = i
    break
  }
  if (parentIdx === -1) return out
  const parentIndent = podSpec.indent
  let itemIndent = -1
  for (let j = parentIdx + 1; j < podSpec.endIndex; j++) {
    const ln = lines[j]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent < parentIndent) break
    const trimmed = ln.stripped.trimStart()
    if (ln.indent === parentIndent && !trimmed.startsWith("- ")) break
    if (trimmed.startsWith("- ")) {
      itemIndent = ln.indent
      break
    }
  }
  if (itemIndent === -1) return out
  for (let j = parentIdx + 1; j < podSpec.endIndex; j++) {
    const ln = lines[j]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent < itemIndent) break
    if (ln.indent !== itemIndent) continue
    const trimmed = ln.stripped.trimStart()
    if (!trimmed.startsWith("- ")) {
      if (itemIndent === parentIndent) break
      continue
    }
    const parsed = parseMappingLine(trimmed.slice(2).trim())
    if (parsed === null) continue
    if (parsed.key === "name" && parsed.value !== undefined) {
      out.push({ name: unquote(parsed.value), line: ln.lineNumber })
    }
  }
  return out
}

export function extractVolumeConfigMaps(
  lines: readonly RawLine[],
  podSpec: PodSpec
): readonly NamedRef[] {
  return findTriggerChildRefs(lines, podSpec, "configMap", "name")
}

export function extractVolumeSecrets(
  lines: readonly RawLine[],
  podSpec: PodSpec
): readonly NamedRef[] {
  return findTriggerChildRefs(lines, podSpec, "secret", "secretName")
}

export function extractVolumePvcs(
  lines: readonly RawLine[],
  podSpec: PodSpec
): readonly NamedRef[] {
  return findTriggerChildRefs(lines, podSpec, "persistentVolumeClaim", "claimName")
}

export function extractEnvFromConfigMaps(
  lines: readonly RawLine[],
  podSpec: PodSpec
): readonly NamedRef[] {
  return findTriggerChildRefs(lines, podSpec, "configMapRef", "name")
}

export function extractEnvFromSecrets(
  lines: readonly RawLine[],
  podSpec: PodSpec
): readonly NamedRef[] {
  return findTriggerChildRefs(lines, podSpec, "secretRef", "name")
}

export function extractEnvValueFromConfigMaps(
  lines: readonly RawLine[],
  podSpec: PodSpec
): readonly NamedRef[] {
  return findTriggerChildRefs(lines, podSpec, "configMapKeyRef", "name")
}

export function extractEnvValueFromSecrets(
  lines: readonly RawLine[],
  podSpec: PodSpec
): readonly NamedRef[] {
  return findTriggerChildRefs(lines, podSpec, "secretKeyRef", "name")
}
