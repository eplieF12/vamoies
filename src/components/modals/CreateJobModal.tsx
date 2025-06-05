
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: any) => void;
}

const CreateJobModal = ({ isOpen, onClose, onSubmit }: CreateJobModalProps) => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    payment: "",
    requirements: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.location || !date || !formData.startTime || !formData.endTime || !formData.payment) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newJob = {
      ...formData,
      date: date ? format(date, "dd/MM/yyyy") : "",
      id: Date.now(),
      applicants: 0,
      status: "active"
    };
    
    onSubmit(newJob);
    
    // Reset form
    setFormData({
      title: "",
      category: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      payment: "",
      requirements: ""
    });
    setDate(undefined);
    
    toast({
      title: "Vaga criada!",
      description: "Sua vaga foi publicada com sucesso.",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Vaga</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título da Vaga *</Label>
            <Input
              id="title"
              placeholder="Ex: Garçom para evento corporativo"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Categoria *</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))} value={formData.category}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Garçom">Garçom</SelectItem>
                <SelectItem value="Atendente">Atendente</SelectItem>
                <SelectItem value="Promoter">Promoter</SelectItem>
                <SelectItem value="Barman">Barman</SelectItem>
                <SelectItem value="Auxiliar de Eventos">Auxiliar de Eventos</SelectItem>
                <SelectItem value="Cozinheiro">Cozinheiro</SelectItem>
                <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                <SelectItem value="Segurança">Segurança</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Local *</Label>
            <Input
              id="location"
              placeholder="Ex: Hotel Marriott - São Paulo, SP"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="startTime">Horário Início *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="endTime">Horário Fim *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="payment">Pagamento *</Label>
            <Input
              id="payment"
              placeholder="Ex: R$ 150 ou R$ 25/hora"
              value={formData.payment}
              onChange={(e) => setFormData(prev => ({ ...prev, payment: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              placeholder="Descreva as responsabilidades e detalhes do trabalho..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="requirements">Requisitos (opcional)</Label>
            <Textarea
              id="requirements"
              placeholder="Ex: Experiência mínima de 1 ano, disponibilidade para fins de semana..."
              value={formData.requirements}
              onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Publicar Vaga
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;
