
import { GoogleGenAI, Type } from "@google/genai";
import type { Recommendation } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    how: {
      type: Type.STRING,
      description: "Descrieți pașii clari și conciși pentru remedierea neconformității. (Ex: 'Curățați zona X folosind o perie de sârmă și degresant industrial.')"
    },
    withWhat: {
      type: Type.STRING,
      description: "Listați uneltele și materialele necesare. (Ex: 'Perie de sârmă, degresant, lavete, echipament de protecție')"
    },
    deadline: {
      type: Type.STRING,
      description: "Estimați un termen limită rezonabil pentru remediere. (Ex: '24 de ore', 'La următorul schimb', 'Imediat')"
    },
    action: {
      type: Type.STRING,
      description: "Selectați acțiunea principală necesară. Alegeți una dintre următoarele: 'Reparație imediată', 'Înlocuire piesă', 'Curățare', 'Gresare', 'Oprire echipament până la remediere', 'Monitorizare atentă'."
    }
  },
  required: ["how", "withWhat", "deadline", "action"]
};

export const generateRecommendation = async (equipmentName: string, nonConformityType: string): Promise<Recommendation | null> => {
  if (!process.env.API_KEY) {
    console.error("API key is not configured.");
    return {
      how: "Cheia API nu este configurată. Introduceți manual recomandarea.",
      withWhat: "",
      deadline: "",
      action: "Eroare de configurare"
    };
  }

  try {
    const prompt = `
      Ești un expert în mentenanța echipamentelor industriale dintr-o stație de sortare a deșeurilor.
      Pentru echipamentul "${equipmentName}", s-a constatat neconformitatea: "${nonConformityType}".
      Generează o recomandare de remediere în format JSON, respectând strict schema definită.
      Fii concis și la obiect. Recomandările trebuie să fie practice și direct aplicabile. Limba răspunsului trebuie să fie româna.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.5,
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as Recommendation;
    return result;

  } catch (error) {
    console.error("Error generating recommendation:", error);
    return {
      how: "A apărut o eroare la generarea recomandării. Vă rugăm introduceți manual.",
      withWhat: "",
      deadline: "",
      action: "Eroare API"
    };
  }
};
