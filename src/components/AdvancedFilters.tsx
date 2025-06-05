
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { X, Filter } from "lucide-react";

interface AdvancedFiltersProps {
  isOpen: boolean;
  onToggle: () => void;
  onApplyFilters: (filters: any) => void;
}

const AdvancedFilters = ({ isOpen, onToggle, onApplyFilters }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    minRating: [0],
    maxDistance: [50],
    priceRange: [0, 500],
    experience: "",
    skills: [] as string[],
    verified: false
  });

  const availableSkills = [
    "Atendimento ao Cliente",
    "Eventos Corporativos", 
    "Coquetelaria",
    "Organização",
    "Vendas",
    "Comunicação",
    "Liderança",
    "Idiomas"
  ];

  const addSkill = (skill: string) => {
    if (!filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onToggle();
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      category: "",
      minRating: [0],
      maxDistance: [50],
      priceRange: [0, 500],
      experience: "",
      skills: [],
      verified: false
    });
  };

  if (!isOpen) return null;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filtros Avançados</h3>
          <Button variant="outline" size="sm" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Localização</label>
            <Input
              placeholder="Digite a cidade"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Categoria</label>
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Garçom">Garçom</SelectItem>
                <SelectItem value="Atendente">Atendente</SelectItem>
                <SelectItem value="Promoter">Promoter</SelectItem>
                <SelectItem value="Barman">Barman</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Experiência</label>
            <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Nível de experiência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer</SelectItem>
                <SelectItem value="iniciante">Iniciante (0-1 ano)</SelectItem>
                <SelectItem value="intermediario">Intermediário (1-3 anos)</SelectItem>
                <SelectItem value="avancado">Avançado (3+ anos)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Avaliação Mínima: {filters.minRating[0]}⭐
            </label>
            <Slider
              value={filters.minRating}
              onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value }))}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Distância Máxima: {filters.maxDistance[0]}km
            </label>
            <Slider
              value={filters.maxDistance}
              onValueChange={(value) => setFilters(prev => ({ ...prev, maxDistance: value }))}
              max={100}
              min={1}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Faixa de Preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
            </label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
              max={1000}
              min={0}
              step={25}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block">Habilidades</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {filters.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="cursor-pointer">
                {skill}
                <X 
                  className="w-3 h-3 ml-1" 
                  onClick={() => removeSkill(skill)}
                />
              </Badge>
            ))}
          </div>
          <Select onValueChange={addSkill}>
            <SelectTrigger>
              <SelectValue placeholder="Adicionar habilidade" />
            </SelectTrigger>
            <SelectContent>
              {availableSkills.filter(skill => !filters.skills.includes(skill)).map((skill) => (
                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
          <Button onClick={handleApply}>
            Aplicar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;
