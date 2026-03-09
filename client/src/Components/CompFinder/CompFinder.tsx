import { useEffect, useState } from "react";
import CompFinderItem from "./CompFinderItem/CompFinderItem";
import type { CompanyCompData } from "../../company";
import { getCompData } from "../../api";
import Spinner from "../Spinners/Spinner";

type Props = {
  ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyCompData | null>(null);

  useEffect(() => {
    const fetchComps = async () => {
      try {
        const value = await getCompData(ticker);
        setCompanyData(value[0] ?? null);
      } catch {
        setCompanyData(null);
      }
    };

    void fetchComps();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
      {companyData ? (
        companyData.peersList.map((peerTicker) => (
          <CompFinderItem key={peerTicker} ticker={peerTicker} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CompFinder;