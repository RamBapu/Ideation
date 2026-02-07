"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutateAsync: deleteNote, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteNote", { noteId });
      return response.data;
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          size="sm"
          className="cursor-pointer"
          disabled={isPending}>
          <Trash /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the note.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteNote()}
            className="bg-red-600 hover:bg-red-700 cursor-pointer">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
