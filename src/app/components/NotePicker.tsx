'use client'

import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import TipTap from "./TipTap";

export default function NotePicker() {
    const [content, setContent] = useState<string>('')

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

        setContent('')
    }

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
            />
        </form>
    )
}