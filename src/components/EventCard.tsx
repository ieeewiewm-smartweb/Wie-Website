import { memo } from "react";
import { Card } from "@/components/ui/card";
import { type Event as ContentEvent } from "@/types/content";
import { CalendarIcon, MapPinIcon, ChevronRight } from "lucide-react";

interface EventCardProps {
  event: ContentEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="w-[320px] h-[480px] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-100 group rounded-2xl">
      {/* Poster section - fixed height with padding */}
      <div className="h-[260px] flex items-center justify-center p-4 bg-gray-50 overflow-hidden rounded-t-2xl">
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Content section - remaining height */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
            {event.title}
          </h3>

          <div className="flex items-center gap-1.5 text-purple-700 font-medium mt-2">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs">{event.date}</span>
          </div>

          <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mt-3">
            {event.description}
          </p>
        </div>

        <div>
          {event.location && (
            <div className="flex items-center gap-1 mt-3 text-gray-500">
              <MapPinIcon className="h-3 w-3 shrink-0" />
              <span className="text-xs font-medium truncate">{event.location}</span>
            </div>
          )}

          {/* Learn More */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-purple-600 group-hover:text-purple-700 font-semibold transition-colors">
            <span className="text-xs">Learn More</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(EventCard);
