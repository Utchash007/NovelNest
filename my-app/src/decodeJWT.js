export function decode(data) {
    const array = data.split(".");
    const decoded = JSON.parse(atob(array[1]));
    return decoded;
}