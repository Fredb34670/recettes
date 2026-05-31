import type { Recipe } from "@/types/recipe"

// Crèmes
import cremePatissiere from "../../data/recipes/creme-patissiere.json"
import cremeMousseline from "../../data/recipes/creme-mousseline.json"
import cremeChiboust from "../../data/recipes/creme-chiboust.json"
import cremeBavaroise from "../../data/recipes/creme-bavaroise.json"
import cremeBrulee from "../../data/recipes/creme-brulee.json"
import cremeRenversee from "../../data/recipes/creme-renversee.json"
import cremeCatalane from "../../data/recipes/creme-catalane.json"
import cremeCitron from "../../data/recipes/creme-citron.json"
import cremeDiplomate from "../../data/recipes/creme-diplomate.json"
import cremeuxChocolat from "../../data/recipes/cremeux-chocolat.json"
import potsDeCreme from "../../data/recipes/pots-de-creme.json"
import clafoutisCerises from "../../data/recipes/clafoutis-cerises.json"
import rizAuLait from "../../data/recipes/riz-au-lait.json"

// Sauces
import cremeAnglaise from "../../data/recipes/creme-anglaise.json"
import sauceChocolat from "../../data/recipes/sauce-chocolat.json"
import sauceCaramel from "../../data/recipes/sauce-caramel.json"
import coulisFruits from "../../data/recipes/coulis-fruits.json"
import sauceSabayon from "../../data/recipes/sauce-sabayon.json"
import sauceVanille from "../../data/recipes/sauce-vanille.json"
import sauceProfiterolle from "../../data/recipes/sauce-profiterolle.json"

// Ganaches
import ganacheFramboise from "../../data/recipes/ganache-framboise.json"
import ganacheClassique from "../../data/recipes/ganache-classique.json"

// Mousses
import mousseChocolatNoir from "../../data/recipes/mousse-chocolat-noir.json"
import chantillyChocolat from "../../data/recipes/chantilly-chocolat.json"
import mousseAuxFruits from "../../data/recipes/mousse-aux-fruits.json"

// Pâtes
import pateSablee from "../../data/recipes/pate-sablee.json"
import pateSucree from "../../data/recipes/pate-sucree.json"
import pateBriss from "../../data/recipes/pate-brisee.json"
import pateAFoncer from "../../data/recipes/pate-a-foncer.json"
import pateAChoux from "../../data/recipes/pate-a-choux.json"
import pateFeuilletee from "../../data/recipes/pate-feuilletee.json"
import pateCrepes from "../../data/recipes/pate-crepes.json"
import pateBriochee from "../../data/recipes/pate-briochee.json"
import pateACake from "../../data/recipes/pate-a-cake.json"
import pateAMadeleine from "../../data/recipes/pate-a-madeleine.json"
import crumble from "../../data/recipes/crumble.json"

// Biscuiterie
import genoise from "../../data/recipes/genoise.json"
import biscuitCuillere from "../../data/recipes/biscuit-cuillere.json"
import biscuitJoconde from "../../data/recipes/biscuit-joconde.json"
import dacquoise from "../../data/recipes/dacquoise.json"
import financier from "../../data/recipes/financier.json"
import tuilesAmandes from "../../data/recipes/tuiles-amandes.json"
import languesDeChat from "../../data/recipes/langues-de-chat.json"
import macaronsGerbet from "../../data/recipes/macarons-gerbet.json"
import meringueFrancaise from "../../data/recipes/meringue-francaise.json"
import meringueItalienne from "../../data/recipes/meringue-italienne.json"
import painDeGenes from "../../data/recipes/pain-de-genes.json"
import moelleuxChocolat from "../../data/recipes/moelleux-chocolat.json"

// Viennoiserie
import pateCroissants from "../../data/recipes/pate-croissants.json"
import brioche from "../../data/recipes/brioche.json"
import painAuLait from "../../data/recipes/pain-au-lait.json"

// Appareils
import pateABombe from "../../data/recipes/pate-a-bombe.json"
import cremeDamandes from "../../data/recipes/creme-damandes.json"

export const recipes: Recipe[] = [
  // Crèmes
  cremePatissiere as Recipe,
  cremeMousseline as Recipe,
  cremeChiboust as Recipe,
  cremeBavaroise as Recipe,
  cremeBrulee as Recipe,
  cremeRenversee as Recipe,
  cremeCatalane as Recipe,
  cremeCitron as Recipe,
  cremeDiplomate as Recipe,
  cremeuxChocolat as Recipe,
  potsDeCreme as Recipe,
  clafoutisCerises as Recipe,
  rizAuLait as Recipe,

  // Sauces
  cremeAnglaise as Recipe,
  sauceChocolat as Recipe,
  sauceCaramel as Recipe,
  coulisFruits as Recipe,
  sauceSabayon as Recipe,
  sauceVanille as Recipe,
  sauceProfiterolle as Recipe,

  // Ganaches
  ganacheFramboise as Recipe,
  ganacheClassique as Recipe,

  // Mousses
  mousseChocolatNoir as Recipe,
  chantillyChocolat as Recipe,
  mousseAuxFruits as Recipe,

  // Pâtes
  pateSablee as Recipe,
  pateSucree as Recipe,
  pateBriss as Recipe,
  pateAFoncer as Recipe,
  pateAChoux as Recipe,
  pateFeuilletee as Recipe,
  pateCrepes as Recipe,
  pateBriochee as Recipe,
  pateACake as Recipe,
  pateAMadeleine as Recipe,
  crumble as Recipe,

  // Biscuiterie
  genoise as Recipe,
  biscuitCuillere as Recipe,
  biscuitJoconde as Recipe,
  dacquoise as Recipe,
  financier as Recipe,
  tuilesAmandes as Recipe,
  languesDeChat as Recipe,
  macaronsGerbet as Recipe,
  meringueFrancaise as Recipe,
  meringueItalienne as Recipe,
  painDeGenes as Recipe,
  moelleuxChocolat as Recipe,

  // Viennoiserie
  pateCroissants as Recipe,
  brioche as Recipe,
  painAuLait as Recipe,

  // Appareils
  pateABombe as Recipe,
  cremeDamandes as Recipe,
]

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id)
}

export function getRecipesByFamily(family: string): Recipe[] {
  return recipes.filter((r) => r.family === family)
}

export const recipeFamilies = [
  "Ganaches",
  "Mousses",
  "Sauces",
  "Crèmes",
  "Appareils",
  "Pâtes",
  "Glaces",
  "Biscuiterie",
  "Viennoiserie",
]
