import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import countries from "@/data/countries.json"; // Adjust the path to where your countries.json file is located
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/custom/passwordinput";
import { ScrollArea } from "@/components/ui/scroll-area";

const DeleteAccount = () => {
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: "",
            occupation: "",
            organization: "",
            country: "",
            username: "",
            email: "",
            password: ""
        },
    });

    // Watch the value of the email field
    const emailValue = form.watch("email");

    function onSubmit(values: z.infer<typeof SignupValidation>) {
        console.log(values);
    }

    return (
        <div className="w-full">
      <div className="w-5/6 ml-10">
      <ScrollArea className="h-100 custom-scrollbar align-middle items-center justify-center flex flex-col">
      <Form {...form} >
            <div className="m-30 custom-scrollbar sm:w-420 flex-left flex-col items-left text-left ">
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full  custom-scrollbar mb-10">
                    <div>Are you sure you wish to delete your account?</div>
                    <div>Deleting your account is an irreversible action that removes all user data within a 30 day period from syntony's records.</div>
                    <Button variant="destructive" type="submit">Delete Account?</Button>
                    
                    
                </form>
            </div>
        </Form>

      </ScrollArea></div>
        </div>
        
    );
};

export default DeleteAccount;
