import { personAt } from "./akasha-people.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"

export type Addressed =
  | { readonly kind: "inbox"; readonly slug: string }
  | { readonly kind: "refuse"; readonly reason: string }

export function addressPerson(person: string, inboxSlug: string): Addressed {
  const wanted = person.trim()
  if (wanted === "") {
    return {
      kind: "refuse",
      reason: "--person names nobody. Give the slug a person page states.",
    }
  }

  const root = rootFor(resolveRoots(), AKASHA)
  const found = personAt(root, wanted)
  if (found === null) {
    return {
      kind: "refuse",
      reason: `--person '${wanted}': no page states that slug, so it names no person.`,
    }
  }

  if (wanted !== inboxSlug) {
    const route =
      found.answeredBy === null
        ? `\`${found.path}\` names no persona to reach them through.`
        : `\`${found.path}\` names \`${found.answeredBy}\` as the persona who answers them.`
    return {
      kind: "refuse",
      reason:
        `--person '${wanted}' holds no mailbox: '${inboxSlug}' is the one person this system ` +
        `carries an inbox for, and everyone else is reached on a channel of their own. ${route}`,
    }
  }

  return { kind: "inbox", slug: wanted }
}
