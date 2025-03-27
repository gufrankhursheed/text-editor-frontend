"use client";

import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface NotesProps {
    notes: { id: string; content: string }[];
}

export default function Notes() {
    const [notes, setNotes] = useState<{ id: string; content: string }[] | null>(null);
    const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"]

    useEffect(() => {
        if (typeof window !== "undefined") {
            const existingDataString = localStorage.getItem("myData");
            const existingData = existingDataString ? JSON.parse(existingDataString) : [];
            setNotes(existingData);
        }
    }, []);

    if (notes === null) return <p className="text-white text-center">Loading notes...</p>;

    return (
        <div className="max-w-6xl mx-auto px-5">
            <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 1024: 3 }}>
                <Masonry gutter="20px">
                    {notes.map((item, idx) => (
                        <div key={item.id} style={{ color: colors[idx % colors.length] }}>
                            <div
                                className="px-4 py-3 font-bold text-slate-950"
                                style={{ backgroundColor: colors[idx % colors.length] }}
                            >
                                Note - {idx + 1}
                            </div>
                            <div
                                className="ProseMirror whitespace-pre-line border border-slate-700 px-6 py-4 rounded-lg"
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}