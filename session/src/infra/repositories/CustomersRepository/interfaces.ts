export interface IModelCustomersRepository {
  create(props?: Partial<ICustomer>): Promise<ICustomer>;
  get(uid: string): Promise<ICustomer>;
  getByEmail(email: string): Promise<ICustomer | null>;
  getByIdentificationNumber(identificationNumber: string): Promise<ICustomer | null>;
  update(uid: string, data: {[P in keyof IUpdateCustomers]: IUpdateCustomers[P]}): Promise<void>;
}

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  identificationNumber: string;
  birthDate: Date;
}

export type IUpdateCustomers = Omit<{
  // Dot notation fields
} & Partial<ICustomer>, 'excludeField1' | 'excludeField2'>