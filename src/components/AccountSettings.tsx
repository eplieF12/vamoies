
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Mail, Bell, Shield, Download, Trash2 } from "lucide-react";

const AccountSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    jobAlerts: true,
    messageNotifications: true,
    darkMode: false,
    publicProfile: true,
    showEmail: false,
    showPhone: false
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Configuração atualizada",
      description: "Suas preferências foram salvas com sucesso.",
    });
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    // Simular mudança de senha
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi alterada com sucesso.",
    });
    
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const exportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seus dados serão enviados por email em breve.",
    });
  };

  const deleteAccount = () => {
    toast({
      title: "Solicitação recebida",
      description: "Entre em contato com o suporte para confirmar a exclusão.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Notificações por email</Label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="job-alerts">Alertas de novas vagas</Label>
            <Switch
              id="job-alerts"
              checked={settings.jobAlerts}
              onCheckedChange={(checked) => handleSettingChange('jobAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="message-notifications">Notificações de mensagens</Label>
            <Switch
              id="message-notifications"
              checked={settings.messageNotifications}
              onCheckedChange={(checked) => handleSettingChange('messageNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails">Emails promocionais</Label>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Privacidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="public-profile">Perfil público</Label>
            <Switch
              id="public-profile"
              checked={settings.publicProfile}
              onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-email">Mostrar email no perfil</Label>
            <Switch
              id="show-email"
              checked={settings.showEmail}
              onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-phone">Mostrar telefone no perfil</Label>
            <Switch
              id="show-phone"
              checked={settings.showPhone}
              onCheckedChange={(checked) => handleSettingChange('showPhone', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Alterar Senha */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Senha atual</Label>
            <Input
              id="current-password"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="new-password">Nova senha</Label>
            <Input
              id="new-password"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirmar nova senha</Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
            />
          </div>

          <Button onClick={handlePasswordChange}>
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      {/* Dados da Conta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Dados da Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Exportar dados</h4>
            <p className="text-sm text-gray-600 mb-4">
              Baixe uma cópia de todos os seus dados da plataforma.
            </p>
            <Button variant="outline" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados
            </Button>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2 text-red-600">Zona de Perigo</h4>
            <p className="text-sm text-gray-600 mb-4">
              Excluir sua conta permanentemente. Esta ação não pode ser desfeita.
            </p>
            <Button variant="destructive" onClick={deleteAccount}>
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
