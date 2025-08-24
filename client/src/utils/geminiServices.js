// geminiServices.js

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
// ⬆️ Use this if you are using Vite
// If you're using Create React App, use: const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export const fetchGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error Response:", errText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean response if AI returns JSON inside ```
    const cleanedText = aiText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch {
      parsed = { text: cleanedText };
    }

    return parsed;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    throw error;
  }
};
