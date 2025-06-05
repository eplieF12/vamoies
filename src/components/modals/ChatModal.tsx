
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Phone, Video, MoreVertical, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  sender: "user" | "other";
  message: string;
  timestamp: string;
  type?: "text" | "image" | "file";
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactAvatar: string;
  jobTitle?: string;
  isOnline?: boolean;
}

const ChatModal = ({ isOpen, onClose, contactName, contactAvatar, jobTitle, isOnline = false }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "other",
      message: "Olá! Vi que você se candidatou para nossa vaga. Gostaria de conversar sobre os detalhes.",
      timestamp: "10:30"
    },
    {
      id: 2,
      sender: "user",
      message: "Olá! Sim, tenho interesse. Pode me falar mais sobre o evento?",
      timestamp: "10:32"
    },
    {
      id: 3,
      sender: "other",
      message: "É um evento corporativo no Hotel Marriott, das 19h às 23h. Você teria disponibilidade?",
      timestamp: "10:35"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "user",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, message]);
      setNewMessage("");

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response after 2 seconds
        setTimeout(() => {
          const response: Message = {
            id: messages.length + 2,
            sender: "other",
            message: "Perfeito! Vou enviar mais detalhes sobre o horário e local.",
            timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
          };
          setMessages(prev => [...prev, response]);
        }, 1000);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={contactAvatar} />
                  <AvatarFallback>{contactName.charAt(0)}</AvatarFallback>
                </Avatar>
                {isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <DialogTitle className="text-base">{contactName}</DialogTitle>
                {jobTitle && <p className="text-sm text-gray-600">{jobTitle}</p>}
                <p className="text-xs text-gray-500">
                  {isOnline ? "Online agora" : "Visto por último há 1h"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
