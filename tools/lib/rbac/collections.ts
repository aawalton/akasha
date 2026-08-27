import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const packageName = "@infra/k8s"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "collections",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        comment: "CronJobs",
        apiGroups: ["batch"],
        resources: ["cronjobs"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "Apply manifests (services, configmaps, secrets, PVCs)",
        apiGroups: [""],
        resources: ["services", "configmaps", "secrets", "persistentvolumeclaims"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "Read pod logs (diagnostics)",
        apiGroups: [""],
        resources: ["pods", "pods/log"],
        verbs: ["get", "list"],
      },
    ],
  },
]
