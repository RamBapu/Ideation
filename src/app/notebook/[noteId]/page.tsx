import DeleteButton from "@/components/DeleteButton";
import TipTapEditor from "@/components/TipTapEditor";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import React from "react";
import Link from "next/link";

type Props = {
  params: Promise<{ noteId: string }>;
};

const Notebook = async ({ params }: Props) => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) return redirect("/dashboard");

  const { noteId } = await params;
  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  const note = notes[0];

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600 cursor-pointer" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
        </div>

        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <TipTapEditor note={note} />
        </div>
      </div>
    </div>
  );
};

export default Notebook;
