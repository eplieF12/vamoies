
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  jobTitle: string;
  type: "freelancer" | "establishment";
}

const RatingModal = ({ isOpen, onClose, targetName, jobTitle, type }: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Avaliação obrigatória",
        description: "Por favor, selecione uma nota de 1 a 5 estrelas.",
        variant: "destructive"
      });
      return;
    }

    console.log("Submitting rating:", { rating, comment, targetName, jobTitle });
    
    toast({
      title: "Avaliação enviada!",
      description: `Sua avaliação de ${rating} estrelas foi registrada com sucesso.`,
    });
    
    // Reset form
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Avaliar {type === "freelancer" ? "Freelancer" : "Estabelecimento"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-1">{targetName}</h3>
            <p className="text-gray-600">{jobTitle}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Como foi sua experiência?
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-colors"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                {rating === 0 && "Clique nas estrelas para avaliar"}
                {rating === 1 && "Muito insatisfeito"}
                {rating === 2 && "Insatisfeito"}
                {rating === 3 && "Neutro"}
                {rating === 4 && "Satisfeito"}
                {rating === 5 && "Muito satisfeito"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário (opcional)
              </label>
              <Textarea
                placeholder="Conte-nos mais sobre sua experiência..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Enviar Avaliação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
