import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Calendar, Filter } from "lucide-react";
import ContactFreelancerModal from "@/components/modals/ContactFreelancerModal";

const FreelancersList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);

  const freelancers = [
    {
      id: 1,
      name: "João Silva",
      category: "Garçom",
      city: "São Paulo, SP",
      rating: 4.8,
      completedJobs: 45,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      description: "Garçom experiente com 3 anos de atuação em eventos corporativos e restaurantes.",
      availability: "Disponível",
      hourlyRate: "R$ 25/hora"
    },
    {
      id: 2,
      name: "Ana Costa",
      category: "Promoter",
      city: "São Paulo, SP",
      rating: 4.9,
      completedJobs: 32,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      description: "Promoter carismática especializada em lançamentos de produtos e eventos de marca.",
      availability: "Ocupada",
      hourlyRate: "R$ 30/hora"
    },
    {
      id: 3,
      name: "Carlos Santos",
      category: "Barman",
      city: "Rio de Janeiro, RJ",
      rating: 4.7,
      completedJobs: 67,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "Barman profissional com certificação em coquetelaria e experiência em eventos premium.",
      availability: "Disponível",
      hourlyRate: "R$ 35/hora"
    },
    {
      id: 4,
      name: "Maria Oliveira",
      category: "Atendente",
      city: "São Paulo, SP",
      rating: 4.6,
      completedJobs: 28,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      description: "Atendente cordial com experiência em atendimento ao cliente e eventos corporativos.",
      availability: "Disponível",
      hourlyRate: "R$ 22/hora"
    }
  ];

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || freelancer.category === selectedCategory;
    const matchesCity = selectedCity === "all" || freelancer.city.includes(selectedCity);
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const handleContactFreelancer = (freelancer: any) => {
    setSelectedFreelancer(freelancer);
    setIsContactModalOpen(true);
  };

  const handleViewProfile = (freelancerId: number) => {
    navigate(`/freelancer/${freelancerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Freelancers Disponíveis
          </h1>
          <p className="text-gray-600">Encontre o profissional ideal para seu projeto</p>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="Garçom">Garçom</SelectItem>
                  <SelectItem value="Atendente">Atendente</SelectItem>
                  <SelectItem value="Promoter">Promoter</SelectItem>
                  <SelectItem value="Barman">Barman</SelectItem>
                  <SelectItem value="Auxiliar de Eventos">Auxiliar de Eventos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  <SelectItem value="São Paulo">São Paulo</SelectItem>
                  <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
                  <SelectItem value="Salvador">Salvador</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Freelancers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{freelancer.name}</h3>
                    <Badge variant="secondary" className="mb-2">{freelancer.category}</Badge>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {freelancer.city}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                      {freelancer.rating} • {freelancer.completedJobs} trabalhos
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {freelancer.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <span className="font-medium text-green-600">{freelancer.hourlyRate}</span>
                  </div>
                  <Badge 
                    variant={freelancer.availability === "Disponível" ? "default" : "secondary"}
                    className={freelancer.availability === "Disponível" ? "bg-green-100 text-green-800" : ""}
                  >
                    {freelancer.availability}
                  </Badge>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContactFreelancer(freelancer)}
                  >
                    Contatar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewProfile(freelancer.id)}
                  >
                    Ver Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFreelancers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum freelancer encontrado com os filtros aplicados.
            </p>
          </div>
        )}
      </div>

      {selectedFreelancer && (
        <ContactFreelancerModal
          isOpen={isContactModalOpen}
          onClose={() => {
            setIsContactModalOpen(false);
            setSelectedFreelancer(null);
          }}
          freelancer={selectedFreelancer}
        />
      )}
    </div>
  );
};

export default FreelancersList;
