
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";

interface Applicant {
  id: number;
  name: string;
  rating: number;
  experience: string;
  avatar: string;
  location: string;
  appliedDate: string;
  status: "pending" | "approved" | "rejected";
}

interface ApplicantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  applicants: Applicant[];
  onApprove: (applicantId: number) => void;
  onReject: (applicantId: number) => void;
}

const ApplicantsModal = ({ isOpen, onClose, jobTitle, applicants, onApprove, onReject }: ApplicantsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Candidatos para: {jobTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {applicants.map((applicant) => (
            <div key={applicant.id} className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <img 
                  src={applicant.avatar} 
                  alt={applicant.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{applicant.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          {applicant.rating}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {applicant.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Candidatou-se em {applicant.appliedDate}
                        </div>
                      </div>
                      <p className="text-gray-600">{applicant.experience}</p>
                    </div>
                    
                    <Badge 
                      variant={
                        applicant.status === "approved" ? "default" : 
                        applicant.status === "rejected" ? "destructive" : "secondary"
                      }
                    >
                      {applicant.status === "approved" ? "Aprovado" : 
                       applicant.status === "rejected" ? "Rejeitado" : "Pendente"}
                    </Badge>
                  </div>

                  {applicant.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => onApprove(applicant.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Aprovar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => onReject(applicant.id)}
                      >
                        Rejeitar
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Perfil Completo
                      </Button>
                      <Button size="sm" variant="outline">
                        Enviar Mensagem
                      </Button>
                    </div>
                  )}

                  {applicant.status === "approved" && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Ver Perfil
                      </Button>
                      <Button size="sm" variant="outline">
                        Enviar Mensagem
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {applicants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum candidato ainda se inscreveu para esta vaga.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantsModal;
