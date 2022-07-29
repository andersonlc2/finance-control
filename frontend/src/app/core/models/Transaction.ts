export class Transaction {
  id?: string;
  type?: {
    id: number,
    name: string,
  };
  description?: string;
  debitOrCredit?: string;
  dueDate?: string;
  value?: number;
  status?: string
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
