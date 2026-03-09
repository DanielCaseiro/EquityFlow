import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinners/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";

const CompanyPage = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const [company, setCompany] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      if (!ticker) return;

      try {
        const result = await getCompanyProfile(ticker);
        setCompany(result[0] ?? null);
      } catch (error) {
        setCompany(null);
      }
    };

    void fetchCompanyProfile();
  }, [ticker]);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />

          <CompanyDashboard ticker={ticker ?? ""}>
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile title="Price" subTitle={`$${company.price}`} />
            <Tile title="DCF" subTitle={`$${company.dcf}`} />
            <Tile title="Sector" subTitle={company.sector} />
            <CompFinder ticker={company.symbol} />
            <TenKFinder ticker={company.symbol} />

            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;