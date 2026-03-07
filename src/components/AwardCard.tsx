import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Award } from "@/types/content";
import { AwardIcon } from "lucide-react";

interface AwardCardProps {
  award: Award;
}

const AwardCard = ({ award }: AwardCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg flex flex-col">
      <div className="aspect-video overflow-hidden">
        <img 
          src={award.imageUrl} 
          alt={award.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AwardIcon className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg text-purple-800">{award.title}</CardTitle>
        </div>
        <CardDescription>{award.date}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap break-words">{award.description}</p>
      </CardContent>
    </Card>
  );
};

export default memo(AwardCard);
