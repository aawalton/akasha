import { zoneDisplayName } from "./zone-name"

export function getAntiquityDigZoneName(this: void, antiquityId: number): string | undefined {
  const digZoneId = GetAntiquityZoneId(antiquityId)
  const name = zoneDisplayName(digZoneId)
  return name === "" ? undefined : name
}
