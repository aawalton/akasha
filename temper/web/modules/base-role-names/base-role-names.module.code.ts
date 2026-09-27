import { companionBaseRoles } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { Phrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { baseRoleNamesJoined } from "akasha/temper/web/phrase/pages/base-role-names-joined.temper-web-phrase.ts"
import { baseRoleNamesNone } from "akasha/temper/web/phrase/pages/base-role-names-none.temper-web-phrase.ts"

export function baseRoleNames(phrase: Phrase, roles: readonly string[]): string {
  const [first, ...rest] = companionBaseRoles()
    .filter((role) => roles.includes(role.id))
    .map((role) => role.name)
  if (first === undefined) return phrase(baseRoleNamesNone.slug)
  return rest.reduce((names, name) => phrase(baseRoleNamesJoined.slug, { names, name }), first)
}
