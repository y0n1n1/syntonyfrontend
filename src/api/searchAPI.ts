import axios from 'axios';

// Base URL configuration (adjust the baseURL based on your Express server URL)
const api = axios.create({
  baseURL: process.env.BACKEND_URL, // Adjust this URL based on your backend configuration
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Search for articles (`POST /search`)
export interface SearchCriteria {
  authors?: string[];
  allAuthors?: boolean;
  startDate?: string | null;
  endDate?: string| null;
  titlesIncludes?: string[];
  allTitles?: boolean;
  abstractsIncludes?: string[];
  allAbstracts?: boolean;
  categories?: string[];
  allCategories?: boolean;
}

export const searchArticles = async (userId: false | string, resultsPerPage:number, pageNumber:number, criteriaList: SearchCriteria[]) => {
  try {
    const response = await api.post('/search', { userId, resultsPerPage, pageNumber, criteriaList });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error searching articles');
  }
};
