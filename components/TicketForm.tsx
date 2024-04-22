"use client";

import { ticketSchema } from "@/validationSchemas/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIssubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIssubmitting(true);
      setError("");

      if (ticket) {
        await axios.patch("/api/tickets/" + ticket.id, values);
      } else {
        await axios.post("/api/tickets", values);
      }

      setIssubmitting(false);

      if (ticket) {
        router.push("/tickets");
      } else {
        router.push("/tickets");
      }

      router.refresh();
    } catch (error) {
      console.log("error:", error);
      setError("Errr ocurred");
      setIssubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket title..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            defaultValue={ticket?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Decription" {...field} />
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              defaultValue={ticket?.status}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {ticket ? "Update Ticket" : "Create Ticket"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
