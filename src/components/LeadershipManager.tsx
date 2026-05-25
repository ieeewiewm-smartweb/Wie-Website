import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, TrashIcon } from "lucide-react";
import { auth, db, storage } from "@/firebase";
import { collection, onSnapshot, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import defaultMembers, { LeaderData } from "@/data/leadership";

interface Member {
    id: string; // slug
    name: string;
    role: string;
    description: string;
    image: string;
}

const LeadershipManager = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editing, setEditing] = useState<Member | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [imageInput, setImageInput] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        const leadershipRef = collection(db, "leadership");
        const unsubscribe = onSnapshot(
            leadershipRef,
            (snapshot) => {
                const docs = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Member));
                const merged: Member[] = defaultMembers.map((dft) => {
                    const slug = dft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    const found = docs.find((doc) => doc.id === slug || doc.name === dft.name);
                    return found
                        ? {
                            id: found.id,
                            name: found.name || dft.name,
                            role: found.role || dft.role,
                            description: found.description || dft.description,
                            image: found.image || dft.image,
                        }
                        : {
                            id: slug,
                            name: dft.name,
                            role: dft.role,
                            description: dft.description,
                            image: dft.image,
                        };
                });

                docs.forEach((d) => {
                    if (!merged.find((m) => m.id === d.id)) merged.push(d);
                });

                setMembers(merged);
                setLoading(false);
            },
            (err) => {
                console.warn("Realtime leadership listener failed:", err);
                setMembers(defaultMembers.map((dft) => ({
                    id: dft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
                    name: dft.name,
                    role: dft.role,
                    description: dft.description,
                    image: dft.image,
                })));
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleAdd = () => {
        setEditing(null);
        setFile(null);
        setImageInput("");
        setIsFormOpen(true);
    };

    const load = async () => {
        const leadershipRef = collection(db, "leadership");
        const snapshot = await getDocs(leadershipRef);
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Member));
        const merged: Member[] = defaultMembers.map((dft) => {
            const slug = dft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            const found = docs.find((doc) => doc.id === slug || doc.name === dft.name);
            return found
                ? {
                    id: found.id,
                    name: found.name || dft.name,
                    role: found.role || dft.role,
                    description: found.description || dft.description,
                    image: found.image || dft.image,
                }
                : {
                    id: slug,
                    name: dft.name,
                    role: dft.role,
                    description: dft.description,
                    image: dft.image,
                };
        });

        docs.forEach((d) => {
            if (!merged.find((m) => m.id === d.id)) merged.push(d);
        });

        setMembers(merged);
    };

    const handleEdit = (m: Member) => {
        setEditing(m);
        setFile(null);
        setImageInput(m.image || "");
        setIsFormOpen(true);
    };

    const handleDelete = async (m: Member) => {
        if (!window.confirm(`Delete ${m.name}?`)) return;
        try {
            await deleteDoc(doc(db, "leadership", m.id));
            setMembers((s) => s.filter((x) => x.id !== m.id));
        } catch (err) {
            console.error("Failed to delete leadership:", err);
        }
    };

    const slugify = (name: string) =>
        name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = (formData.get("name") as string) || "";
        const role = (formData.get("role") as string) || "";
        const description = (formData.get("description") as string) || "";

        if (!auth.currentUser) {
            alert("You must be signed in to upload images. Please log out and log in again.");
            return;
        }

        const id = editing ? editing.id : slugify(name || "member");
        let imageUrl = imageInput || editing?.image || "";

        try {
            if (file) {
                const extMatch = file.name.match(/\.([0-9a-zA-Z]+)$/);
                const ext = extMatch ? extMatch[1] : "jpg";
                const path = `leadership/${id}-${Date.now()}.${ext}`;
                const sRef = storageRef(storage, path);
                try {
                    await uploadBytes(sRef, file);
                    imageUrl = await getDownloadURL(sRef);
                } catch (uploadError: any) {
                    console.error("Upload failed:", uploadError);
                    if (uploadError?.code === "storage/unauthorized") {
                        if (!imageInput && editing?.image) {
                            imageUrl = editing.image;
                        }
                        alert(
                            "Storage upload unauthorized. Please provide a valid external image URL or update your Firebase Storage rules."
                        );
                    } else {
                        throw uploadError;
                    }
                }
            }

            const newId = slugify(name || "member");

            // If editing and the name changed such that the slugified id differs,
            // write to the new doc id and delete the old one to keep ids canonical.
            if (editing && newId !== editing.id) {
                await setDoc(doc(db, "leadership", newId), {
                    name,
                    role,
                    description,
                    image: imageUrl,
                });
                try {
                    await deleteDoc(doc(db, "leadership", editing.id));
                } catch (delErr) {
                    console.warn("Failed to delete old leadership doc after rename:", delErr);
                }
            } else {
                await setDoc(doc(db, "leadership", newId), {
                    name,
                    role,
                    description,
                    image: imageUrl,
                });
            }

            // refresh local list from server to reflect any id changes
            await load();
            setIsFormOpen(false);
            setEditing(null);
            setFile(null);
        } catch (err) {
            console.error("Failed to save leadership:", err);
            alert("Failed to save. Check console for details.");
        }
    };

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Leadership Spotlight</h2>
                <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">Add Member</Button>
            </div>

            {loading ? (
                <div className="text-gray-600">Loading...</div>
            ) : members.length === 0 ? (
                <div className="text-gray-600">No leadership members found.</div>
            ) : (
                <div className="space-y-3">
                    {members.map((m) => (
                        <div key={m.id} className="flex items-center gap-4 p-3 border rounded-lg">
                            <div className="w-20 h-20 flex-shrink-0">
                                {m.image ? (
                                    <img src={m.image} alt={m.name} className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <div className="w-full h-full bg-purple-100 flex items-center justify-center rounded-md">{m.name.split(" ").map(s => s[0]).join("")}</div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-purple-800">{m.name}</div>
                                <div className="text-sm text-gray-600">{m.role}</div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(m)} className="flex items-center gap-1"><PencilIcon className="h-4 w-4" />Edit</Button>
                                <Button variant="outline" size="sm" onClick={() => handleDelete(m)} className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"><TrashIcon className="h-4 w-4" />Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <Dialog open={true} onOpenChange={() => setIsFormOpen(false)}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{editing ? "Edit Member" : "Add Member"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" defaultValue={editing?.name || ""} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" name="role" defaultValue={editing?.role || ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" defaultValue={editing?.description || ""} rows={4} />
                            </div>
                            <div className="space-y-2">
                                <Label>Image Upload</Label>
                                <input type="file" accept="image/*" ref={fileRef} onChange={(ev) => { setFile(ev.target.files?.[0] || null); }} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">External Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={imageInput}
                                    onChange={(ev) => setImageInput(ev.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                />
                                <p className="text-sm text-gray-500">Use an external URL if upload is blocked by Firebase Storage rules.</p>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="outline" onClick={() => { setIsFormOpen(false); setEditing(null); setFile(null); }}>Cancel</Button>
                                <Button type="submit">{editing ? "Update" : "Add"} Member</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default LeadershipManager;
