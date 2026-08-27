import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const packageName = "@infra/k8s"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "cloudflared",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["configmaps", "secrets", "services", "namespaces"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["batch"],
        resources: ["cronjobs"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
