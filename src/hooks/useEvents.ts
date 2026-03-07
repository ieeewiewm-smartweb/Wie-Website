
import { useState, useEffect } from "react";
import { type Event as ContentEvent } from "@/types/content";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, query, where } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

export function useEvents() {
  const [events, setEvents] = useState<ContentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert Firestore document to Event type
  const convertDocToEvent = (doc: QueryDocumentSnapshot<DocumentData>): ContentEvent => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      location: data.location || "",
      imageUrl: data.imageUrl || "",
      ieeeCount: data.ieeeCount || 0,
      nonIeeeCount: data.nonIeeeCount || 0
    };
  };

  useEffect(() => {
    // Load events from Firestore
    const loadEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCollection);
        const eventsList = eventSnapshot.docs.map(convertDocToEvent);
        setEvents(eventsList);
      } catch (error) {
        console.error("Error loading events:", error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const addEvent = async (event: Omit<ContentEvent, "id">) => {
    try {
      const eventsCollection = collection(db, "events");
      const docRef = await addDoc(eventsCollection, event);

      const newEvent = {
        ...event,
        id: docRef.id,
      };

      setEvents(prev => [newEvent, ...prev]);

      toast({
        title: "Success",
        description: "Event added successfully!",
      });

      return newEvent;
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateEvent = async (id: string, updatedEvent: Partial<ContentEvent>) => {
    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, updatedEvent);

      const updatedEvents = events.map(event =>
        event.id === id ? { ...event, ...updatedEvent } : event
      );


      setEvents(updatedEvents);

      toast({
        title: "Success",
        description: "Event updated successfully!",
      });
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      console.log("Attempting to delete event with ID:", id);
      const eventRef = doc(db, "events", id);
      await deleteDoc(eventRef);
      console.log("Event deleted from Firestore successfully");

      setEvents(prev => {
        const filtered = prev.filter(event => event.id !== id);
        console.log("Events after deletion:", filtered.length);
        return filtered;
      });

      toast({
        title: "Success",
        description: "Event deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: `Failed to delete event: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    }
  };

  const cleanupDuplicates = async () => {
    try {
      const uniqueMap = new Map<string, ContentEvent>();
      const duplicatesToDelete: string[] = [];

      // Identify duplicates
      events.forEach(event => {
        const key = `${event.title}-${event.date}-${event.description}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, event);
        } else {
          duplicatesToDelete.push(event.id);
        }
      });

      if (duplicatesToDelete.length === 0) {
        toast({
          title: "Info",
          description: "No duplicates found!",
        });
        return;
      }

      console.log(`Cleaning up ${duplicatesToDelete.length} duplicates...`);

      // Delete all duplicates
      const deletePromises = duplicatesToDelete.map(async (id) => {
        const eventRef = doc(db, "events", id);
        await deleteDoc(eventRef);
      });

      await Promise.all(deletePromises);

      // Update state
      setEvents(Array.from(uniqueMap.values()));

      toast({
        title: "Success",
        description: `Cleaned up ${duplicatesToDelete.length} duplicate events!`,
      });
    } catch (error) {
      console.error("Error cleaning duplicates:", error);
      toast({
        title: "Error",
        description: "Failed to cleanup duplicates.",
        variant: "destructive"
      });
    }
  };

  return { events, loading, addEvent, updateEvent, deleteEvent, cleanupDuplicates };
}
