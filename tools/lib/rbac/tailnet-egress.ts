import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const packageName = "@infra/k8s"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "tailnet-egress",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["services", "secrets", "namespaces"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["networking.k8s.io"],
        resources: ["networkpolicies"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
