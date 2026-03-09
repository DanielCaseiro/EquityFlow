import type { CommentGet } from "./Comment";

export interface PortfolioGet {
  id: number;
  symbol: string;
  companyName: string;
  purchase: number;
  lastDiv: number;
  industry: string;
  marketCap: number;
  comments: CommentGet[];
}

export interface PortfolioPost {
  symbol: string;
}