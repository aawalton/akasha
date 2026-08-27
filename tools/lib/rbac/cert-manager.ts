import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const packageName = "@infra/k8s"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "cert-manager",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        apiGroups: [""],
        resources: ["secrets", "configmaps"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
