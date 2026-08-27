import {
  isDeconUsefulForAny,
  isDeconUsefulForCharacter,
  isDeconUsefulForCurrent,
} from "./rules-core-inspire"
export function isDeconUsefulForScope(craftingType: number, scope: string): boolean {
  if (scope.substring(0, 10) === "character:") {
    return isDeconUsefulForCharacter(craftingType, scope.substring(10))
  }
  if (scope === "any-character") return isDeconUsefulForAny(craftingType)
  return isDeconUsefulForCurrent(craftingType)
}
