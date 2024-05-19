"use client";

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
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  ticketId: number;
}

const DeleteButton = ({ ticketId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTicket = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/tickets/" + ticketId);
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError("some error:: " + error);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({ variant: "destructive" })}
          disabled={isDeleting}
        >
          Delete Ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              disabled={isDeleting}
              onClick={deleteTicket}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  );
};

export default DeleteButton;
