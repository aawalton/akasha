type Env = Readonly<Record<string, string | undefined>>

export const DEFAULT_SERVER_URL = "https://tempereso.com"

export function serverUrlFromEnv(env: Env = process.env): string {
  const set = env.TEMPER_SERVER_URL
  return set === undefined || set === "" ? DEFAULT_SERVER_URL : set
}
