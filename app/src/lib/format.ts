export function formatQuantity(quantity: number, unit: string): string {
  if (unit === "kg") {
    if (quantity >= 1) return `${quantity} ${unit}`
    return `${Math.round(quantity * 1000)} g`
  }
  if (unit === "L") {
    if (quantity >= 1) return `${quantity} ${unit}`
    return `${Math.round(quantity * 1000)} mL`
  }
  if (unit === "pce" || unit === "pces") {
    return `${quantity} ${quantity > 1 ? "pces" : "pce"}`
  }
  return `${quantity} ${unit}`
}
