'use client'

import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import TipTap from "./TipTap";
import { Editor } from '@tiptap/react'

interface NotePickerProps {
    setNotes: (notes: { id: string; content: string }[]) => void;
}

export default function NotePicker({ setNotes }: NotePickerProps) {
    const [content, setContent] = useState<string>('')
    const [message, setMessage] = useState<string>("");
    const [editor, setEditor] = useState<Editor | null>(null);

    const handleContentChange = (newContent: string) => {
        setContent(newContent)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            id: uuidv4(),
            content: content,
        }

        const existingDataString = localStorage.getItem('myData')
        const existingData: { id: string; content: string }[] = existingDataString
            ? JSON.parse(existingDataString)
            : []

        const updatedData = [...existingData, data]
        localStorage.setItem('myData', JSON.stringify(updatedData))

        setNotes(updatedData);
        
        setContent('')
        editor?.commands.clearContent();
    }

    const handleSaveToDrive = async () => {
        if (!content) {
            setMessage("Content is empty! Please add some text before saving.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("User not authenticated. Please login again.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/drive/save', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();
            console.log("Response from backend:", data);

            if (data.success) {
                setMessage(`Content saved! File ID: ${data.fileId}`);
            } else {
                setMessage(`Failed to save content: ${data.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error saving content:", error);
            setMessage("Error saving content. Please try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl w-full grid place-items-center mx-auto pt-10 mb-10"
        >
            <div className="text-3xl text-center text-sky-300 mb-10">
                Notes Picker
            </div>
            <TipTap
                content={content}
                onChange={(newContent: string) => handleContentChange(newContent)}
                setEditor={setEditor}
            />
            {content && (
                <button
                    type="button"
                    onClick={handleSaveToDrive}
                    className="px-4 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Save to Google Drive
                </button>
            )}
            {message && <p className="text-white mt-4">{message}</p>}
        </form>
    )
}