"use client"
 
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
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



export default function DeletePage() {
  const router = useRouter();

interface DeleteFormValues {
  pokemon: string; // or number, depending on your form input
}

async function onSubmit(values: DeleteFormValues) {
    const deletePokemon = values.pokemon; 
    try {
    const response = await fetch(`https://pokemon-backedn.onrender.com/removepokemon/${deletePokemon}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

    const json = await response.json();
    console.log(json, "Pokemon deleted successfully");
    router.push("/"); 

  } catch (error) {
    console.error("Error deleting Pokemon:", error);
  }
}
 
  const form = useForm<DeleteFormValues>();

  return (
    <div className="m-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" defaultValue={""}>
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

