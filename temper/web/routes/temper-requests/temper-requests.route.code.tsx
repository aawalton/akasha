import { PageTitle } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  pointsOn,
  requestsFor,
} from "akasha/product/kofi/feature-request/modules/serving/feature-request-serving.module.code.ts"
import { temper } from "akasha/temper/temper.domain.ts"
import { data } from "react-router"

const PRODUCT = namedAs("domain", temper.slug, null)

export function meta() {
  return [{ title: "Feature requests — Temper" }]
}

export async function loader() {
  const requests = await requestsFor({ product: PRODUCT, standings: ["published"] })
  return data({
    requests: requests.map((one) => ({
      id: one.id,
      title: one.title ?? one.slug ?? one.id,
      ask: typeof one.ask === "string" ? one.ask : "",
      points: pointsOn(one),
      backers: Array.isArray(one.backing) ? one.backing.length : 0,
    })),
  })
}

type RequestsLoaderData = Awaited<ReturnType<typeof loader>>["data"]

export default function TemperRequestsRoute({ loaderData }: { loaderData: RequestsLoaderData }) {
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
                  {one.points} {one.points === 1 ? "point" : "points"} from {one.backers}{" "}
                  {one.backers === 1 ? "backer" : "backers"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
