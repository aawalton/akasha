import { PageTitle } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { listingFor } from "akasha/product/kofi/feature-request/modules/listing/feature-request-listing.module.code.ts"
import { temper } from "akasha/temper/temper.domain.ts"

const PRODUCT = namedAs("domain", temper.slug, null)

const READ = ["feature-request"]

export function meta() {
  return [{ title: "Feature requests — Temper" }]
}

export function loader() {
  return listingFor(PRODUCT)
}

type RequestsLoaderData = Awaited<ReturnType<typeof loader>>

export default function TemperRequestsRoute({ loaderData }: { loaderData: RequestsLoaderData }) {
  useLoaderFollowing(READ)
  const { requests } = loaderData
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Feature requests</PageTitle>
          <p className="text-secondary text-sm">
            What Temper players have asked for, and the contribution points behind each ask.
          </p>
        </header>

        {requests.length === 0 ? (
          <p className="text-secondary text-sm">No feature request is published yet.</p>
        ) : (
          <ul className="space-y-6">
            {requests.map((one) => (
              <li key={one.id} className="space-y-1">
                <h2 className="font-semibold text-base text-primary">{one.title}</h2>
                <p className="text-secondary text-sm">{one.ask}</p>
                <p className="text-secondary text-sm">
                  {one.points} {one.points === 1 ? "point" : "points"} from {one.boosters}{" "}
                  {one.boosters === 1 ? "booster" : "boosters"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
