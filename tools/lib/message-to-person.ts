
import { textField } from "../../page/frontmatter.ts"
import { addressOf } from "../../page/page-address.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
import { resolveSlot, scan } from "./seat-resolve.ts"

const PERSON_TYPE = "person"
const IDENTITY_KEY = "identity-slug"

export type Addressed =
  | { readonly kind: "inbox"; readonly slug: string }
  | { readonly kind: "refuse"; readonly reason: string }

export function addressPerson(person: string, inboxSlug: string): Addressed {
  const wanted = person.trim()
  if (wanted === "") {
    return {
      kind: "refuse",
      reason: "--person names nobody. Give the slug a document under pages/person/ declares.",
    }
  }

  const root = rootFor(resolveRoots(), AKASHA)
  const found = scan(root)
  // A SLUG IS UNIQUE WITHIN A PAGE TYPE AND NOT ACROSS THE CORPUS. This asked for the bare slug,
  // which reaches a map where the first page the scan walked to takes the key; `alan` names a seat
  // as well as a person, so `--person alan` resolved to `agent/seat/alan.seat.md` and was refused
  // below as a page type nobody asked for. An address carries the page type, so `person/alan` names
  // the person whatever else shares the slug. The bare slug is tried only where no person carries
  // it, and then only to name what does carry it in the refusal.
  const asPerson = resolveSlot("domain", addressOf(PERSON_TYPE, wanted), root, found)
  const at = "relPath" in asPerson ? asPerson : resolveSlot("domain", wanted, root, found)
  if ("refusal" in at) {
    return {
      kind: "refuse",
      reason: `--person '${wanted}': no document declares that slug, so it names no person.`,
    }
  }

  const fm = found.docs.frontmatterOf(at.relPath)
  // THE NAME SETTLES THE PAGE TYPE. This asked the page's own `page-type-slug:` whether it is a
  // person, so a file of any other kind carrying that one line was addressed as a person and the
  // refusal below never fired. The name is what the person pages are named by.
  if (fm === null || pageTypeOf(at.relPath) !== PERSON_TYPE) {
    return {
      kind: "refuse",
      reason:
        `--person '${wanted}': \`${at.relPath}\` is a domain rather than a person. A domain is ` +
        "addressed with --domain and a --role beside it.",
    }
  }

  if (wanted !== inboxSlug) {
    const identity = textField(fm, IDENTITY_KEY)
    const route =
      identity === null
        ? `\`${at.relPath}\` names no identity to reach them through.`
        : `\`${at.relPath}\` names \`${identity}\` as the identity who reaches them.`
    return {
      kind: "refuse",
      reason:
        `--person '${wanted}' holds no mailbox: '${inboxSlug}' is the one person this system ` +
        `carries an inbox for, and everyone else is reached on a channel of their own. ${route}`,
    }
  }

  return { kind: "inbox", slug: wanted }
}
