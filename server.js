const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("EventIQ AI Backend is Running 🚀");
});

// Create Event API
app.post("/api/events", (req, res) => {
  const event = req.body;

  res.json({
    success: true,
    message: "Event received successfully",
    event,
  });
});

// AI Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message, event } = req.body;

    const eventContext = event
      ? `
Event Name: ${event.eventName || ""}
Event Type: ${event.eventType || ""}
Date: ${event.date || ""}
Venue: ${event.venue || ""}
Capacity: ${event.capacity || ""}
Description: ${event.description || ""}
`
      : "No event details provided.";

    const prompt = `
You are EventIQ AI, an AI Organizer Intelligence Assistant for college events.

Your main job is to help organizers with:
1. Improving event descriptions
2. Identifying target students
3. Suggesting promotion strategies
4. Predicting expected engagement

You can also help with:
- Budget planning
- Event checklist
- Event calendar planning
- Poster ideas

Current Event:
${eventContext}

Organizer message:
${message}

Give a clear, useful, short response for a college event organizer.
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    res.json({
      success: true,
      reply: response.output_text,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      success: false,
      message: "AI response failed",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});