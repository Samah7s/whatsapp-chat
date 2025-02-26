import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useChatContext } from "../../context/ChatContext";
import {
  ChatContainer,
  InputContainer,
  MessageItem,
  MessageList,
  ActionButton,
  TextInput,
  ErrorText,
  LoadingIndicator,
  ChatHeader,
} from "./ChatStyles";
import {
  Message,
  ReceiveNotificationResponse,
  SendMessageResponse,
} from "../../types/api.types";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { idInstance, apiTokenInstance, logout } = useChatContext();

  const sendMessage = async () => {
    if (!idInstance || !apiTokenInstance || !recipientPhone || !inputValue) {
      setError("Заполните все поля.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post<SendMessageResponse>(
        `https://1103.api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: `${recipientPhone}@c.us`,
          message: inputValue,
        }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: response.data.idMessage,
          text: inputValue,
          isUser: true,
          timestamp: new Date().toISOString(),
        },
      ]);
      setInputValue("");
      setError(null);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      setError("Не удалось отправить сообщение. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomingMessages = async (): Promise<Message[]> => {
    console.log("started to receive messages");
    try {
      const response = await axios.get<ReceiveNotificationResponse>(
        `https://1103.api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
      );
      if (!response.data) return [];
      const notification = response.data;
      const incomingMessages: Message[] = [];

      if (notification.body.typeWebhook === "incomingMessageReceived") {
        const msgData = notification.body.messageData;
        if (msgData.typeMessage === "textMessage") {
          incomingMessages.push({
            id: notification.body.idMessage,
            isUser: false,
            text: msgData.textMessageData.textMessage,
            timestamp: notification.body.timestamp,
          });
        }
      }
      await axios.delete(
        `https://1103.api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`
      );
      return incomingMessages;
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
      setError("Не удалось получить сообщения. Попробуйте позже.");
      return [];
    }
  };

  const poolMessages = useCallback(async () => {
    try {
      const newMessages = await fetchIncomingMessages();
      setMessages((prev) => [...prev, ...newMessages]);
    } catch (error) {
      setError("Ошибка получения сообщений");
      console.error(error);
    }
  }, [recipientPhone]);

  useEffect(() => {
    const interval = setInterval(poolMessages, 5000);
    return () => clearInterval(interval);
  });

  return (
    <ChatContainer>
      <ChatHeader>
        <h2>Чат</h2>
        <ActionButton onClick={logout}>Выйти</ActionButton>
      </ChatHeader>
      <MessageList>
        {messages.map((message) => (
          <MessageItem key={message.id} isUser={message.isUser}>
            <div>{message.text}</div>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          </MessageItem>
        ))}
      </MessageList>
      {error && <ErrorText>{error}</ErrorText>}
      {loading && <LoadingIndicator>Отправка сообщения...</LoadingIndicator>}
      <InputContainer>
        <TextInput
          type="text"
          placeholder="Номер телефона получателя (без +)"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
        />
        <TextInput
          type="text"
          placeholder="Введите сообщение..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ActionButton onClick={sendMessage}>Отправить</ActionButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;
