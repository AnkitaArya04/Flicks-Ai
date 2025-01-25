const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n    {\n        \"imagePrompt\": \"A bustling ancient Roman marketplace, sunlit with stalls overflowing with vibrant produce, pottery, and textiles. People in togas are haggling, a water carrier passes by, a sense of everyday life.\",\n        \"ContentText\": \"Imagine Rome, not in its grandeur, but in its ordinary moments. A market scene bursting with life, a place of daily transactions and vibrant energy.\"\n    },\n    {\n       \"imagePrompt\": \"Close-up on a clay tablet being inscribed with cuneiform writing, a stylus held by a calloused hand. The tablet sits on a simple wooden table with scattered scrolls and ink pots.\",\n       \"ContentText\": \"But history isn't just about epic battles. It's also about the quiet act of writing, like this cuneiform tablet, recording stories and transactions of the past.\"\n   },\n    {\n        \"imagePrompt\": \"A dimly lit medieval scriptorium, a monk hunched over a large illuminated manuscript, meticulously painting details onto a letter 'A'. Sunlight filters through a high window. \",\n        \"ContentText\": \"Centuries later, in a monastery, a monk painstakingly creates an illuminated manuscript, preserving knowledge and beauty, one delicate stroke at a time.\"\n    },\n     {\n        \"imagePrompt\": \"A close-up of a wooden printing press, ink-stained hands placing a sheet of paper, the image is sharp, focus on action, a hint of machinery, a light coming from the side\",\n        \"ContentText\":\"Then came the printing press, allowing stories to travel further than ever, democratizing information and changing the world.\"\n     },\n     {\n        \"imagePrompt\":\"A black and white photograph of a woman, focused and determined, operating a telegraph machine. Wires and spools are in the background. She is wearing period dress.\",\n        \"ContentText\": \"Think of the telegraph, a revolutionary technology that connected distant worlds instantly, shaping modern communication.\"\n     },\n    {\n        \"imagePrompt\": \"A vintage radio broadcasting a speech, a warm glow on its dials and knobs, people listening attentively in a simple living room. A sense of community and shared experience.\",\n        \"ContentText\": \"Or the radio, sharing voices across the airwaves, uniting communities and shaping perspectives.\"\n    }\n\n]\n```\n"},
          ],
        },
      ],
    });
  
   