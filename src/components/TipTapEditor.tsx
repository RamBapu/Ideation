/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Note } from "@/lib/db/schema";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import TipTapMenuBar from "./TipTapMenuBar";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  note: Note;
};

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = useState<string>(
    note?.editorState || `<b>${note.name}</b>`,
  );

  // Tiptap editor configuration
  const editor = useEditor({
    immediatelyRender: false,
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  // AI Autocomple mutation
  const { mutateAsync: autoCompleteMutation, isPending: isAutoCompleting } =
    useMutation<string, Error, string>({
      mutationFn: async (prompt) => {
        const response = await axios.post("/api/completion", { prompt });
        return response.data;
      },
      onSuccess: (data) => {
        if (data && editor) {
          editor.commands.insertContent(` ${data}`);
        }
      },
    });

  const handleAutoComplete = () => {
    const prompt = editorState.split(" ").slice(-30).join(" ");
    autoCompleteMutation(prompt);
  };

  // Save note mutation
  const { mutate: saveNote, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
    },
  });

  // Using this debounce to make sure that for every 500ms we save the note description to DB
  // and not in every key stroke
  const debouncedEditorState = useDebounce(editorState, 500);
  useEffect(() => {
    if (debouncedEditorState === "") return;
    // save note to db
    saveNote();
  }, [debouncedEditorState]);

  return (
    <>
      {/* Menu bar */}
      <div className="flex justify-between">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"}>
          {isPending ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className="mt-4">
        <Separator />
      </div>

      {/* Editor content */}
      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>

      <div className="h-4">
        <Separator />
      </div>

      {/* Auto complete tip */}
      {isAutoCompleting ? (
        <span className="text-md flex text-green-500 items-center">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Auto completing in progress
        </span>
      ) : (
        <span className="text-md flex items-center text-green-500">
          Tip:{"  "}
          <kbd
            onClick={handleAutoComplete}
            className="cursor-pointer mx-2 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
            Click Here
          </kbd>
          {"  "}
          for AI autocomplete
        </span>
      )}
    </>
  );
};

export default TipTapEditor;
