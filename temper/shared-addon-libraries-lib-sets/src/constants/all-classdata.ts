export {}

const lib = LibSets

const classData: LibSetsClassData = {
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
      classData.index2Id[classIndex] = classId
      classData.id2Index[classId] = classIndex
    }
    classData.names[classId] = zo_strformat(SI_CLASS_NAME, GetClassName(GENDER_MALE, classId))
    classData.icons[classId] = ZO_GetClassIcon(classId)
    classData.colors[classId] = GetClassColor(classId)
  }
}
lib.classData = classData
