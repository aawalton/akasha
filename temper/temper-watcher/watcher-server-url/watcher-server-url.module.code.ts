import { z } from "zod"

type Env = Readonly<Record<string, string | undefined>>

export const DEFAULT_SERVER_URL = "https://tempereso.com"

export function serverUrlFromEnv(env: Env = process.env): string {
  return z.string().default(DEFAULT_SERVER_URL).parse(env.TEMPER_SERVER_URL)
}
