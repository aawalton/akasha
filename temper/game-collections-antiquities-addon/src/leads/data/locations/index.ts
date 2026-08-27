import type { LocationEntry } from "./location-types"
import { locations1 } from "./locations-1"
import { locations2 } from "./locations-2"
import { locations3 } from "./locations-3"
import { locations4 } from "./locations-4"
import { locations5 } from "./locations-5"
import { locations6 } from "./locations-6"
import { locations7 } from "./locations-7"
import { locations8 } from "./locations-8"
import { locations9 } from "./locations-9"
import { locations10 } from "./locations-10"
import { locations11 } from "./locations-11"


export const locations: Record<number, LocationEntry> = {
  ...locations1,
  ...locations2,
  ...locations3,
  ...locations4,
  ...locations5,
  ...locations6,
  ...locations7,
  ...locations8,
  ...locations9,
  ...locations10,
  ...locations11,
}
