
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { seatRoster } from "./seat-roster.ts"
import { resolveSlot, scan } from "./seat-resolve.ts"

export interface SeatRow {
  readonly id: string
  readonly name: string | null
  readonly domain: string | null
  readonly role: string | null
  readonly activeAtMs: number
}

export type Stated =
  | { readonly kind: "none" }
  | { readonly kind: "domain"; readonly domain: string; readonly role: string }
  | { readonly kind: "refuse"; readonly reason: string }

const WITH_A_ROLE = "a domain is stated with a role"

export function readStated(domain: string | undefined, role: string | undefined): Stated {
  const wantedDomain = (domain ?? "").trim()
  const wantedRole = (role ?? "").trim()

  if (wantedDomain === "" && wantedRole === "") return { kind: "none" }

  if (wantedRole === "") {
    return {
      kind: "refuse",
      reason: `--domain '${wantedDomain}' is half an address: ${WITH_A_ROLE}. Add --role.`,
    }
  }

  if (wantedDomain === "") {
    return {
      kind: "refuse",
      reason:
        `--role '${wantedRole}' stands alone, and a role is stated with a domain. ` +
        "The same role is held across every domain, so alone it names no one seat.",
    }
  }

  return { kind: "domain", domain: wantedDomain, role: wantedRole }
}

export function matching(stated: Stated, seats: readonly SeatRow[]): readonly SeatRow[] {
  if (stated.kind === "domain") {
    return seats.filter(
      (seat) =>
        (seat.domain ?? "").trim() === stated.domain && (seat.role ?? "").trim() === stated.role
    )
  }
  return []
}

export type Recipient =
  | { readonly kind: "seat"; readonly seat: SeatRow }
  | { readonly kind: "none" }

export function decideRecipient(stated: Stated, seats: readonly SeatRow[]): Recipient {
  const candidates = [...matching(stated, seats)].sort((one, two) => two.activeAtMs - one.activeAtMs)
  const [first] = candidates
  return first === undefined ? { kind: "none" } : { kind: "seat", seat: first }
}

export function names(stated: Stated): string {
  if (stated.kind === "domain") return `domain '${stated.domain}' and role '${stated.role}'`
  return "nothing"
}

export function undeclared(stated: Stated): string | null {
  const root = rootFor(resolveRoots(), AKASHA)
  const found = scan(root)

  if (stated.kind === "domain" && "refusal" in resolveSlot("domain", stated.domain, root, found)) {
    return (
      `--domain '${stated.domain}': no document declares \`slug: ${stated.domain}\`, so no ` +
      "seat could be stating it. `ops domain dag` prints the domains that stand."
    )
  }

  const role = stated.kind === "domain" ? stated.role : null

  return null
}

export async function seatsStating(stated: Stated, live: boolean): Promise<readonly SeatRow[]> {
  if (stated.kind !== "domain") return []
  return seatRoster(live)
}
