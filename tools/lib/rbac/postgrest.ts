import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const packageName = "@infra/k8s"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "postgrest",
    roleName: "pipeline-engine",
    rules: [
      {
        comment: "Deploy manifests (deployments, services, configmaps, secrets)",
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["services", "configmaps", "secrets"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["rbac.authorization.k8s.io"],
        resources: ["roles", "rolebindings"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["serviceaccounts"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
