
import { useState, useEffect } from "react";
import { type Award } from "@/types/content";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

export function useAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert Firestore document to Award type
  const convertDocToAward = (doc: QueryDocumentSnapshot<DocumentData>): Award => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      imageUrl: data.imageUrl || ""
    };
  };

  useEffect(() => {
    // Load awards from Firestore
    const loadAwards = async () => {
      try {
        const awardsCollection = collection(db, "awards");
        const awardSnapshot = await getDocs(awardsCollection);
        const awardsList = awardSnapshot.docs.map(convertDocToAward);
        setAwards(awardsList);
      } catch (error) {
        console.error("Error loading awards:", error);
        toast({
          title: "Error",
          description: "Failed to load awards. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadAwards();
  }, []);

  const addAward = async (award: Omit<Award, "id">) => {
    try {
      const awardsCollection = collection(db, "awards");
      const docRef = await addDoc(awardsCollection, award);

      const newAward = {
        ...award,
        id: docRef.id,
      };

      setAwards(prev => [newAward, ...prev]);

      toast({
        title: "Success",
        description: "Award added successfully!",
      });

      return newAward;
    } catch (error) {
      console.error("Error adding award:", error);
      toast({
        title: "Error",
        description: "Failed to add award. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateAward = async (id: string, updatedAward: Partial<Award>) => {
    try {
      const awardRef = doc(db, "awards", id);
      await updateDoc(awardRef, updatedAward);

      const updatedAwards = awards.map(award =>
        award.id === id ? { ...award, ...updatedAward } : award
      );

      setAwards(updatedAwards);

      toast({
        title: "Success",
        description: "Award updated successfully!",
      });
    } catch (error) {
      console.error("Error updating award:", error);
      toast({
        title: "Error",
        description: "Failed to update award. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteAward = async (id: string) => {
    try {
      console.log("Attempting to delete award with ID:", id);
      const awardRef = doc(db, "awards", id);
      await deleteDoc(awardRef);
      console.log("Award deleted from Firestore successfully");

      setAwards(prev => {
        const filtered = prev.filter(award => award.id !== id);
        console.log("Awards after deletion:", filtered);
        return filtered;
      });

      toast({
        title: "Success",
        description: "Award deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting award:", error);
      toast({
        title: "Error",
        description: `Failed to delete award: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    }
  };

  const cleanupDuplicates = async () => {
    try {
      const uniqueMap = new Map<string, Award>();
      const duplicatesToDelete: string[] = [];

      // Identify duplicates
      awards.forEach(award => {
        const key = `${award.title}-${award.date}-${award.description}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, award);
        } else {
          duplicatesToDelete.push(award.id);
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
        const awardRef = doc(db, "awards", id);
        await deleteDoc(awardRef);
      });

      await Promise.all(deletePromises);

      // Update state
      setAwards(Array.from(uniqueMap.values()));

      toast({
        title: "Success",
        description: `Cleaned up ${duplicatesToDelete.length} duplicate awards!`,
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

  return { awards, loading, addAward, updateAward, deleteAward, cleanupDuplicates };
}
