import { z } from "zod"
import { nodeIdPrefix } from "../../lib/node-id.ts"

export type YamlFileSopsShape = "manifest" | "flat"

export type SopsEncryptedField = "data" | "stringData"

export type YamlFileSopsDoc = {
  readonly apiVersion: string
  readonly kind: string
  readonly namespace: string | null
  readonly name: string
  readonly encryptedField: SopsEncryptedField
}

export type YamlFileSopsAttrs = {
  readonly shape: YamlFileSopsShape
  readonly apiVersion: string | null
  readonly kind: string | null
  readonly namespace: string | null
  readonly name: string | null
  readonly encryptedField: SopsEncryptedField | null
  readonly flatKeys: readonly string[]
  readonly docs: readonly YamlFileSopsDoc[]
}

export type YamlFileAttrs = {
  readonly path: string
  readonly ext: ".yaml" | ".yml"
  readonly sops: YamlFileSopsAttrs | null
}

export type SopsDecryptsToAttrs = {
  readonly encryptedField: SopsEncryptedField
  readonly docIndex: number
}

export type YamlFileNodeType = "yaml-file"
export type YmlFileNodeType = "yml-file"
export type SopsDecryptsToEdgeType = "sops-decrypts-to"

export const YAML_FILE_NODE_TYPE: YamlFileNodeType = "yaml-file"
export const YML_FILE_NODE_TYPE: YmlFileNodeType = "yml-file"
export const YAML_FILE_NODE_TYPES = [YAML_FILE_NODE_TYPE, YML_FILE_NODE_TYPE] as const
export const SOPS_DECRYPTS_TO_EDGE_TYPE: SopsDecryptsToEdgeType = "sops-decrypts-to"

export const YAML_FILE_NODE_ID_PREFIX = nodeIdPrefix(YAML_FILE_NODE_TYPE)
export const YML_FILE_NODE_ID_PREFIX = nodeIdPrefix(YML_FILE_NODE_TYPE)

export const k8sResourceKey = (kind: string, namespace: string | null, name: string): string =>
  `${kind}/${namespace ?? ""}/${name}`

export const YamlFileSopsShapeSchema = z.enum(["manifest", "flat"])

export const SopsEncryptedFieldSchema = z.enum(["data", "stringData"])

export const YamlFileSopsDocSchema = z
  .object({
    apiVersion: z.string(),
    kind: z.string(),
    namespace: z.string().nullable(),
    name: z.string(),
    encryptedField: SopsEncryptedFieldSchema,
  })
  .passthrough()

export const YamlFileSopsAttrsSchema = z
  .object({
    shape: YamlFileSopsShapeSchema,
    apiVersion: z.string().nullable(),
    kind: z.string().nullable(),
    namespace: z.string().nullable(),
    name: z.string().nullable(),
    encryptedField: SopsEncryptedFieldSchema.nullable(),
    flatKeys: z.array(z.string()),
    docs: z.array(YamlFileSopsDocSchema),
  })
  .passthrough()

export const YamlFileAttrsSchema = z
  .object({
    path: z.string(),
    ext: z.enum([".yaml", ".yml"]),
    sops: YamlFileSopsAttrsSchema.nullable(),
  })
  .passthrough()

export const SopsDecryptsToAttrsSchema = z
  .object({
    encryptedField: SopsEncryptedFieldSchema,
    docIndex: z.number(),
  })
  .passthrough()
