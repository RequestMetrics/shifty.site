export function getLocalStorage(name: string): any {
    let raw = localStorage.getItem(name);
    return raw === null ? null : JSON.parse(raw);
}

export function setLocalStorage(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
}
