
import { useState } from "react";
import { Bell, X, Check, Clock, DollarSign, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Notification {
  id: number;
  type: "application" | "payment" | "message" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "application",
      title: "Nova candidatura",
      message: "Carlos Silva se candidatou para Garçom para Evento Corporativo",
      timestamp: "2 min atrás",
      read: false
    },
    {
      id: 2,
      type: "payment",
      title: "Pagamento recebido",
      message: "Você recebeu R$ 180,00 pelo trabalho concluído",
      timestamp: "1 hora atrás",
      read: false
    },
    {
      id: 3,
      type: "message",
      title: "Nova mensagem",
      message: "Restaurante Villa Italiana enviou uma mensagem",
      timestamp: "3 horas atrás",
      read: true
    }
  ]);

  const unreadCount = 0; // Forçar para 0 para ocultar o badge de notificações

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "payment": return <DollarSign className="w-4 h-4 text-green-600" />;
      case "message": return <MessageCircle className="w-4 h-4 text-blue-600" />;
      case "application": return <Clock className="w-4 h-4 text-orange-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Notificações</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                !notification.read ? "bg-blue-50" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
