import axios from "axios";
import type {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyCompData,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
  CompanyHistoricalDividend,
  Dividend,
} from "./company";

const API_KEY = import.meta.env.VITE_FMP_API_KEY;
const BASE_URL = "https://financialmodelingprep.com/api";

if (!API_KEY) {
  throw new Error("Missing VITE_FMP_API_KEY in environment variables");
}

/* =========================
   SEARCH
========================= */

export const searchCompanies = async (query: string) => {
  const response = await axios.get<CompanySearch[]>(
    `${BASE_URL}/v3/search`,
    {
      params: {
        query,
        limit: 10,
        exchange: "NASDAQ",
        apikey: API_KEY,
      },
    }
  );

  return response.data;
};

/* =========================
   COMPANY PROFILE
========================= */

export const getCompanyProfile = async (symbol: string) => {
  const response = await axios.get<CompanyProfile[]>(
    `${BASE_URL}/v3/profile/${symbol}`,
    {
      params: { apikey: API_KEY },
    }
  );

  return response.data;
};

/* =========================
   KEY METRICS
========================= */

export const getKeyMetrics = async (symbol: string) => {
  const response = await axios.get<CompanyKeyMetrics[]>(
    `${BASE_URL}/v3/key-metrics-ttm/${symbol}`,
    {
      params: {
        limit: 40,
        apikey: API_KEY,
      },
    }
  );

  return response.data;
};

/* =========================
   INCOME STATEMENT
========================= */

export const getIncomeStatement = async (symbol: string) => {
  const response = await axios.get<CompanyIncomeStatement[]>(
    `${BASE_URL}/v3/income-statement/${symbol}`,
    {
      params: {
        limit: 50,
        apikey: API_KEY,
      },
    }
  );

  return response.data;
};

/* =========================
   BALANCE SHEET
========================= */

export const getBalanceSheet = async (symbol: string) => {
  const response = await axios.get<CompanyBalanceSheet[]>(
    `${BASE_URL}/v3/balance-sheet-statement/${symbol}`,
    {
      params: {
        limit: 20,
        apikey: API_KEY,
      },
    }
  );

  return response.data;
};

/* =========================
   CASH FLOW
========================= */

export const getCashFlow = async (symbol: string) => {
  const response = await axios.get<CompanyCashFlow[]>(
    `${BASE_URL}/v3/cash-flow-statement/${symbol}`,
    {
      params: {
        limit: 100,
        apikey: API_KEY,
      },
    }
  );

  return response.data;
};

/* =========================
   COMPARABLE PEERS
========================= */

export const getCompData = async (symbol: string) => {
  const response = await axios.get<CompanyCompData[]>(
    `${BASE_URL}/v4/stock_peers`,
    {
      params: {
        symbol,
        apikey: API_KEY,
      },
    }
  );

  return response.data;
};

/* =========================
   10-K FILINGS
========================= */

export const getTenK = async (symbol: string) => {
  const response = await axios.get<CompanyTenK[]>(
    `${BASE_URL}/v3/sec_filings/${symbol}`,
    {
      params: {
        type: "10-K",
        page: 0,
        apikey: API_KEY,
      },
    }
  );

  return response.data;
};

/* =========================
   HISTORICAL DIVIDENDS
========================= */

export const getHistoricalDividend = async (symbol: string) => {
  const response = await axios.get<CompanyHistoricalDividend>(
    `${BASE_URL}/v3/historical-price-full/stock_dividend/${symbol}`,
    {
      params: { apikey: API_KEY },
    }
  );

  return response.data;
};