export function formatQuantity(quantity: number, unit: string, precise = false): string {
  if (unit === "kg") {
    if (quantity >= 1) return `${Math.round(quantity * 1000)} g`
    return `${(quantity * 1000).toFixed(3)} g`
  }
  if (unit === "L") {
    if (quantity >= 1) return precise ? `${quantity.toFixed(2)} L` : `${quantity} L`
    return precise ? `${(quantity * 1000).toFixed(0)} mL` : `${Math.round(quantity * 1000)} mL`
  }
  if (unit === "pce" || unit === "pces") {
    return `${quantity} ${quantity > 1 ? "pces" : "pce"}`
  }
  return precise ? `${quantity.toFixed(2)} ${unit}` : `${quantity} ${unit}`
}
