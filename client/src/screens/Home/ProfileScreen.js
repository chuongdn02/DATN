import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?', sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') {
      console.warn('Cannot send an empty message.');
      return;
    }

    const newMessages = [
      ...messages,
      { id: `${messages.length + 1}`, text: inputMessage, sender: 'user' },
    ];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const url = 'http://localhost:3000/api/chat';

      console.log('Sending request to:', url);
      console.log('Payload:', { message: inputMessage });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      const botMessage = {
        id: `${messages.length + 2}`,
        text: data.content, // Assuming the API response includes `content`
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Nhập tin nhắn..."
        />
        <Button
          title={isLoading ? 'Đang trả lời...' : 'Gửi'}
          onPress={sendMessage}
          disabled={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  botMessage: {
    backgroundColor: '#d1e7dd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 50,
  },
  userMessage: {
    backgroundColor: '#e2e3e5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 10,
    marginLeft: 50,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ChatbotScreen;
