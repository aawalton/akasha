import { z } from "zod"
import type { Repo } from "../../../../../page/document/types.ts"

export type NamespaceRoleNodeType = "namespace-role"
export type RbacDeclaresEdgeType = "rbac-declares"

export const NAMESPACE_ROLE_NODE_TYPE: NamespaceRoleNodeType = "namespace-role"
export const RBAC_DECLARES_EDGE_TYPE: RbacDeclaresEdgeType = "rbac-declares"

export const namespaceRoleKey = (namespace: string, roleName: string): string =>
  `${namespace}:${roleName}`

export type RuleAttrs = {
  readonly comment?: string
  readonly apiGroups: readonly string[]
  readonly resources: readonly string[]
  readonly verbs: readonly string[]
  readonly resourceNames?: readonly string[]
}

export type RbacDeclaration = {
  readonly packageName: string
  readonly sourcePath: string
  readonly rules: readonly RuleAttrs[]
}

export type NamespaceRoleAttrs = {
  readonly namespace: string
  readonly roleName: string
  readonly comment?: string
  readonly declarations: readonly RbacDeclaration[]
}

export type RbacDeclaresAttrs = {
  readonly sourcePath: string
  readonly rules: readonly RuleAttrs[]
}

export type DiscoveredRbacProfile = {
  readonly namespace: string
  readonly roleName: string
  readonly comment?: string
  readonly rules: readonly RuleAttrs[]
}

export type RbacData = {
  readonly repo: Repo
  readonly packageName: string
  readonly sourcePath: string
  readonly profiles: readonly DiscoveredRbacProfile[]
}

export const RuleAttrsSchema = z
  .object({
    comment: z.string().optional(),
    apiGroups: z.array(z.string()),
    resources: z.array(z.string()),
    verbs: z.array(z.string()),
    resourceNames: z.array(z.string()).optional(),
  })
  .passthrough()

export const RbacDeclarationSchema = z
  .object({
    packageName: z.string().min(1),
    sourcePath: z.string(),
    rules: z.array(RuleAttrsSchema),
  })
  .passthrough()

export const NamespaceRoleAttrsSchema = z
  .object({
    namespace: z.string().min(1),
    roleName: z.string().min(1),
    comment: z.string().optional(),
    declarations: z.array(RbacDeclarationSchema),
  })
  .passthrough()

export const RbacDeclaresAttrsSchema = z
  .object({
    sourcePath: z.string(),
    rules: z.array(RuleAttrsSchema),
  })
  .passthrough()

export const DiscoveredRbacProfileSchema = z
  .object({
    namespace: z.string().min(1),
    roleName: z.string().min(1),
    comment: z.string().optional(),
    rules: z.array(RuleAttrsSchema),
  })
  .passthrough()
