import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import countries from "@/data/countries.json"; // Adjust the path to where your countries.json file is located
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/custom/passwordinput";
import { signUpUser } from "@/api/usersAPI";

const SignupForm = () => {
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
    const navigate = useNavigate();

    function onSubmit(values: z.infer<typeof SignupValidation>) {
        signUpUser(values);
        navigate("/"); 
      };
    
    
    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col items-center text-center">
                <h1 className="font-bold text-3xl mt-5 pb-2">Create an account</h1>
                <p className="text-base text-stone-600 mb-3">Enter your email below to create an account</p>
            </div>
            <div className="w-96 mx-10 flex-left flex-col items-left text-left mb-10">
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-1xl bold">Email address</FormLabel>
                                <FormControl>
                                    <Input type="email" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {emailValue && (
                        <>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="bg-transparent">
                                        <FormLabel className="text-1xl bold">Your Full Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" className="shad-input" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-1xl bold">Username</FormLabel>
                                        <FormControl>
                                            <Input type="text" className="shad-input" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="occupation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-1xl bold">Current title or occupation</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            {...field}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                                                <SelectItem value="Mr">Masters</SelectItem>
                                                <SelectItem value="Mrs">PhD</SelectItem>
                                                <SelectItem value="Researcher/Industry">Researcher/Industry</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="organization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-1xl bold">Organization</FormLabel>
                                        <FormControl>
                                            <Input type="text" className="shad-input" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Country Selector */}
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-1xl bold">Country</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            {...field}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a country" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {countries.map((country) => (
                                                    <SelectItem key={country.id} value={country.name}>
                                                        {country.emoji} {country.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-1xl bold">Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput className="shad-input" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <Button type="submit">Sign Up with Email</Button>
                    {!emailValue && (
                        <>
                            <div className="flex items-center gap-4 mt-4">
                                <Separator className="flex-1" />
                                <span className="text-muted-foreground text-xs">OR PROCEED WITH</span>
                                <Separator className="flex-1" />
                            </div>
                    <Button type="submit" variant="outline">Google</Button>
                    <Button type="submit" variant="outline">Github</Button>
                        </>
                    )}
                    <p className="small-medium text-stone-600 mb-3">By clicking continue, you agree to our <Link className="text-stone-800 underline hover:no-underline" to="/terms-of-service">Terms of Service</Link> and <Link className="text-stone-800 underline hover:no-underline" to="/privacy-policy">Privacy Policy</Link>. </p>
                    <p className="small-medium text-stone-600 mt-4">Already have an account?<Link className="text-blue-600  hover:underline ml-1"  to="/sign-in">Log In</Link> </p>
                </form>
            </div>
        </Form>
    );
};

export default SignupForm;
