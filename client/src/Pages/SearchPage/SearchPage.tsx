import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";

import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";

import type { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";

import { toast } from "react-toastify";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]);
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    void getPortfolio();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPortfolio = async () => {
    try {
      const res = await portfolioGetAPI();
      setPortfolioValues(res?.data ?? []);
    } catch (error) {
      setPortfolioValues([]);
    }
  };

  const onPortfolioCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const symbol = String(formData.get("symbol") ?? "");

    if (!symbol) {
      toast.warning("Invalid stock symbol.");
      return;
    }

    try {
      const res = await portfolioAddAPI(symbol);

      if (res?.status === 204) {
        toast.success("Stock added to portfolio!");
        await getPortfolio();
      } else {
        toast.warning("Could not add stock to portfolio!");
      }
    } catch (error) {
      toast.warning("Could not add stock to portfolio!");
    }
  };

  const onPortfolioDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const symbol = String(formData.get("symbol") ?? "");

    if (!symbol) {
      toast.warning("Invalid stock symbol.");
      return;
    }

    try {
      const res = await portfolioDeleteAPI(symbol);

      if (res?.status === 200) {
        toast.success("Stock deleted from portfolio!");
        await getPortfolio();
      } else {
        toast.warning("Could not delete stock from portfolio!");
      }
    } catch (error) {
      toast.warning("Could not delete stock from portfolio!");
    }
  };

  const onSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();
    if (!query) {
      setSearchResults([]);
      setServerError(null);
      return;
    }

    try {
      setServerError(null);

      // IMPORTANT: in the Vite-friendly api.ts I gave you, searchCompanies returns CompanySearch[]
      const results = await searchCompanies(query);

      setSearchResults(results);
    } catch (error) {
      setServerError("Unable to connect to API");
      setSearchResults([]);
    }
  };

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        searchString={search}
        handleSearchChange={handleSearchChange}
      />

      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />

      <CardList
        searchResults={searchResults}
        onPortfolioCreate={onPortfolioCreate}
      />

      {serverError && <div>{serverError}</div>}
    </>
  );
};

export default SearchPage;