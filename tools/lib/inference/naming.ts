export const LAUNCHD_LABEL_PREFIX = "com.alanwalton.inference."
export const CONDA_ENV_PREFIX = "inference-"

export const TRAFFIC_COP_SERVICE_NAME = "traffic-cop"

export function launchdLabel(name: string): string {
  return `${LAUNCHD_LABEL_PREFIX}${name}`
}

export function condaEnvName(name: string): string {
  return `${CONDA_ENV_PREFIX}${name}`
}

export function serviceDir(home: string, name: string): string {
  return `${home}/inference/${name}`
}

export function plistPath(home: string, name: string): string {
  return `${home}/Library/LaunchAgents/${launchdLabel(name)}.plist`
}
