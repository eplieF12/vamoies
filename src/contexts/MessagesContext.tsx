
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: number;
  fromId: number;
  fromName: string;
  fromType: 'freelancer' | 'establishment';
  toId: number;
  toName: string;
  toType: 'freelancer' | 'establishment';
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
  conversationId: string;
}

interface Conversation {
  id: string;
  participants: {
    freelancer: { id: number; name: string };
    establishment: { id: number; name: string };
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

interface MessagesContextType {
  messages: Message[];
  conversations: Conversation[];
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  markAsRead: (messageId: number) => void;
  getConversation: (conversationId: string) => Conversation | undefined;
  getUnreadCount: (userId: number, userType: 'freelancer' | 'establishment') => number;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      fromId: 1,
      fromName: "Hotel Marriott",
      fromType: "establishment",
      toId: 1,
      toName: "João Silva",
      toType: "freelancer",
      subject: "Vaga de Garçom",
      message: "Olá João! Vimos seu perfil e gostaríamos de conversar sobre a vaga de garçom para nosso evento corporativo.",
      timestamp: new Date().toISOString(),
      read: false,
      conversationId: "conv_1_1"
    }
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv_1_1",
      participants: {
        freelancer: { id: 1, name: "João Silva" },
        establishment: { id: 1, name: "Hotel Marriott" }
      },
      lastMessage: "Olá João! Vimos seu perfil e gostaríamos de conversar sobre a vaga de garçom para nosso evento corporativo.",
      lastMessageTime: new Date().toISOString(),
      unreadCount: 1,
      messages: []
    }
  ]);

  const sendMessage = (newMessage: Omit<Message, 'id' | 'timestamp'>) => {
    const message: Message = {
      ...newMessage,
      id: messages.length + 1,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);

    // Update or create conversation
    setConversations(prev => {
      const existingConv = prev.find(c => c.id === newMessage.conversationId);
      if (existingConv) {
        return prev.map(c => 
          c.id === newMessage.conversationId
            ? {
                ...c,
                lastMessage: newMessage.message,
                lastMessageTime: message.timestamp,
                unreadCount: c.unreadCount + 1
              }
            : c
        );
      } else {
        // Create new conversation
        const newConv: Conversation = {
          id: newMessage.conversationId,
          participants: {
            freelancer: { 
              id: newMessage.fromType === 'freelancer' ? newMessage.fromId : newMessage.toId,
              name: newMessage.fromType === 'freelancer' ? newMessage.fromName : newMessage.toName
            },
            establishment: { 
              id: newMessage.fromType === 'establishment' ? newMessage.fromId : newMessage.toId,
              name: newMessage.fromType === 'establishment' ? newMessage.fromName : newMessage.toName
            }
          },
          lastMessage: newMessage.message,
          lastMessageTime: message.timestamp,
          unreadCount: 1,
          messages: []
        };
        return [...prev, newConv];
      }
    });
  };

  const markAsRead = (messageId: number) => {
    setMessages(prev => 
      prev.map(m => m.id === messageId ? { ...m, read: true } : m)
    );
  };

  const getConversation = (conversationId: string) => {
    return conversations.find(c => c.id === conversationId);
  };

  const getUnreadCount = (userId: number, userType: 'freelancer' | 'establishment') => {
    return messages.filter(m => 
      m.toId === userId && m.toType === userType && !m.read
    ).length;
  };

  return (
    <MessagesContext.Provider value={{
      messages,
      conversations,
      sendMessage,
      markAsRead,
      getConversation,
      getUnreadCount
    }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within MessagesProvider');
  }
  return context;
};
