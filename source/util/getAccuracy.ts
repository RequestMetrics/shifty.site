export function getAccuracy(cart: number, clicks: number) {
  if (!cart || !clicks) {
    return `0.00%`;
  }
  else {
    return `${(cart / clicks).toFixed(2)}%`;
  }
}