import { signUpLoader } from "akasha/alan/harness/supabase-rr/modules/sign-up-route/sign-up-route.module.code.ts"

export function loader(): Response {
  return signUpLoader()
}
