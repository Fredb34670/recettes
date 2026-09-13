export function formatQuantity(quantity: number, unit: string, precise = false): string {
  if (unit === "kg") {
    const grams = quantity * 1000
    return `${Math.round(grams)} g`
  }
  if (unit === "L") {
    if (quantity >= 1) return `${quantity.toFixed(2)} L`
    return `${Math.round(quantity * 1000)} mL`
  }
  if (unit === "pce" || unit === "pces") {
    return `${quantity} ${quantity > 1 ? "pces" : "pce"}`
  }
  return `${quantity} ${unit}`
}
