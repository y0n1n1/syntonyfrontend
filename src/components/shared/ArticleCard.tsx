
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, To } from 'react-router-dom';

// Define the types for the article props
interface ArticleProps {
  title: string;
  authors: string;
  date: string;
  description: string;
  pdfurl: To;
  citations:number;
}

const limitDescription = (description: string, wordLimit: number) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return description;
};

const joinArrayToSentence = (items: string[]): string => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return items.join(' and ');
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

// ArticleCard Function
function ArticleCard({ title, authors, date, description, pdfurl, citations }: ArticleProps) {

  return (
    <Card className="border-hidden shadow-none">
      <CardHeader className='-mb-3'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-start justify-start'>
            <div className='pr-3'>{date}</div>
            <div>By {authors}</div>
            </div>
            <div className='pl-3'>{citations} Citations </div>
          </div>  
        </CardDescription>
      </CardHeader>
      <CardContent className='-mb-6'>
        <p>{limitDescription(description, 50)}</p>
      </CardContent>
      <div className="flex justify-between items-end p-3 pb-2">
        <Link to={pdfurl} className="text-base text-stone-600 mb-3 mx-5 hover:underline">SHARE</Link>
        <Link to={pdfurl} className="text-base text-stone-600 mb-3 mx-5 hover:underline">PDF</Link>
      </div>
    </Card>
  );
}

export default ArticleCard