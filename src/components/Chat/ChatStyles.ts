import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ChatHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 300px;
  overflow-y: auto;
  border-bottom: 1px solid #e5e7eb;
`;

export const MessageItem = styled.li<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin: 8px 0;

  & > div {
    max-width: 70%;
    padding: 10px;
    border-radius: 8px;
    word-wrap: break-word;
    background-color: ${(props) => (props.isUser ? "#dcfce7" : "#f3f4f6")};
    color: ${(props) => (props.isUser ? "#16a34a" : "#111827")};
    font-size: 1rem;
  }

  & > span {
    font-size: 0.8em;
    color: #6b7280;
    margin-left: 10px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
`;

export const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #16a34a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #15803d;
  }
`;

export const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.9em;
  margin-top: 10px;
`;

export const LoadingIndicator = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 0.9em;
  color: #6b7280;
`;
