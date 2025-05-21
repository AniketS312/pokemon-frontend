"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Redirect } from "next"

import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { redirect } from "next/dist/server/api-utils"



export default function DeletePage() {

  const formSchema = z.object({
  username: z.string().min(2, {
    message: "Pokemon name must be at least 2 characters.",
  }),
})

 function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.pokemon)
    const deletePokemon = values.pokemon
    try{
    const response = fetch(`https://pokemon-backedn.onrender.com/removepokemon/${deletePokemon}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if(response.ok) {
        form.reset()
        redirect("/")

      }
    } catch (error) {
      console.error("Error deleting Pokemon:", error);
    }
  }
 
const form = useForm()


  return (
    <div className="m-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pokemon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Pokemon name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

