import { To } from 'react-router-dom';
import ArticleCard from './ArticleCard';

// Define the types for the article props
interface ArticleProps {
  title: string;
  authors: string;
  date: string;
  abstract: string;
  pdfurl: To;
  citations: number;
}

// ArticleColumn Function
function ArticleColumn({ articles }: { articles: ArticleProps[] }) {
  if (articles.length === 0) {
    return (
      <div className="flex justify-center pt-12 align-top">
        <p>No results found...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          authors={article.authors}
          date={article.date}
          description={article.abstract}
          pdfurl={article.pdfurl}
          citations={article.citations}
        />
      ))}
    </div>
  );
}

export default ArticleColumn;
