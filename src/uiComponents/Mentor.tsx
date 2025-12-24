import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  IconBrandInstagram,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";

export default function Mentor() {
  return (
    <Item variant="outline">
      <ItemMedia>
        <img
          src={"/Educator.png"}
          alt={"album cover"}
          className="h-30 w-30 object-cover"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-lg font-semibold">
          Gokul Chabbra
          {/* <span className="text-muted-foreground">helo</span> */}
        </ItemTitle>
        <ItemDescription className="flex gap-4">
          <IconBrandInstagram size={40} className="text-pink-600" />
          <IconBrandYoutubeFilled size={"40"} className="text-red-600" />
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
