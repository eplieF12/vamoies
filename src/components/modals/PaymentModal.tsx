
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Copy, CheckCircle, AlertCircle, CreditCard, Smartphone, DollarSign, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "freelancer" | "establishment" | "admin";
  jobTitle?: string;
  amount?: string;
  freelancerName?: string;
  pixKey?: string;
}

const PaymentModal = ({ isOpen, onClose, type, jobTitle, amount, freelancerName, pixKey }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [paymentData, setPaymentData] = useState({
    pixKey: pixKey || "",
    mercadoPagoEmail: "",
    pagseguroEmail: "",
    paypalEmail: "",
    amount: amount || "",
    description: jobTitle || ""
  });
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "completed" | "failed">("pending");
  const { toast } = useToast();

  const paymentMethods = [
    { value: "pix", label: "PIX", icon: <Smartphone className="w-4 h-4" />, color: "text-green-600" },
    { value: "mercadopago", label: "Mercado Pago", icon: <CreditCard className="w-4 h-4" />, color: "text-blue-600" },
    { value: "pagseguro", label: "PagSeguro", icon: <Shield className="w-4 h-4" />, color: "text-orange-600" },
    { value: "paypal", label: "PayPal", icon: <DollarSign className="w-4 h-4" />, color: "text-indigo-600" }
  ];

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Chave copiada!",
      description: "A chave foi copiada para a área de transferência.",
    });
  };

  const handleSavePaymentInfo = () => {
    console.log("Saving payment info:", { paymentMethod, paymentData });
    toast({
      title: "Informações salvas!",
      description: `Seus dados de ${paymentMethods.find(m => m.value === paymentMethod)?.label} foram cadastrados com sucesso.`,
    });
    onClose();
  };

  const handleProcessPayment = () => {
    setPaymentStatus("processing");
    const methodLabel = paymentMethods.find(m => m.value === paymentMethod)?.label;
    
    setTimeout(() => {
      setPaymentStatus("completed");
      toast({
        title: "Pagamento processado!",
        description: `Pagamento de ${paymentData.amount} foi enviado via ${methodLabel}.`,
      });
    }, 2000);
  };

  const getCurrentKey = () => {
    switch (paymentMethod) {
      case "pix": return paymentData.pixKey;
      case "mercadopago": return paymentData.mercadoPagoEmail;
      case "pagseguro": return paymentData.pagseguroEmail;
      case "paypal": return paymentData.paypalEmail;
      default: return "";
    }
  };

  const renderPaymentMethodConfig = () => {
    switch (paymentMethod) {
      case "pix":
        return (
          <div>
            <Label htmlFor="pixKey">Sua Chave PIX</Label>
            <Input
              id="pixKey"
              placeholder="Digite sua chave PIX (CPF, e-mail, telefone ou chave aleatória)"
              value={paymentData.pixKey}
              onChange={(e) => setPaymentData({...paymentData, pixKey: e.target.value})}
            />
          </div>
        );
      case "mercadopago":
        return (
          <div>
            <Label htmlFor="mercadoPagoEmail">E-mail do Mercado Pago</Label>
            <Input
              id="mercadoPagoEmail"
              type="email"
              placeholder="seu@email.com"
              value={paymentData.mercadoPagoEmail}
              onChange={(e) => setPaymentData({...paymentData, mercadoPagoEmail: e.target.value})}
            />
          </div>
        );
      case "pagseguro":
        return (
          <div>
            <Label htmlFor="pagseguroEmail">E-mail do PagSeguro</Label>
            <Input
              id="pagseguroEmail"
              type="email"
              placeholder="seu@email.com"
              value={paymentData.pagseguroEmail}
              onChange={(e) => setPaymentData({...paymentData, pagseguroEmail: e.target.value})}
            />
          </div>
        );
      case "paypal":
        return (
          <div>
            <Label htmlFor="paypalEmail">E-mail do PayPal</Label>
            <Input
              id="paypalEmail"
              type="email"
              placeholder="seu@email.com"
              value={paymentData.paypalEmail}
              onChange={(e) => setPaymentData({...paymentData, paypalEmail: e.target.value})}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            {type === "freelancer" && "Gerenciar Métodos de Pagamento"}
            {type === "establishment" && "Realizar Pagamento"}
            {type === "admin" && "Configurações de Pagamento"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Payment Method Selection */}
          <div>
            <Label>Método de Pagamento</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    <div className="flex items-center space-x-2">
                      <span className={method.color}>{method.icon}</span>
                      <span>{method.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {type === "freelancer" && (
            <>
              {renderPaymentMethodConfig()}
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Cadastre seus dados para receber pagamentos</li>
                  <li>• Receba no mesmo dia após confirmação do trabalho</li>
                  <li>• A plataforma retém 10% como taxa de serviço</li>
                  <li>• {paymentMethod === "pix" && "PIX: Transferência instantânea"}
                      {paymentMethod === "mercadopago" && "Mercado Pago: Receba em até 1 dia útil"}
                      {paymentMethod === "pagseguro" && "PagSeguro: Receba em até 1 dia útil"}
                      {paymentMethod === "paypal" && "PayPal: Receba em até 2 dias úteis"}
                  </li>
                </ul>
              </div>

              <Button onClick={handleSavePaymentInfo} className="w-full">
                Salvar Informações
              </Button>
            </>
          )}

          {type === "establishment" && (
            <>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold">Pagamento para {freelancerName}</h3>
                    <p className="text-sm text-gray-600">{jobTitle}</p>
                    <p className="text-2xl font-bold text-green-600">{amount}</p>
                    <Badge variant="outline">
                      {paymentMethods.find(m => m.value === paymentMethod)?.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {paymentStatus === "pending" && (
                <>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      {paymentMethod === "pix" && "Chave PIX do freelancer:"}
                      {paymentMethod === "mercadopago" && "E-mail Mercado Pago do freelancer:"}
                      {paymentMethod === "pagseguro" && "E-mail PagSeguro do freelancer:"}
                      {paymentMethod === "paypal" && "E-mail PayPal do freelancer:"}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Input value={getCurrentKey()} readOnly />
                      <Button size="sm" variant="outline" onClick={() => handleCopyKey(getCurrentKey())}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800">Instruções de Pagamento:</p>
                        <ul className="text-yellow-700 mt-1 space-y-1">
                          <li>• Faça o pagamento usando {paymentMethods.find(m => m.value === paymentMethod)?.label}</li>
                          <li>• Valor total: {amount} + R$ {(parseFloat(amount?.replace('R$ ', '') || '0') * 0.1).toFixed(2)} (taxa)</li>
                          <li>• Confirme o pagamento no botão abaixo</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleProcessPayment} className="w-full">
                    Confirmar Pagamento Realizado
                  </Button>
                </>
              )}

              {paymentStatus === "processing" && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Processando pagamento...</p>
                </div>
              )}

              {paymentStatus === "completed" && (
                <div className="text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                  <div>
                    <h3 className="font-semibold text-green-800">Pagamento Confirmado!</h3>
                    <p className="text-sm text-gray-600">O freelancer receberá conforme prazo do método</p>
                  </div>
                  <Button onClick={onClose} variant="outline" className="w-full">
                    Fechar
                  </Button>
                </div>
              )}
            </>
          )}

          {type === "admin" && (
            <>
              {renderPaymentMethodConfig()}
              
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Comissões da Plataforma:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 10% de cada transação é retido automaticamente</li>
                  <li>• Valores são transferidos conforme método escolhido</li>
                  <li>• Relatório completo no painel administrativo</li>
                </ul>
              </div>

              <Button onClick={handleSavePaymentInfo} className="w-full">
                Salvar Configurações
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
