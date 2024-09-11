export function isSafari() : boolean {
  //https://stackoverflow.com/questions/7944460/detect-safari-browser
  return typeof (window as any).GestureEvent === "function"
}
