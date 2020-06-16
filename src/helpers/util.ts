const toString = Object.prototype.toString
/**
 * 是否为Date
 * @param val
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
/**
 * 是否为Object(对于 FormData、ArrayBuffer 这些类型，判断也为 true)
 * @param val
 */
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }
/**
 * 是否为Object
 * @param val
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
