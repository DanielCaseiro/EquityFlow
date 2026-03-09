import { useEffect, useState } from "react";
import type { CompanyTenK } from "../../company";
import { getTenK } from "../../api";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinners/Spinner";

type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[] | null>(null);

  useEffect(() => {
    const fetchTenKData = async () => {
      try {
        const value = await getTenK(ticker);
        setCompanyData(value);
      } catch {
        setCompanyData(null);
      }
    };

    void fetchTenKData();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
      {companyData ? (
        companyData.slice(0, 5).map((tenK) => (
          <TenKFinderItem key={tenK.fillingDate + tenK.symbol} tenK={tenK} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;