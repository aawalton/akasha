import ts from "typescript"
import type { Repo } from "../../../../../page/document/types.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { collectTopLevelStringConsts } from "./ts-literals.ts"

export const CLUSTER_RBAC_REPO: Repo = "instructions"

export const CLUSTER_RBAC_DIR = "tools/lib/cluster-rbac"

export const CLUSTER_RBAC_RULES = `${CLUSTER_RBAC_DIR}/rules.ts`

export const CLUSTER_RBAC_FORMAT = `${CLUSTER_RBAC_DIR}/yaml-format.ts`

export const CLUSTER_RBAC_COMMAND = "tools/commands/cluster-rbac-manifest.ts"

export const CLUSTER_RBAC_SOURCES: readonly string[] = [
  CLUSTER_RBAC_COMMAND,
  CLUSTER_RBAC_RULES,
  CLUSTER_RBAC_FORMAT,
]

const SA_NAME_CONST = "SA_NAME"

const SA_NAMESPACE_CONST = "SA_NAMESPACE"

const CLUSTER_ROLE_NAME_CONST = "CLUSTER_ROLE_NAME"

const CI_ROLE_NAME_CONST = "CI_ROLE_NAME"

export type ClusterRbacResource = {
  readonly kind: string
  readonly namespace: string | null
  readonly name: string
}

export type ClusterRbacEmission = {
  readonly repo: Repo
  readonly emittedBy: string
  readonly sources: readonly string[]
  readonly resources: readonly ClusterRbacResource[]
}

const constsIn = (relPath: string, text: string): ReadonlyMap<string, string> =>
  collectTopLevelStringConsts(
    ts.createSourceFile(relPath, text, ts.ScriptTarget.Latest, true)
  )

const named = (
  consts: ReadonlyMap<string, string>,
  constName: string,
  relPath: string,
  unreadable: string[]
): string | null => {
  const found = consts.get(constName)
  if (found === undefined || found === "") {
    unreadable.push(
      `${relPath} — it declares no top-level \`${constName}\` string, and the name it gives the ` +
        `resource is not recoverable from anywhere else`
    )
    return null
  }
  return found
}

export const discoverClusterRbac = (ctx: BuildContext): ClusterRbacEmission => {
  const standing = new Set(repoFiles(ctx, CLUSTER_RBAC_REPO))
  const unreadable: string[] = []
  const bodies = new Map<string, string>()

  for (const relPath of CLUSTER_RBAC_SOURCES) {
    if (!standing.has(relPath)) {
      unreadable.push(
        `${relPath} — the cluster RBAC emitter names it and no file stands there, so the ` +
          `resources it emits would go unnoticed rather than be reported missing`
      )
      continue
    }
    const text = readRepoFile(ctx, CLUSTER_RBAC_REPO, relPath)
    if (text === null) {
      unreadable.push(`${relPath} — the snapshot listed it but could not read it`)
      continue
    }
    bodies.set(relPath, text)
  }

  const rulesText = bodies.get(CLUSTER_RBAC_RULES)
  const commandText = bodies.get(CLUSTER_RBAC_COMMAND)
  const ruleConsts = rulesText === undefined ? new Map() : constsIn(CLUSTER_RBAC_RULES, rulesText)
  const commandConsts =
    commandText === undefined ? new Map() : constsIn(CLUSTER_RBAC_COMMAND, commandText)

  const saName =
    rulesText === undefined ? null : named(ruleConsts, SA_NAME_CONST, CLUSTER_RBAC_RULES, unreadable)
  const saNamespace =
    rulesText === undefined
      ? null
      : named(ruleConsts, SA_NAMESPACE_CONST, CLUSTER_RBAC_RULES, unreadable)
  const clusterRoleName =
    commandText === undefined
      ? null
      : named(commandConsts, CLUSTER_ROLE_NAME_CONST, CLUSTER_RBAC_COMMAND, unreadable)
  const ciRoleName =
    rulesText === undefined
      ? null
      : named(ruleConsts, CI_ROLE_NAME_CONST, CLUSTER_RBAC_RULES, unreadable)

  if (unreadable.length > 0) {
    throw new Error(
      `graph: the cluster RBAC the instructions repository emits could not be read out of ` +
        `${unreadable.length} file(s), and dropping them would leave the graph asserting that ` +
        `nothing there emits a resource:\n  ${unreadable.join("\n  ")}`
    )
  }

  if (saName === null || saNamespace === null || clusterRoleName === null || ciRoleName === null) {
    throw new Error(
      `graph: the cluster RBAC emitter under ${CLUSTER_RBAC_DIR} named no ServiceAccount or ` +
        `ClusterRole, and every resource it applies is one of them`
    )
  }

  return {
    repo: CLUSTER_RBAC_REPO,
    emittedBy: CLUSTER_RBAC_COMMAND,
    sources: CLUSTER_RBAC_SOURCES,
    resources: [
      { kind: "ServiceAccount", namespace: saNamespace, name: saName },
      { kind: "ClusterRole", namespace: null, name: clusterRoleName },
      { kind: "ClusterRoleBinding", namespace: null, name: clusterRoleName },
      { kind: "Role", namespace: saNamespace, name: ciRoleName },
      { kind: "RoleBinding", namespace: saNamespace, name: ciRoleName },
    ],
  }
}
