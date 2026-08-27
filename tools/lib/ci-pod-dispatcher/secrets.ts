export interface SecretRef {
  fromSecret: string
}

export interface K8sEnvVar {
  name: string
  value?: string
  valueFrom?: {
    secretKeyRef: {
      name: string
      key: string
    }
  }
}

function isSecretRef(value: string | SecretRef): value is SecretRef {
  return typeof value === "object" && "fromSecret" in value
}

export function resolveStepEnv(
  env: Record<string, string | SecretRef>,
  secretResourceName: string
): readonly K8sEnvVar[] {
  const out: K8sEnvVar[] = []
  for (const [name, value] of Object.entries(env)) {
    if (isSecretRef(value)) {
      out.push({
        name,
        valueFrom: {
          secretKeyRef: {
            name: secretResourceName,
            key: value.fromSecret,
          },
        },
      })
    } else {
      out.push({ name, value })
    }
  }
  return out
}

export function supabaseSecretEnv(secretResourceName: string): readonly K8sEnvVar[] {
  return [
    {
      name: "SUPABASE_URL",
      valueFrom: { secretKeyRef: { name: secretResourceName, key: "SUPABASE_URL" } },
    },
    {
      name: "SUPABASE_SERVICE_ROLE_KEY",
      valueFrom: { secretKeyRef: { name: secretResourceName, key: "SUPABASE_SERVICE_ROLE_KEY" } },
    },
  ]
}
