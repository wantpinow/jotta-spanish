"use client";

import { KeyIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOpenAIKey } from "./key-provider";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  key: z.string().min(1, "Key is required"),
});

export function OpenAiKeyDialog() {
  const { key, setKey } = useOpenAIKey();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: key,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("OpenAI key successfully updated");
    setKey(values.key);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <KeyIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAI Key</FormLabel>
                  <FormControl>
                    <Input placeholder="sk-XXXXXX" {...field} />
                  </FormControl>
                  <FormDescription>
                    Go to platform.openai.com -&gt; API keys.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="ml-auto block">
              Set Key
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
