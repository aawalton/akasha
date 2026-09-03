import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const packageName = "@akasha/temper-web"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "temper",
    roleName: "pipeline-engine-deploy",
    rules: [
      {
        comment: "Deployment rollouts",
        apiGroups: ["apps"],
        resources: ["deployments"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: ["apps"],
        resources: ["deployments/scale"],
        verbs: ["get", "patch"],
      },
      {
        apiGroups: ["apps"],
        resources: ["deployments/status"],
        verbs: ["get"],
      },
      {
        comment: "Apply manifests (services, configmaps, secrets, PVCs, statefulsets)",
        apiGroups: [""],
        resources: ["services", "configmaps", "secrets", "persistentvolumeclaims"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        apiGroups: ["apps"],
        resources: ["statefulsets"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        comment: "Migration jobs",
        apiGroups: ["batch"],
        resources: ["jobs"],
        verbs: ["get", "list", "create", "delete", "watch"],
      },
      {
        comment: "CronJobs",
        apiGroups: ["batch"],
        resources: ["cronjobs"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
      {
        comment: "Read pod logs (migration failure diagnostics)",
        apiGroups: [""],
        resources: ["pods", "pods/log"],
        verbs: ["get", "list"],
      },
    ],
  },
]
