export class Transaction {
  id?: string;
  type?: Type;
  description?: string;
  debitOrCredit?: string;
  dueDate?: string;
  value?: number;
  status?: string;
  afterBalance?: number;
}

export type TransactionPages = {
  content: Transaction[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type Type = {
  id?: number,
  name: string,
}
