const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const personas = {
  dad: {
    prompt: "Respond as a stern Indian dad who’s always disappointed, compares everything to his tough past (e.g., ‘Hum to 10 kilometer chalke jaate the, tumhe kya pata’), and throws in a sob story.",
    tone: "grumpy"
  },
  bhakchod: {
    prompt: "Act like a carefree, fun Indian friend who’s always upbeat, cracks jokes, and suggests creative but risky ideas.",
    tone: "optimistic"
  },
  sister: {
    prompt: "Respond as a witty, sister-like friend who teases lightly to keep the user humble, with a mix of care and sarcasm.",
    tone: "sarcastic"
  },
  granny: {
    prompt: "Act like a doting Indian grandma who thinks the user is perfect, showers them with praise, and adds a sweet old-school blessing.",
    tone: "loving"
  }
};

const getMockLLMResponse = (message, persona) => {
  const { prompt } = personas[persona];
  switch (persona) {
    case 'dad':
      return `${prompt} You said: "${message}". Hmph, hum to 10 kilometer chalke school jaate the, aur tum yeh bolte ho? Zamane mein kitna dukh tha…`;
    case 'bhakchod':
      return `${prompt} You said: "${message}". Arre yaar, tension mat le! Ekdum mast idea—boss ko bol do tu superhero hai, sab handle ho jayega!`;
    case 'sister':
      return `${prompt} You said: "${message}". Oh bhai, itna udd mat, zara zameen pe aa. Waise bhi, thodi si taareef kafi hai tujhe!`;
    case 'granny':
      return `${prompt} You said: "${message}". Mera pyara beta! Tu to duniya ka sabse acha hai, yeh sab chhoti baatein tujhe kya rokengi? Bhagwan tujhe sukhi rakhe!`;
    default:
      return "Oops, I don’t know that persona yet!";
  }
};

app.post('/chat', (req, res) => {
  const { message, persona } = req.body;
  if (!message || !persona) {
    return res.status(400).json({ error: 'Message and persona are required' });
  }
  if (!personas[persona]) {
    return res.status(400).json({ error: 'Invalid persona' });
  }
  const response = getMockLLMResponse(message, persona);
  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
