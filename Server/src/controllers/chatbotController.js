import groq from '../config/groqConfig.js';  // Ensure correct path and file extension



export const getChatCompletion = async (req, res) => {
  const { message } = req.body; 

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }
  try {
    const chatCompletion = await groq.chat.completions.create({
     messages: [
  {
    role: "system",
    content: "Bạn là một chuyên gia dinh dưỡng hàng đầu nói tiếng Việt. Nhiệm vụ của bạn là cung cấp câu trả lời ngắn gọn, chính xác và dễ hiểu cho các câu hỏi liên quan đến dinh dưỡng, sức khỏe và chế độ ăn uống. Hãy sử dụng văn phong chuyên nghiệp nhưng thân thiện."
  },
  {
    role: "user",
    content: message
  }
],
model: "gemma2-9b-it"

    });
    res.json({
      content: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message );
  }
};
