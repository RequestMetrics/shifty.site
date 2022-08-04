export function getLocalStorage(name : string) : any {
  return JSON.parse(localStorage.getItem(name));
}

export function setLocalStorage(name : string, value : any) {
  localStorage.setItem(name, JSON.stringify(value));
}
