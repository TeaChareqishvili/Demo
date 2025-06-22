import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { getOutfitSuggestions } from "../api/openAi";
import Mannequin from "./Mannequin";

export default function WardrobeData() {
  const [wardrobe, setWardrobe] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wardrobe items from Supabase
  useEffect(() => {
    const fetchWardrobe = async () => {
      const { data, error } = await supabase.from("wardrobe").select("*");
      if (error) console.error("Supabase Error:", error);
      else setWardrobe(data);
    };
    fetchWardrobe();
  }, []);

  // Handle AI call
  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    setLoading(true);

    const descriptions = wardrobe
      .map(
        (item) =>
          `ID: ${item.id}, Type: ${item.type}, Description: ${item.description}`
      )
      .join("\n");

    const prompt = `
You are a world-class fashion stylist with expertise influenced by top global designers (e.g., Alexander McQueen, Coco Chanel, Dior, Balenciaga, Gucci).

Your job is to create stylish, cohesive outfit combinations based only on the user's wardrobe.

⚠️ Important styling rules:
- Never pair elegant or semi-formal dresses with athletic sneakers or gym bags.
- Keep consistency in tone: casual with casual, formal with formal.
- Use color harmony — avoid clashing colors unless it's a bold, intentional fashion statement.
- Do not repeat outfits with the same base item unless the variation feels distinctly different in style.
- Prioritize fashion cohesion, balance, and purpose (e.g., party, work, gym).
- Do not suggest accessories that do not complement the outfit’s vibe.
- Suggest only visually aesthetic combinations you'd proudly present as a professional stylist.

Wardrobe items:
${descriptions}

The user is asking: "${userPrompt}"

Return all possible outfit combinations that suit this request. Format the response as **JSON**, in this structure:

[
  {
    top: 12,
    bottom: 27,
    shoes: 43,
    accessory: 5
  },
  {
    dress: 17,
    shoes: 43,
    accessory: 5
  }
]
`;

    try {
      const result = await getOutfitSuggestions(prompt);
      const parsed = JSON.parse(result); // AI response must be valid JSON

      setSuggestions(parsed);
    } catch (error) {
      console.error("AI or JSON parse error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🧠 AI Fashion Stylist</h1>

      <input
        type="text"
        placeholder="e.g. I need a party outfit"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{ padding: "10px 20px" }}
      >
        {loading ? "Styling..." : "Get Outfit Suggestions"}
      </button>

      {suggestions.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>✨ AI Suggested Outfits:</h2>
          {suggestions.map((outfit, index) => (
            <div key={index} style={{ marginBottom: "2rem" }}>
              <Mannequin outfit={outfit} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
