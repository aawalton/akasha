import { IMAGES } from "../images.ts"
import { SECRETS, secret } from "../secrets.ts"
import type { CIContext, Step } from "../types.ts"

interface SopsDecryptApplyConfig {
  name: string
  namespace: string
  secretFile: string
}

export function sopsDecryptApply(config: SopsDecryptApplyConfig): Step {
  const { name, namespace, secretFile } = config
  return {
    name,
    image: IMAGES.CI,
    environment: {
      HOME: "/tmp",
      SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
    },
    commands: (ci: CIContext) => [
      "set -e",
      `DECRYPTED=$(sops -d ${ci.workspace}/${secretFile})`,
      `echo "$DECRYPTED" | kubectl apply --dry-run=client -n ${namespace} -f -`,
      `echo "$DECRYPTED" | kubectl apply -n ${namespace} -f -`,
    ],
    backendOptions: {
      kubernetes: { serviceAccountName: "pipeline-engine" },
    },
  }
}
