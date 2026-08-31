export function formatQuantity(quantity: number, unit: string, precise = false): string {
  if (unit === "kg") {
    if (quantity >= 1) return precise ? `${quantity.toFixed(2)} kg` : `${quantity} kg`
    return precise ? `${(quantity * 1000).toFixed(0)} g` : `${Math.round(quantity * 1000)} g`
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
