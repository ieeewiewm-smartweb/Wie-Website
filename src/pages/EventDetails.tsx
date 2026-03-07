
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Event as ContentEvent } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, UsersIcon, ArrowLeft, Clock } from "lucide-react";
import EventPoster from "@/components/EventPoster";
// import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<ContentEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const eventRef = doc(db, "events", id);
        const eventDoc = await getDoc(eventRef);
        
        if (eventDoc.exists()) {
          const eventData = eventDoc.data();
          setEvent({
            id: eventDoc.id,
            title: eventData.title || "",
            date: eventData.date || "",
            description: eventData.description || "",
            location: eventData.location || "",
            imageUrl: eventData.imageUrl || "",
            ieeeCount: eventData.ieeeCount || 0,
            nonIeeeCount: eventData.nonIeeeCount || 0
          });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-purple-700">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">Event Not Found</h1>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* <Navbar /> */}
      
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <Button variant="outline" className="mb-4" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* poster section */}
        <h2 className="text-2xl font-bold mt-4 mb-6">Event Poster</h2>
        <EventPoster src={event.imageUrl} />

        <div style={{ marginTop: "24px" }}>
  <h3 style={{
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "16px"
  }}>
    About the session:
  </h3>
  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "18px"
  }}>
    <div>
      <span style={{ color: "#7C3AED", fontWeight: 600 }}>
        Date:
      </span>{" "}
      <span style={{ color: "#000000" }}>
        {event.date}
      </span>
    </div>
    {event.time && (
      <div>
        <span style={{ color: "#7C3AED", fontWeight: 600 }}>
          Time:
        </span>{" "}
        <span style={{ color: "#000000" }}>
          {event.time}
        </span>
      </div>
    )}
    <div>
      <span style={{ color: "#7C3AED", fontWeight: 600 }}>
        Venue:
      </span>{" "}
      <span style={{ color: "#000000" }}>
        {event.location}
      </span>
    </div>
    <div>
      <span style={{ color: "#7C3AED", fontWeight: 600 }}>
        Participants:
      </span>{" "}
      <span style={{ color: "#000000" }}>
        {(event.ieeeCount || 0) + (event.nonIeeeCount || 0)}
      </span>
    </div>
  </div>
</div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <UsersIcon className="h-8 w-8 mb-2 mx-auto text-purple-700" />
                <h3 className="font-semibold text-lg text-purple-800">IEEE Members</h3>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {event.ieeeCount || 0}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <UsersIcon className="h-8 w-8 mb-2 mx-auto text-purple-700" />
                <h3 className="font-semibold text-lg text-purple-800">Non-IEEE Members</h3>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {event.nonIeeeCount || 0}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <UsersIcon className="h-8 w-8 mb-2 mx-auto text-purple-700" />
                <h3 className="font-semibold text-lg text-purple-800">Total Attendees</h3>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {(event.ieeeCount || 0) + (event.nonIeeeCount || 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="prose prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-black mt-8 mb-3">Event Description</h2>
          <div className="whitespace-pre-wrap space-y-4">
            {event.description.split("\n").map((line, idx) => {
              const trimmed = line.trim();
              if (!trimmed) return <p key={idx} className="text-black text-xl leading-normal mb-4">&nbsp;</p>;
              const match = trimmed.match(/^(Introduction|About the speaker|About the event|About the session|Conclusion):$/i);
              if (match) {
                return (
                  <h3
                    key={idx}
                    className="text-purple-700 font-bold text-2xl mt-8 mb-3"
                  >
                    {match[1]}
                  </h3>
                );
              }
              return (
                <p key={idx} className="text-black text-xl leading-normal mb-4">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
