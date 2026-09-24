import { temperWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/temper-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const TEMPER_APP_ID = "019db76e-1094-76fe-abea-0e62d8160454"
export const TEMPER_APP = namedAs(webApp.slug, temperWeb.slug, null)
