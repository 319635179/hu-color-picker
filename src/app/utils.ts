let uniqueId = 0

export const getUniqueId = (prefix?: string) => {
  return String(prefix ? `${prefix}__${uniqueId++}` : uniqueId++)
}