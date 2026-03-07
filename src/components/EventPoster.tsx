import React from "react";

interface EventPosterProps {
  src: string;
  alt?: string;
}

/**
 * Reusable square poster component used throughout the site.
 * Ensures every poster is the same fixed size and is centered with
 * consistent spacing/shadow.
 */
export default function EventPoster({ src, alt = "Event poster" }: EventPosterProps) {
  return (
    <div className="w-[350px] h-[350px] mx-auto mb-12">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain rounded-xl shadow-md"
      />
    </div>
  );
}
