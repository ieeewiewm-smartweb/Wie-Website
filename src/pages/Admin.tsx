import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import AwardList from "@/components/AwardList";
import AwardForm from "@/components/AwardForm";
import { useNavigate } from "react-router-dom";
import StorageInfo from "@/components/StorageInfo";
import { Event, Award } from "@/types/content";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

const Admin = () => {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isAwardFormOpen, setIsAwardFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { awards, addAward, updateAward, deleteAward } = useAwards();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear localStorage on logout
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminUID");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Force clear localStorage even if signOut fails
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminUID");
      navigate("/");
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId);
  };

  const handleDeleteAward = async (awardId: string) => {
    await deleteAward(awardId);
  };


  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <StorageInfo />

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-4 gap-2">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>
          <TabsContent value="events">
            <div className="mb-4">
              <Button onClick={() => setIsEventFormOpen(true)} className="bg-purple-600 hover:bg-purple-700">
                Add New Event
              </Button>
            </div>
            <EventList
              events={events}
              onEdit={(event: Event) => {
                setEditingEvent(event);
                setIsEventFormOpen(true);
              }}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>
          <TabsContent value="awards">
            <div className="mb-4">
              <Button onClick={() => setIsAwardFormOpen(true)} className="bg-purple-600 hover:bg-purple-700">
                Add New Award
              </Button>
            </div>
            <AwardList
              awards={awards}
              onEdit={(award: Award) => {
                setEditingAward(award);
                setIsAwardFormOpen(true);
              }}
              onDelete={handleDeleteAward}
            />
          </TabsContent>
        </Tabs>

        {isEventFormOpen && (
          <EventForm
            event={editingEvent}
            onSubmit={(eventData: Event) => {
              if (editingEvent) {
                updateEvent(editingEvent.id, eventData);
                setEditingEvent(null);
              } else {
                addEvent(eventData);
              }
              setIsEventFormOpen(false);
            }}
            onCancel={() => {
              setIsEventFormOpen(false);
              setEditingEvent(null);
            }}
          />
        )}

        {isAwardFormOpen && (
          <AwardForm
            award={editingAward}
            onSubmit={(awardData: Award) => {
              if (editingAward) {
                updateAward(editingAward.id, awardData);
                setEditingAward(null);
              } else {
                addAward(awardData);
              }
              setIsAwardFormOpen(false);
            }}
            onCancel={() => {
              setIsAwardFormOpen(false);
              setEditingAward(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
