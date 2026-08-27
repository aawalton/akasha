import { parseAllDocuments, parseDocument } from "yaml"
import type { SopsEncryptedField, YamlFileSopsDoc } from "./types.ts"

const isRecord = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null

const detectEncryptedField = (doc: Record<string, unknown>): SopsEncryptedField | null => {
  if (isRecord(doc.stringData)) return "stringData"
  if (isRecord(doc.data)) return "data"
  return null
}

export const extractManifestDocs = (yamlText: string): readonly YamlFileSopsDoc[] => {
  let docs: ReturnType<typeof parseAllDocuments>
  try {
    docs = parseAllDocuments(yamlText)
  } catch {
    return []
  }
  const out: YamlFileSopsDoc[] = []
  for (const doc of docs) {
    if (doc.errors.length > 0) continue
    let obj: unknown
    try {
      obj = doc.toJS()
    } catch {
      continue
    }
    if (!isRecord(obj)) continue
    const apiVersion = obj.apiVersion
    const kind = obj.kind
    if (typeof apiVersion !== "string" || apiVersion === "") continue
    if (typeof kind !== "string" || kind === "") continue
    const metadata = obj.metadata
    if (!isRecord(metadata)) continue
    const name = metadata.name
    if (typeof name !== "string" || name === "") continue
    const namespaceRaw = metadata.namespace
    const namespace = typeof namespaceRaw === "string" && namespaceRaw !== "" ? namespaceRaw : null
    const encryptedField = detectEncryptedField(obj)
    if (encryptedField === null) continue
    out.push({ apiVersion, kind, namespace, name, encryptedField })
  }
  return out
}

const hasItemsArray = (x: Record<string, unknown>): x is { items: readonly unknown[] } =>
  Array.isArray(x.items)

const extractKeyName = (key: unknown): string | null => {
  if (typeof key === "string") return key
  if (!isRecord(key)) return null
  const value = key.value
  return typeof value === "string" ? value : null
}

export const extractFlatKeys = (yamlText: string): readonly string[] => {
  let doc: ReturnType<typeof parseDocument>
  try {
    doc = parseDocument(yamlText)
  } catch {
    return []
  }
  if (doc.errors.length > 0) return []
  const contents: unknown = doc.contents
  if (!isRecord(contents)) return []
  if (!hasItemsArray(contents)) return []
  const out: string[] = []
  for (const item of contents.items) {
    if (!isRecord(item)) continue
    const keyName = extractKeyName(item.key)
    if (keyName === null || keyName === "" || keyName === "sops") continue
    out.push(keyName)
  }
  return out
}
