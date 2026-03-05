import type { FormEvent } from "react";
import Card from "../Card/Card";
import type { CompanySearch } from "../../company";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: FormEvent<HTMLFormElement>) => void;
}

const CardList = ({ searchResults, onPortfolioCreate }: Props) => {
  if (searchResults.length === 0) {
    return (
      <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
        No results!
      </p>
    );
  }

  return (
    <div>
      {searchResults.map((result) => (
        <Card
          id={result.symbol}
          key={result.symbol}
          searchResult={result}
          onPortfolioCreate={onPortfolioCreate}
        />
      ))}
    </div>
  );
};

export default CardList;