export type Error = {
  message: string;
  details?: string;
};

export type Response = {
  statusCode: number;
  headers: Record<string, unknown>;
  body: string;
};

export type TransactionResponse = {
  status: number;
  txHash: string;
  cumulativeGasUsed: string;
};

export type Position = {
  id: string;
  timestamp: number;
  trader: string;
  amm: string;
  margin: string;
  openNotional: string;
  size: string;
  tradingVolume: string;
  leverage: string;
  entryPrice: string;
  underlyingPrice: string;
  fee: string;
  realizedPnl: string;
  unrealizedPnl: string;
  badDebt: string;
  liquidationPenalty: string;
  fundingPayment: string;
  totalPnlAmount: string;
};

export type TelegramResponse = {
  id: number;
  from: number;
  chat: number;
  ts: number;
  text?: string;
};
