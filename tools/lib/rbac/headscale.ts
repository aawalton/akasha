import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const packageName = "@infra/k8s"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "headscale",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        apiGroups: ["apps"],
        resources: ["statefulsets", "statefulsets/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["configmaps", "secrets", "services", "namespaces", "persistentvolumeclaims"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["networking.k8s.io"],
        resources: ["networkpolicies"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["cert-manager.io"],
        resources: ["certificates"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
