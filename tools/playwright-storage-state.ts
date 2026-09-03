export const tool = {
  summary:
    "Sign the browser-test user in and write the Playwright storage state the browser MCP is seeded with",
  path: "browser-test storage-state",
} as const

import { chmodSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { buildBrowserLaunchEnv } from "@akasha/browser-launch-env"
import { playwrightStorageStatePath } from "@akasha/seat-system/mcp-registry"
import { isInvalidCredentialsError, signInWithPassword } from "@akasha/supabase-auth/auth"
import { assertCredentialPathAllowed } from "@akasha/supabase-auth/protected-user"
import { createClient } from "@akasha/supabase-client/user-client"
import {
  DEFAULT_THROWAWAY_EMAIL,
  ensureThrowawayUser,
} from "@akasha/supabase-server/throwaway-user"
import { shape } from "@akasha/utils-narrow/shape"
import { chromium } from "playwright-core"

const NAVIGATION_TIMEOUT_MS = 60_000

const EnvShape = shape.object({
  BROWSER_TEST_URL: shape.string().url(),
  BROWSER_TEST_EMAIL: shape.string().min(1),
  BROWSER_TEST_PASSWORD: shape.string().min(1),
  SUPABASE_URL: shape.string().url(),
  SUPABASE_ANON_KEY: shape.string().min(1),
})

export async function exportPlaywrightStorageState(): Promise<string> {
  const env = EnvShape.parse(process.env)
  const baseUrl = env.BROWSER_TEST_URL.replace(/\/+$/, "")
  const storageStatePath = playwrightStorageStatePath()

  const authClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  let signIn = await signInWithPassword(
    authClient,
    env.BROWSER_TEST_EMAIL,
    env.BROWSER_TEST_PASSWORD
  )

  const selfHealable =
    signIn.error != null &&
    env.BROWSER_TEST_EMAIL === DEFAULT_THROWAWAY_EMAIL &&
    isInvalidCredentialsError(signIn.error)
  if (selfHealable) {
    console.warn(
      `sign-in failed (${signIn.error?.message}); self-healing the browser-test password to the env value and retrying once`
    )
    await ensureThrowawayUser({
      email: env.BROWSER_TEST_EMAIL,
      password: env.BROWSER_TEST_PASSWORD,
      resetPassword: true,
      acknowledgeCanonicalRotation: true,
    })
    signIn = await signInWithPassword(authClient, env.BROWSER_TEST_EMAIL, env.BROWSER_TEST_PASSWORD)
  }

  if (signIn.error != null) throw new Error(`storage-state export sign-in: ${signIn.error.message}`)
  if (signIn.user == null) throw new Error("storage-state export sign-in: no user returned")
  assertCredentialPathAllowed({ resolvedUserId: signIn.user.id })

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    env: buildBrowserLaunchEnv(process.env),
  })
  try {
    const context = await browser.newContext()
    const page = await context.newPage()

    console.log(`Navigating to ${baseUrl}/sign-in`)
    await page.goto(`${baseUrl}/sign-in`, { waitUntil: "load", timeout: NAVIGATION_TIMEOUT_MS })

    await page.locator("input#email").fill(env.BROWSER_TEST_EMAIL)
    await page.locator("input#password").fill(env.BROWSER_TEST_PASSWORD)
    await page.locator('form[data-slot="auth-form"] button[type="submit"]').click()

    await page.waitForURL((url) => !url.pathname.startsWith("/sign-in"), {
      timeout: NAVIGATION_TIMEOUT_MS,
    })
    await page.waitForLoadState("load", { timeout: NAVIGATION_TIMEOUT_MS })

    const landed = page.url()
    if (new URL(landed).pathname.startsWith("/sign-in")) {
      throw new Error(`sign-in did not complete — still on ${landed}`)
    }
    console.log(`Signed in; landed on ${landed}`)

    mkdirSync(dirname(storageStatePath), { recursive: true })
    await context.storageState({ path: storageStatePath })
    chmodSync(storageStatePath, 0o600)
    console.log(`Wrote storage state to ${storageStatePath}`)
    return storageStatePath
  } finally {
    await browser.close()
  }
}

if (import.meta.main) await exportPlaywrightStorageState()
