import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const packageName = "@infra/k8s"

export const profiles: NamespaceProfile[] = [
  {
    namespace: "postgres",
    roleName: "pipeline-engine-cnpg",
    rules: [
      {
        comment: "CNPG Cluster (#11608) + daily ScheduledBackup (#11723) CRs",
        apiGroups: ["postgresql.cnpg.io"],
        resources: ["clusters", "scheduledbackups"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        comment: "Barman Cloud ObjectStore CR — the backup destination (#11723)",
        apiGroups: ["barmancloud.cnpg.io"],
        resources: ["objectstores"],
        verbs: ["get", "list", "watch", "create", "update", "patch"],
      },
      {
        apiGroups: [""],
        resources: ["secrets"],
        verbs: ["get", "list", "create", "update", "patch"],
      },
    ],
  },
]
