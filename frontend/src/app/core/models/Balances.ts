export class Balances {
  balanceAfterMonth?: number;
  balanceAfterTransaction?: number[];
  balanceMonth?: number;
}

export type MonthBalance = {
  period: string,
  balance: number
}

