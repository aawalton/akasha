import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/cluster-manifests"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "metallb-system",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        apiGroups: ["metallb.io"],
        resources: ["ipaddresspools", "l2advertisements"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["configmaps"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
