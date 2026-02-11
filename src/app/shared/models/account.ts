export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type Account = {
  id?: number;
  customerId: string;
  accountNumber?: string;
  status: AccountStatus;
};
