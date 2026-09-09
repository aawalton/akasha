export {}

const lib = LibSets

const CLASS_DATA: LibSetsClassData = {
  index2Id: {},
  id2Index: {},
  names: {},
  icons: {},
  colors: {},
  setsList: {},
}
for (let i = 1; i <= GetNumClasses(); i++) {
  const [classId] = GetClassInfo(i)
  if (classId !== undefined) {
    const classIndex = GetClassIndexById(classId)
    if (classIndex !== undefined) {
      CLASS_DATA.index2Id[classIndex] = classId
      CLASS_DATA.id2Index[classId] = classIndex
    }
    CLASS_DATA.names[classId] = zo_strformat(SI_CLASS_NAME, GetClassName(GENDER_MALE, classId))
    CLASS_DATA.icons[classId] = ZO_GetClassIcon(classId)
    CLASS_DATA.colors[classId] = GetClassColor(classId)
  }
}
lib.classData = CLASS_DATA
