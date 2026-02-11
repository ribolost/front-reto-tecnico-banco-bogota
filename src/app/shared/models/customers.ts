export type DocumentType = 'CC' | 'CE' | 'PAS';

export enum DocumentTypes {
  CC = 'CC',
  CE = 'CE',
  PAS = 'PAS',
}

export type Customer = {
  id?: number;
  documentType: DocumentType;
  documentNumber: string;
  fullName: string;
  email: string;
};

export type CustomerCreationResponse = Customer;
