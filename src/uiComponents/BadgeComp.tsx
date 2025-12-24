import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
interface Props {
  badgeTitle: string | number;
  title?: string;
  className?: string;
  variant: "default" | "destructive" | "outline" | "secondary";
  titleStyle?: string;
  fn?: () => void;
}

export default function BadgeComp({
  badgeTitle = 0,
  title,
  className,
  variant,
  titleStyle,
  fn,
}: Props) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Badge
        variant={variant}
        className={cn(`${className}`)}
        onClick={fn}
      >
        {badgeTitle}
      </Badge>
      {title && <p className={cn(`${titleStyle}`)}> {title}</p>}
    </div>
  );
}
