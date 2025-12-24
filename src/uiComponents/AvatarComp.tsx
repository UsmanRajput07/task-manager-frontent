import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarComp({ name }: { name: string }) {
  const fistLetter = name.charAt(0);
  const lastLetter = name.split(" ")[1]?.charAt(0);
  return (
    <Item variant="outline" className="bg-blue-200 rounded-md">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarFallback className="text-primary uppercase">
            {fistLetter}
            {lastLetter}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name || "Evil Rabbit"}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
