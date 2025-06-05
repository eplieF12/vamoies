
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, DollarSign, User } from "lucide-react";

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: number;
    title: string;
    establishment: string;
    location: string;
    date: string;
    time: string;
    payment: string;
    description?: string;
    requirements?: string;
    type: string;
    urgent?: boolean;
  };
  onApply?: () => void;
  userType?: "freelancer" | "establishment";
}

const JobDetailsModal = ({ isOpen, onClose, job, onApply, userType = "freelancer" }: JobDetailsModalProps) => {
  const handleApply = () => {
    console.log("Applying to job:", job.id);
    if (onApply) onApply();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{job.title}</span>
            {job.urgent && <Badge variant="destructive">Urgente</Badge>}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Establishment Info */}
          <div>
            <h3 className="font-semibold text-lg mb-2">{job.establishment}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {job.date}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {job.time}
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                {job.payment}
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                {job.type}
              </div>
            </div>
          </div>

          {/* Description */}
          {job.description && (
            <div>
              <h4 className="font-semibold mb-2">Descrição</h4>
              <p className="text-gray-600">{job.description}</p>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h4 className="font-semibold mb-2">Requisitos</h4>
              <p className="text-gray-600">{job.requirements}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            {userType === "freelancer" && (
              <Button onClick={handleApply}>
                Candidatar-se
              </Button>
            )}
            {userType === "establishment" && (
              <Button variant="outline">
                Editar Vaga
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;
