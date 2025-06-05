
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Star } from "lucide-react";

interface VerificationBadgeProps {
  type: "identity" | "professional" | "premium";
  className?: string;
}

const VerificationBadge = ({ type, className = "" }: VerificationBadgeProps) => {
  const getIconAndText = () => {
    switch (type) {
      case "identity":
        return {
          icon: Shield,
          text: "ID Verificado",
          variant: "default" as const,
          className: "bg-blue-100 text-blue-800"
        };
      case "professional":
        return {
          icon: CheckCircle,
          text: "Profissional",
          variant: "secondary" as const,
          className: "bg-green-100 text-green-800"
        };
      case "premium":
        return {
          icon: Star,
          text: "Premium",
          variant: "default" as const,
          className: "bg-yellow-100 text-yellow-800"
        };
      default:
        return {
          icon: Shield,
          text: "Verificado",
          variant: "default" as const,
          className: "bg-gray-100 text-gray-800"
        };
    }
  };

  const { icon: Icon, text, className: badgeClassName } = getIconAndText();

  return (
    <Badge className={`${badgeClassName} ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {text}
    </Badge>
  );
};

export default VerificationBadge;
