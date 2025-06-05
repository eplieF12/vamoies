
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, Search, MessageCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Cadastre-se",
      description: "Crie seu perfil como freelancer ou estabelecimento em poucos minutos",
      details: ["Informações básicas", "Foto de perfil", "Área de atuação", "Disponibilidade"]
    },
    {
      icon: Search,
      title: "2. Encontre oportunidades",
      description: "Browse vagas disponíveis ou seja encontrado por estabelecimentos",
      details: ["Filtros por localização", "Tipo de trabalho", "Data e horário", "Faixa de pagamento"]
    },
    {
      icon: MessageCircle,
      title: "3. Conecte-se",
      description: "Converse diretamente com quem está contratando",
      details: ["Chat integrado", "Detalhes do trabalho", "Confirmação de presença", "Endereço do local"]
    },
    {
      icon: Star,
      title: "4. Trabalhe e avalie",
      description: "Execute o trabalho e construa sua reputação na plataforma",
      details: ["Check-in no local", "Execução do trabalho", "Avaliação mútua", "Histórico profissional"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Como Funciona
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conectamos freelancers talentosos com estabelecimentos que precisam de profissionais 
            qualificados de forma rápida e segura.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, idx) => (
                    <li key={idx}>• {detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Para Freelancers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Para Freelancers</h2>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Encontre trabalhos próximos a você
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Escolha seus horários e disponibilidade
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Construa sua reputação profissional
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Receba pagamentos seguros
                </li>
              </ul>
              <Link to="/register">
                <Button className="w-full">Cadastre-se como Freelancer</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Para Estabelecimentos</h2>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Encontre profissionais qualificados rapidamente
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Publique vagas em poucos cliques
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Avalie e seja avaliado
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Gerencie suas contratações
                </li>
              </ul>
              <Link to="/register">
                <Button variant="outline" className="w-full">Cadastre-se como Estabelecimento</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-gray-600 mb-8">
            Junte-se a centenas de profissionais e estabelecimentos que já fazem parte da nossa comunidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="px-8">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
