import type { LucideIcon } from "lucide-react"
import { CupSoda, Sparkles, Soup, Milk, FlaskConical, Cookie, IceCream, CakeSlice } from "lucide-react"
import { recipeFamilies } from "@/lib/recipes"

const familyIcons: Record<string, LucideIcon> = {
  Ganaches: CupSoda,
  Mousses: Sparkles,
  Sauces: Soup,
  Crèmes: Milk,
  Appareils: FlaskConical,
  Pâtes: Cookie,
  Glaces: IceCream,
  Biscuiterie: CakeSlice,
  Viennoiserie: Cookie,
}

export function getFamilyIcon(family: string): LucideIcon {
  return familyIcons[family] || Milk
}

export function getFamilyColor(family: string): string {
  const colors: Record<string, string> = {
    Ganaches: "bg-amber-100 text-amber-800 border-amber-200",
    Mousses: "bg-rose-100 text-rose-800 border-rose-200",
    Sauces: "bg-orange-100 text-orange-800 border-orange-200",
    Crèmes: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Appareils: "bg-violet-100 text-violet-800 border-violet-200",
    Pâtes: "bg-stone-100 text-stone-800 border-stone-200",
    Glaces: "bg-cyan-100 text-cyan-800 border-cyan-200",
    Biscuiterie: "bg-amber-50 text-amber-700 border-amber-100",
    Viennoiserie: "bg-orange-50 text-orange-700 border-orange-100",
  }
  return colors[family] || "bg-gray-100 text-gray-800 border-gray-200"
}

export { recipeFamilies }
