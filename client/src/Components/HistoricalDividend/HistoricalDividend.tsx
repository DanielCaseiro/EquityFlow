import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getHistoricalDividend } from "../../api";
import SimpleLineChart from "../SimpleLineChart/SimpleLineChart";
import type { Dividend } from "../../company";

const HistoricalDividend = () => {
  const ticker = useOutletContext<string>();
  const [dividend, setDividend] = useState<Dividend[] | null>(null);

  useEffect(() => {
    const fetchHistoricalDividend = async () => {
      try {
        const value = await getHistoricalDividend(ticker);

        const sortedDividends = value.historical
          .slice(0, 18)
          .sort((a, b) => {
            const c = new Date(a.date);
            const d = new Date(b.date);
            return c.getTime() - d.getTime();
          });

        setDividend(sortedDividends);
      } catch {
        setDividend([]);
      }
    };

    void fetchHistoricalDividend();
  }, [ticker]);

  return (
    <>
      {dividend && dividend.length > 0 ? (
        <SimpleLineChart data={dividend} xAxis="label" dataKey="dividend" />
      ) : (
        <h1 className="ml-3">Company does not have a dividend!</h1>
      )}
    </>
  );
};

export default HistoricalDividend;