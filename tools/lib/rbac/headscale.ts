import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

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
