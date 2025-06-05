
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Phone, Video } from "lucide-react";
import { useMessages } from "@/contexts/MessagesContext";

const Messages = () => {
  const { conversations, messages, sendMessage, markAsRead } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  
  // Simulando usuário logado (freelancer)
  const currentUser = { id: 1, name: "João Silva", type: "freelancer" as const };

  const selectedConv = selectedConversation ? conversations.find(c => c.id === selectedConversation) : null;
  const conversationMessages = selectedConversation 
    ? messages.filter(m => m.conversationId === selectedConversation)
    : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !selectedConv) return;

    const otherParticipant = selectedConv.participants.establishment;
    
    sendMessage({
      fromId: currentUser.id,
      fromName: currentUser.name,
      fromType: currentUser.type,
      toId: otherParticipant.id,
      toName: otherParticipant.name,
      toType: "establishment",
      subject: "Resposta",
      message: newMessage,
      read: false,
      conversationId: selectedConversation
    });

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mensagens
          </h1>
          <p className="text-gray-600">Gerencie suas conversas com estabelecimentos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Lista de Conversas */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Conversas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {conversation.participants.establishment.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {conversation.participants.establishment.name}
                        </h3>
                        <p className="text-xs text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(conversation.lastMessageTime).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConv ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {selectedConv.participants.establishment.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConv.participants.establishment.name}</h3>
                        <p className="text-sm text-gray-600">Online</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.fromType === currentUser.type ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          message.fromType === currentUser.type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.fromType === currentUser.type ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Selecione uma conversa para começar</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
