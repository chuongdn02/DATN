import Groq from 'groq-sdk'; // Import thư viện Groq

// Khởi tạo đối tượng Groq với API Key của bạn
const groq = new Groq({ apiKey: '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' });

// Hàm lấy kết quả chat từ Groq
export async function getGroqChatCompletion(userMessage) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: userMessage, // Tin nhắn người dùng
        },
      ],
      model: 'llama3-8b-8192', // Mô hình bạn muốn sử dụng
    });

    return chatCompletion.choices[0]?.message?.content || 'Không có kết quả';
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return 'Đã có lỗi xảy ra';
  }
}
