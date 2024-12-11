import groq from '../config/groqConfig.js';  // Ensure correct path and file extension



export const getChatCompletion = async (req, res) => {
  const { message } = req.body; // Change this to req.query to handle query parameters

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "[Bạn là một chuyên gia dinh dưỡng Tiếng Việt]"+message+"Hãy trả lời tất cả bằng Tiếng Việt, ngắn gọn, rõ ràng và chính xác",
        },
      ],
      model: "llama3-8b-8192",
    });
    res.json({
      content: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message );
  }
};
