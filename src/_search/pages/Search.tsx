import { useState, useEffect } from "react";
import { searchArticles } from "./../../api/searchAPI";
import RandomPlaceholderInput from "@/components/custom/RandomPlaceholderInput";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArticleColumn from "@/components/shared/ArticleColumn";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearch } from "../searchProvider";
import { useAuth } from "@/api/authContext";

const joinArrayToSentence = (items: string[], maxAuthors: number = 5): string => {
  if (items.length === 0) return '';
  const displayedAuthors = items.slice(0, maxAuthors).join(', ');
  return items.length > maxAuthors ? `${displayedAuthors} ...` : displayedAuthors;
};

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

const Search = () => {
  const { searchInput } = useSearch();
  const { user } = useAuth();
  const userId = user?.id ?? "a28dcb9d-4da7-4470-8a15-f92b5f7058a8";
  
  const [formValues, setFormValues] = useState({
    authors: "",
    keywords: "",
    startDate: null,
    endDate: null,
    titlesIncludes: "",
    abstractsIncludes: "",
    categories: "",
    allAuthors: false,
    allTitles: false,
    allAbstracts: false,
    allCategories: false,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [searchMade, setSearchMade] = useState(false);  // New state to track search initiation

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchMade(true);  // Set to true when search is initiated
    const criteria = {
      authors: formValues.authors.split(',').map(author => author.trim()).filter(author => author),
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      titlesIncludes: formValues.titlesIncludes.split(',').map(title => title.trim()).filter(title => title),
      abstractsIncludes: formValues.abstractsIncludes.split(',').map(abstract => abstract.trim()).filter(abstract => abstract),
      categories: formValues.categories.split(',').map(category => category.trim()).filter(category => category),
      allAuthors: formValues.allAuthors,
      allTitles: formValues.allTitles,
      allAbstracts: formValues.allAbstracts,
      allCategories: formValues.allCategories,
    };

    try {
      const res_p_p = 20;
      const p_n = 1;
      const results = await searchArticles(userId, res_p_p, p_n, [criteria]);
      const updatedResults = results.map((article: any) => {
        const authorsList = article.authors;
        const authorsSentence = joinArrayToSentence(authorsList);
        const limitedAbstract = article.abstract.split(' ').length > 40 ? 
          article.abstract.split(' ').slice(0, 40).join(' ') + '...' : 
          article.abstract;

        return {
          ...article,
          title: article.title,
          date: formatDate(article.published_date),
          pdfurl: article.pdf_url,
          citations: article.citations,
          authors: authorsSentence,
          abstract: limitedAbstract
        };
      });
      setSearchResults(updatedResults);
    } catch (error) {
      console.error("Error searching articles:", error);
    }
  };

  // Using useEffect to manage side effects
  useEffect(() => {
    const submitFromHome = async () => {
      if (searchInput) {
        setSearchMade(true);  // Set to true when search is initiated from home
        formValues.titlesIncludes = searchInput;  // Update titlesIncludes from searchInput
        const criteria = {
          authors: formValues.authors.split(',').map(author => author.trim()).filter(author => author),
          startDate: formValues.startDate,
          endDate: formValues.endDate,
          titlesIncludes: searchInput.split(',').map(title => title.trim()).filter(title => title),
          abstractsIncludes: formValues.abstractsIncludes.split(',').map(abstract => abstract.trim()).filter(abstract => abstract),
          categories: formValues.categories.split(',').map(category => category.trim()).filter(category => category),
          allAuthors: formValues.allAuthors,
          allTitles: formValues.allTitles,
          allAbstracts: formValues.allAbstracts,
          allCategories: formValues.allCategories,
        };

        try {
          const res_p_p = 20;
          const p_n = 1;
          const results = await searchArticles(userId, res_p_p, p_n, [criteria]);
          const updatedResults = results.map((article: any) => {
            const authorsList = article.authors;
            const authorsSentence = joinArrayToSentence(authorsList);
            const limitedAbstract = article.abstract.split(' ').length > 40 ? 
              article.abstract.split(' ').slice(0, 40).join(' ') + '...' : 
              article.abstract;

            return {
              ...article,
              title: article.title,
              date: formatDate(article.published_date),
              pdfurl: article.pdf_url,
              citations: article.citations,
              authors: authorsSentence,
              abstract: limitedAbstract
            };
          });
          setSearchResults(updatedResults);
        } catch (error) {
          console.error("Error searching articles:", error);
        }
      }
    };

    submitFromHome();  // Call the function
  }, [searchInput]);  // Run when searchInput changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (name: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: !prevValues[name as keyof typeof formValues],
    }));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-row w-full border-t-2 border-b-2 border-b-stone-100 justify-center min-h-svh">
        
        <div className="w-2/12 p-5 h-11/12 flex flex-col "></div>

        {/* Search Bar and Results Section */}
        <div className="w-7/12 m-5 flex flex-col justify-between ">
          <div className="flex w-full items-center space-x-2">
            {/* Random Placeholder Input for Keywords */}
            <RandomPlaceholderInput
              value={formValues.titlesIncludes}
              onChange={(e) => setFormValues({ ...formValues, titlesIncludes: e.target.value })}
            />
            <Button type="submit">Search</Button>
          </div>
          <div className="h-full align-top justify-start mt-6">
            {searchMade && (  // Only render ArticleColumn if search has been made
              <ArticleColumn articles={searchResults} />
            )}
          </div>
          <div className="p-5">
            <Pagination className="mb-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                {/* Add pagination links as needed */}
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationNext href="#" />
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        {/* Filter Section */}
        <div className="w-3/12 p-5 h-11/12 flex flex-col px-12 ">
  <ScrollArea className="w-full space-y-6">
    
    {/* Authors Section */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="authors" className="text-sm font-semibold">
        Authors (comma-separated):
      </label>
      <input
        id="authors"
        name="authors"
        value={formValues.authors}
        onChange={handleChange}
        className="input-field p-2 border rounded-md"
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={formValues.allAuthors}
          onCheckedChange={() => handleCheckboxChange("allAuthors")}
        />
        <label htmlFor="allAuthors" className="text-sm">
          Match all authors?
        </label>
      </div>
    </div>
    
    {/* Date Range Section */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="startDate" className="text-sm font-semibold">
        Start Date:
      </label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={formValues.startDate}
        onChange={handleChange}
        className="input-field p-2 border rounded-md"
      />
      <label htmlFor="endDate" className="text-sm font-semibold">
        End Date:
      </label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={formValues.endDate}
        onChange={handleChange}
        className="input-field p-2 border rounded-md"
      />
    </div>
    
    {/* Categories Section */}
    <div className="flex flex-col space-y-2">
      <label htmlFor="categories" className="text-sm font-semibold">
        Categories (comma-separated):
      </label>
      <input
        id="categories"
        name="categories"
        value={formValues.categories}
        onChange={handleChange}
        className="input-field p-2 border rounded-md"
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={formValues.allCategories}
          onCheckedChange={() => handleCheckboxChange("allCategories")}
        />
        <label htmlFor="allCategories" className="text-sm">
          Match all categories?
        </label>
      </div>
    </div>
    
  </ScrollArea>
</div>
      </form>
    </div>
  );
};

export default Search;


