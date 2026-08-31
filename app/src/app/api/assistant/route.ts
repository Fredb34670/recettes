import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import type { Recipe } from "@/types/recipe"

export async function POST(req: Request) {
  try {
    const { message, recipe, history = [] } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message manquant" }, { status: 400 })
    }

    if (typeof message !== "string") {
      return NextResponse.json({
        reply: "⚠️ L'assistant ne traite que des questions textes. Les images ne sont pas supportées.",
      })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        reply: "⚠️ La clé d'API Gemini n'est pas encore configurée. Veuillez ajouter `GEMINI_API_KEY=votre_cle` dans votre fichier `.env.local`.",
      })
    }

    const ai = new GoogleGenAI({ apiKey })

    const recipeContext = recipe
      ? `
Tu es un chef pâtissier expert et pédagogue. Tu réponds aux questions de l'utilisateur qui est en train de réaliser la recette suivante :

Titre : ${recipe.title}
Famille : ${recipe.family}
Difficulté : ${recipe.difficulty}
Description : ${recipe.description}
Ingrédients : ${recipe.ingredients.map((ing: { name: string; quantity: number; unit: string }) => `${ing.name}: ${ing.quantity} ${ing.unit}`).join(", ")}
Étapes :
${recipe.steps.map((st: { title: string; description: string; tip?: string }, idx: number) => `${idx + 1}. ${st.title}: ${st.description}${st.tip ? ` (Astuce: ${st.tip})` : ""}`).join("\n")}
Matériel : ${recipe.tools?.join(", ")}

Règles de réponse :
- Sois concis, bienveillant, clair et très précis sur la technique et la physique-chimie de la pâtisserie.
- Si l'utilisateur rencontre un problème (ex: ganache qui tranche, blanc en neige qui retombe), explique la cause et donne la solution immédiate.
- Formate tes réponses avec un style épuré et lisible.`
      : "Tu es un chef pâtissier expert. Réponds avec précision et bienveillance aux questions de pâtisserie."

    const promptText = `${recipeContext}\n\nHistorique récent :\n${history.map((h: { sender: string; text: string }) => `${h.sender === "user" ? "Utilisateur" : "Chef"}: ${h.text}`).join("\n")}\n\nUtilisateur : ${message}\nChef :`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
    })

    const reply = response.text || "Désolé, je n'ai pas pu générer de réponse pour le moment."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Gemini API error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la communication avec l'assistant." },
      { status: 500 }
    )
  }
}
