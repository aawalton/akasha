import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const importPageContentInstalling = {
  id: "01a0e2a7-edf8-7030-8d68-f3d495db0f97",
  type: "page-type/temper-web-phrase",
  slug: "import-page-content-installing",
  title: "Installing the add-ons",
  description:
    "{download} and extract the zip into {addOnsFolder} — or {oneDriveAddOnsFolder}, if your Documents folder syncs to OneDrive. Add Tamriel Trade Centre alongside them, as below. Then turn everything on at {addOnsMenu}, ticking {allowOutOfDate} if ours are listed as out of date, and log in to a character once. An add-on that is installed but not enabled writes nothing.",
} as const satisfies TemperWebPhrase
