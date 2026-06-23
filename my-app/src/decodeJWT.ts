export function decode(data: string | null): Record<string, any> | null {
  try {
    if (!data) return null;
    const array = data.split(".");
    return JSON.parse(atob(array[1]));
  } catch {
    return null;
  }
}
