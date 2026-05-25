import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import AwardList from "@/components/AwardList";
import AwardForm from "@/components/AwardForm";
import LeadershipManager from "@/components/LeadershipManager";
import AdminSidebar from "@/components/AdminSidebar";
import RecentEventSlider from "@/components/RecentEventSlider";
import defaultMembers from "@/data/leadership";
import { useNavigate } from "react-router-dom";
import { Event, Award } from "@/types/content";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

type AdminTab = "dashboard" | "events" | "awards" | "leadership";

const parseEventDate = (dateString: string): Date => {
  if (!dateString) return new Date(0);

  try {
    const parsed = new Date(dateString);
    if (!isNaN(parsed.getTime())) return parsed;
  } catch {
    // ignore
  }

  const firstDateMatch = dateString.match(/(\d+)(st|nd|rd|th)/);
  if (firstDateMatch) {
    const dateNum = firstDateMatch[1];
    const restOfString = dateString.substring(
      dateString.indexOf(firstDateMatch[0]) + firstDateMatch[0].length
    );
    const cleanedRest = restOfString.replace(/\s+and\s+\d+(st|nd|rd|th)/, "");
    const cleanedDateString = dateNum + cleanedRest;
    const parsedDate = new Date(cleanedDateString);
    if (!isNaN(parsedDate.getTime())) return parsedDate;
  }

  return new Date(0);
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isAwardFormOpen, setIsAwardFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingAward, setEditingAward] = useState<Award | null>(null);

  const { events, addEvent, updateEvent, deleteEvent, cleanupDuplicates } = useEvents();
  const { awards, addAward, updateAward, deleteAward } = useAwards();
  const navigate = useNavigate();

  const duplicateCount = useMemo(() => {
    const uniqueEventKeys = new Set(
      events.map((event) => `${event.title}-${event.date}-${event.description}`)
    );
    return events.length - uniqueEventKeys.size;
  }, [events]);

  const sortedEvents = useMemo(() => {
    return [...events].sort(
      (a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
    );
  }, [events]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminUID");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminUID");
      navigate("/");
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId);
  };

  const handleCleanDuplicates = async () => {
    await cleanupDuplicates();
  };

  const handleDeleteAward = async (awardId: string) => {
    await deleteAward(awardId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

        <main className="flex-1 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-purple-600">
                  WIE Admin Dashboard
                </div>
                <h1 className="mt-3 text-3xl font-bold text-slate-900">Welcome back, WIE Admin</h1>
                <p className="mt-2 text-sm text-slate-600">
                  Manage events, awards, and leadership members from one place.
                </p>
              </div>
            </div>

            {activeTab === "dashboard" && (
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                  <p className="text-sm font-medium text-slate-500">Events</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{events.length}</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                  <p className="text-sm font-medium text-slate-500">Awards</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{awards.length}</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                  <p className="text-sm font-medium text-slate-500">Leadership</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{defaultMembers.length}</p>
                </div>
              </div>
            )}

            {activeTab === "dashboard" && (
              <div className="mt-6">
                {/* No scrollbar on dashboard slideshow */}
                <RecentEventSlider events={sortedEvents} />
              </div>
            )}

            {activeTab !== "dashboard" && (
              <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                {activeTab === "events" && (
                  <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">Events</h2>
                        <p className="text-sm text-slate-600">Create, edit and remove event listings.</p>
                      </div>
                      <Button
                        onClick={() => setIsEventFormOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Add New Event
                      </Button>
                    </div>

                    <EventList
                      events={sortedEvents}
                      onEdit={(event: Event) => {
                        setEditingEvent(event);
                        setIsEventFormOpen(true);
                      }}
                      onDelete={handleDeleteEvent}
                    />

                    {duplicateCount > 0 && (
                      <div className="mt-6">
                        <Button
                          variant="outline"
                          className="border-purple-600 text-purple-700 hover:bg-purple-50"
                          onClick={handleCleanDuplicates}
                        >
                          Clean duplicates ({duplicateCount})
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "awards" && (
                  <div>
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">Awards</h2>
                        <p className="text-sm text-slate-600">
                          Manage your awards and recognition entries.
                        </p>
                      </div>
                      <Button
                        onClick={() => setIsAwardFormOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
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
                  </div>
                )}

                {activeTab === "leadership" && (
                  <div>
                    <LeadershipManager />
                  </div>
                )}
              </section>
            )}

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
        </main>
      </div>
    </div>
  );
};

export default Admin;

