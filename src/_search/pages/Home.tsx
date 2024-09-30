import Footer from "@/components/shared/Footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import RandomPlaceholderInput from "@/components/custom/RandomPlaceholderInput";
import { useState } from "react";

import { useSearch } from "./../searchProvider"; // Adjust the import path


const Home = () => {
    const { setSearchInput } = useSearch();  // Get the setter from context
    const [inputValue, setInputValue] = useState(""); // Local state for input
    const navigate = useNavigate();  // Hook to navigate programmatically
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      // Update the global search input in the context
      setSearchInput(inputValue);
  
      // Navigate to the search page
      navigate("/search");
    };

  return (
        <div>
        <section className="flex justify-center items-center flex-col mt-10">
            <a href='/'><img src="public/assets/TEXT_LOGO.svg" alt="logo"
                    className=" m-1 object-cover h-30 w-60  t-50"/></a>
    <div className="w-full"><div className="flex flex-row justify-center w-full">
        <div className="w-4/12 m-5">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <RandomPlaceholderInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </form>
        </div>
        
    </div></div>        
    
    
        </section></div>
        
  )
  }
  
  export default Home