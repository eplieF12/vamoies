
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, Clock, ArrowLeft, MessageCircle } from "lucide-react";
import { useState } from "react";
import ContactFreelancerModal from "@/components/modals/ContactFreelancerModal";

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Mock data - em uma aplicação real, isso viria do backend
  const freelancer = {
    id: parseInt(id || "1"),
    name: "João Silva",
    category: "Garçom",
    city: "São Paulo, SP",
    rating: 4.8,
    completedJobs: 45,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "Garçom experiente com 3 anos de atuação em eventos corporativos e restaurantes. Especializado em atendimento de alta qualidade e eventos premium.",
    availability: "Disponível",
    hourlyRate: "R$ 25/hora",
    experience: "3 anos",
    skills: ["Atendimento ao Cliente", "Eventos Corporativos", "Coquetelaria Básica", "Organização"],
    portfolio: [
      {
        title: "Evento Corporativo - Empresa XYZ",
        date: "Dezembro 2023",
        description: "Atendimento em evento de fim de ano com 200 pessoas"
      },
      {
        title: "Casamento - Família Silva",
        date: "Novembro 2023", 
        description: "Serviço de garçom em cerimônia de casamento"
      }
    ],
    reviews: [
      {
        client: "Maria Santos",
        rating: 5,
        comment: "Excelente profissional, muito atencioso e pontual.",
        date: "15/12/2023"
      },
      {
        client: "Carlos Oliveira", 
        rating: 4,
        comment: "Bom trabalho, recomendo!",
        date: "10/11/2023"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Perfil Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{freelancer.name}</h1>
                    <Badge variant="secondary" className="mb-3">{freelancer.category}</Badge>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center justify-center md:justify-start">
                        <MapPin className="w-4 h-4 mr-2" />
                        {freelancer.city}
                      </div>
                      <div className="flex items-center justify-center md:justify-start">
                        <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                        {freelancer.rating} • {freelancer.completedJobs} trabalhos concluídos
                      </div>
                      <div className="flex items-center justify-center md:justify-start">
                        <Clock className="w-4 h-4 mr-2" />
                        {freelancer.experience} de experiência
                      </div>
                    </div>

                    <p className="mt-4 text-gray-700">{freelancer.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Habilidades */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfólio */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Experiências Recentes</h3>
                <div className="space-y-4">
                  {freelancer.portfolio.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{item.date}</p>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Avaliações */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Avaliações</h3>
                <div className="space-y-4">
                  {freelancer.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.client}</span>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-1">{review.comment}</p>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informações</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Valor por hora</span>
                    <p className="font-semibold text-green-600">{freelancer.hourlyRate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Disponibilidade</span>
                    <Badge 
                      variant="default"
                      className="bg-green-100 text-green-800 block mt-1 w-fit"
                    >
                      {freelancer.availability}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Button 
                  className="w-full mb-3"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contatar
                </Button>
                <Button variant="outline" className="w-full">
                  Enviar Proposta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ContactFreelancerModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        freelancer={freelancer}
      />
    </div>
  );
};

export default FreelancerProfile;
