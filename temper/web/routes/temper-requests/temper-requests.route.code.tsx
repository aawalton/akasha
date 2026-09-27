import { PageTitle } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { listingFor } from "akasha/product/kofi/feature-request/modules/listing/feature-request-listing.module.code.ts"
import { temper } from "akasha/temper/temper.domain.ts"
import {
  loadedPhrase,
  loadWebPhrases,
} from "akasha/temper/web/.server/web-phrase-loading/web-phrase-loading.module.code.ts"
import { temperRequestsDocumentTitle } from "akasha/temper/web/phrase/pages/temper-requests-document-title.temper-web-phrase.ts"
import { temperRequestsEmpty } from "akasha/temper/web/phrase/pages/temper-requests-empty.temper-web-phrase.ts"
import { temperRequestsHeading } from "akasha/temper/web/phrase/pages/temper-requests-heading.temper-web-phrase.ts"
import { temperRequestsLead } from "akasha/temper/web/phrase/pages/temper-requests-lead.temper-web-phrase.ts"
import { temperRequestsPointBooster } from "akasha/temper/web/phrase/pages/temper-requests-point-booster.temper-web-phrase.ts"
import { temperRequestsPointBoosters } from "akasha/temper/web/phrase/pages/temper-requests-point-boosters.temper-web-phrase.ts"
import { temperRequestsPointsBooster } from "akasha/temper/web/phrase/pages/temper-requests-points-booster.temper-web-phrase.ts"
import { temperRequestsPointsBoosters } from "akasha/temper/web/phrase/pages/temper-requests-points-boosters.temper-web-phrase.ts"
import { temperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.ts"

const PRODUCT = namedAs("domain", temper.slug, null)

const READ = ["feature-request", temperWebPhrase.slug]

const PHRASES = [
  temperRequestsEmpty.slug,
  temperRequestsHeading.slug,
  temperRequestsLead.slug,
  temperRequestsPointBooster.slug,
  temperRequestsPointBoosters.slug,
  temperRequestsPointsBooster.slug,
  temperRequestsPointsBoosters.slug,
]

export function meta() {
  return [{ title: temperRequestsDocumentTitle.title }]
}

function backingOf(points: number, boosters: number): string {
  if (points === 1) {
    return boosters === 1 ? temperRequestsPointBooster.slug : temperRequestsPointBoosters.slug
  }
  return boosters === 1 ? temperRequestsPointsBooster.slug : temperRequestsPointsBoosters.slug
}

export async function loader() {
  const [listing, phrases] = await Promise.all([listingFor(PRODUCT), loadWebPhrases(PHRASES)])
  return {
    heading: loadedPhrase(phrases, temperRequestsHeading.slug),
    lead: loadedPhrase(phrases, temperRequestsLead.slug),
    empty: loadedPhrase(phrases, temperRequestsEmpty.slug),
    requests: listing.requests.map((one) => ({
      ...one,
      backing: loadedPhrase(phrases, backingOf(one.points, one.boosters), {
        points: one.points,
        boosters: one.boosters,
      }),
    })),
  }
}

type RequestsLoaderData = Awaited<ReturnType<typeof loader>>

export default function TemperRequestsRoute({ loaderData }: { loaderData: RequestsLoaderData }) {
  useLoaderFollowing(READ)
  const { requests, heading, lead, empty } = loaderData
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>{heading}</PageTitle>
          <p className="text-secondary text-sm">{lead}</p>
        </header>

        {requests.length === 0 ? (
          <p className="text-secondary text-sm">{empty}</p>
        ) : (
          <ul className="space-y-6">
            {requests.map((one) => (
              <li key={one.id} className="space-y-1">
                <h2 className="font-semibold text-base text-primary">{one.title}</h2>
                <p className="text-secondary text-sm">{one.ask}</p>
                <p className="text-secondary text-sm">{one.backing}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
