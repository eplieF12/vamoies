
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, Users, Calendar, Download } from "lucide-react";

const monthlyData = [
  { month: "Jan", revenue: 1200, jobs: 8 },
  { month: "Fev", revenue: 1800, jobs: 12 },
  { month: "Mar", revenue: 2200, jobs: 15 },
  { month: "Abr", revenue: 1900, jobs: 13 },
  { month: "Mai", revenue: 2800, jobs: 18 },
  { month: "Jun", revenue: 3200, jobs: 22 }
];

const categoryData = [
  { name: "Garçom", value: 35, color: "#8884d8" },
  { name: "Atendente", value: 25, color: "#82ca9d" },
  { name: "Promoter", value: 20, color: "#ffc658" },
  { name: "Barman", value: 15, color: "#ff7300" },
  { name: "Outros", value: 5, color: "#00ff88" }
];

interface ReportsSectionProps {
  userType: "freelancer" | "establishment" | "admin";
}

const ReportsSection = ({ userType }: ReportsSectionProps) => {
  const getStatsCards = () => {
    if (userType === "freelancer") {
      return [
        { title: "Ganhos Totais", value: "R$ 12.400", icon: DollarSign, trend: "+18%" },
        { title: "Trabalhos Concluídos", value: "88", icon: Calendar, trend: "+12%" },
        { title: "Avaliação Média", value: "4.8", icon: TrendingUp, trend: "+0.2%" },
        { title: "Taxa de Aprovação", value: "94%", icon: Users, trend: "+5%" }
      ];
    } else if (userType === "establishment") {
      return [
        { title: "Gastos Totais", value: "R$ 24.800", icon: DollarSign, trend: "+22%" },
        { title: "Vagas Publicadas", value: "45", icon: Calendar, trend: "+8%" },
        { title: "Freelancers Contratados", value: "78", icon: Users, trend: "+15%" },
        { title: "Avaliação Média", value: "4.6", icon: TrendingUp, trend: "+0.1%" }
      ];
    } else {
      return [
        { title: "Receita da Plataforma", value: "R$ 4.680", icon: DollarSign, trend: "+25%" },
        { title: "Total de Transações", value: "156", icon: Calendar, trend: "+18%" },
        { title: "Usuários Ativos", value: "342", icon: Users, trend: "+12%" },
        { title: "Taxa de Crescimento", value: "15%", icon: TrendingUp, trend: "+3%" }
      ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {getStatsCards().map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {stat.trend}
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {userType === "freelancer" ? "Ganhos Mensais" : 
                 userType === "establishment" ? "Gastos Mensais" : "Receita Mensal"}
              </CardTitle>
              <Select defaultValue="6months">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 meses</SelectItem>
                  <SelectItem value="6months">6 meses</SelectItem>
                  <SelectItem value="1year">1 ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, "Valor"]} />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>
              {userType === "freelancer" ? "Categorias de Trabalho" : 
               userType === "establishment" ? "Tipos de Vaga Mais Contratados" : "Distribuição por Categoria"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Tendências de Performance</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="jobs" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Trabalhos"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Receita"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
