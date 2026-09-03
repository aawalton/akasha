import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@infra/eso-rig"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "eso-rig",
    roleName: "pipeline-engine",
    rules: [
      {
        comment: "Deploy the eso-rig Deployment and read its rollout status",
        apiGroups: ["apps"],
        resources: ["deployments", "deployments/status"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        comment: "Stamp the content-hash skip ConfigMap in the eso-rig namespace",
        apiGroups: [""],
        resources: ["configmaps"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
