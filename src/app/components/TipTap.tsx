'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from "@tiptap/extension-underline";
import Toolbar from './Toolbar';
import { useEffect } from 'react';

interface TiptapProps {
    onChange: (newContent: string) => void;
    content: string;
    setEditor: (editor: Editor | null) => void;
}

export default function Tiptap({ onChange, content, setEditor }: TiptapProps) {
    const handleChange = (newContent: string) => {
        onChange(newContent);
    };

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        editorProps: {
            attributes: {
                class:
                    "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML());
        },
        immediatelyRender: false,
    })

    useEffect(() => {
        setEditor(editor);
    }, [editor, setEditor]);

    return (
        <div className="w-full px-4">
            <Toolbar editor={editor} content={content} />
            <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        </div>
    )
}

