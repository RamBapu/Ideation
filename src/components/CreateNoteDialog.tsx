"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateNoteDialog = () => {
  const [input, setInput] = useState("");
  const router = useRouter()

  const { mutate: createNote, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNotebook", {
        name: input,
      });
      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(input === '') return

    createNote(undefined,{
        onSuccess:({note_id}) => {
            router.push(`/notebook/${note_id}`)
        },
        onError:(error) => {
            console.error(error)
        }
    })
  };

  return (
    <Dialog>
      {/* New Note button */}
      <DialogTrigger asChild>
        <div className="border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
          <h2 className="font-semibold text-green-600 sm:mt-2">
            New Note Book
          </h2>
        </div>
      </DialogTrigger>

      {/* New Note dialog */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Note Name..."
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button type="submit" className="bg-green-600" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
