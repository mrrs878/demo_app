export function deepCopy(src: any) {
  return JSON.parse(JSON.stringify(src || ""));
}
