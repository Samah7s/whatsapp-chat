import React, { createContext, useContext, useState } from "react";

interface ChatContextType {
  idInstance: string | null;
  apiTokenInstance: string | null;
  isLogged: boolean;
  login: (idInstance: string, apiTokenInstance: string) => void;
  logout: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [idInstance, setIdInstance] = useState<string | null>(null);
  const [apiTokenInstance, setApiTokenInstance] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const login = (idInstance: string, apiTokenInstance: string) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
    setIsLogged(true);
  };
  const logout = () => {
    setIdInstance(null);
    setApiTokenInstance(null);
    setIsLogged(false);
  };
  return (
    <ChatContext.Provider
      value={{ idInstance, apiTokenInstance, isLogged, login, logout }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext hook must be used within chatProvider");
  }
  return context;
};
