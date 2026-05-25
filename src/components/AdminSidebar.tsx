import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
    activeTab: "dashboard" | "events" | "awards" | "leadership";
    onTabChange: (tab: "dashboard" | "events" | "awards" | "leadership") => void;
    onLogout?: () => void;
}

const AdminSidebar: React.FC<Props> = ({ activeTab, onTabChange, onLogout }) => {
    const tabs = [
        { id: "dashboard", label: "Dashboard" },
        { id: "events", label: "Events" },
        { id: "awards", label: "Achievements" },
        { id: "leadership", label: "Team" },
    ];

    return (
        <aside className="hidden w-72 shrink-0 border-r bg-white p-6 md:block">
            <div className="mb-8">
                <div className="text-xl font-semibold text-slate-900">WIE Admin</div>
                <p className="mt-2 text-sm text-slate-500">Control panel for events, awards and leadership.</p>
            </div>

            <nav className="space-y-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id as Props["activeTab"])}
                        className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${activeTab === tab.id ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>


            <div className="mt-8">
                <Button variant="ghost" onClick={onLogout} className="w-full justify-start">
                    Sign Out
                </Button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
