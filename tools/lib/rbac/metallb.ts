import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const packageName = "@infra/k8s"

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
