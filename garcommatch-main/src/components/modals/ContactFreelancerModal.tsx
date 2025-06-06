
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMessages } from "@/contexts/MessagesContext";

interface ContactFreelancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  freelancer: {
    id: number;
    name: string;
    category: string;
  };
}

const ContactFreelancerModal = ({ isOpen, onClose, freelancer }: ContactFreelancerModalProps) => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const { toast } = useToast();
  const { sendMessage } = useMessages();

  // Simulando estabelecimento logado
  const currentEstablishment = { id: 1, name: "Hotel Marriott" };

  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const conversationId = `conv_${currentEstablishment.id}_${freelancer.id}`;

    sendMessage({
      fromId: currentEstablishment.id,
      fromName: currentEstablishment.name,
      fromType: "establishment",
      toId: freelancer.id,
      toName: freelancer.name,
      toType: "freelancer",
      subject,
      message,
      read: false,
      conversationId
    });

    toast({
      title: "Mensagem enviada!",
      description: `Sua mensagem foi enviada para ${freelancer.name}`,
    });

    setMessage("");
    setSubject("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contatar {freelancer.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              placeholder="Ex: Proposta de trabalho para evento"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Descreva os detalhes do trabalho..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Após enviar a mensagem, você poderá continuar a conversa na página de Mensagens.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSendMessage}>
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFreelancerModal;
