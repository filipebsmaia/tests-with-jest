import { ICustomer, IModelCustomersRepository, IUpdateCustomers } from './interfaces';

export default class CustomersRepository implements IModelCustomersRepository {

  getByIdentificationNumber(identificationNumber: string): Promise<ICustomer | null> {
    throw new Error('Method not implemented.');
  }
  async getByEmail(email: string): Promise<ICustomer | null> {
    throw new Error('Method not implemented.');
  }

  async create(props?: Partial<ICustomer>): Promise<ICustomer> {
    throw new Error('Method not implemented.');
  }

  async get(uid: string): Promise<ICustomer> {
    throw new Error('Method not implemented.');
  }

  async update(uid: string, data: {[P in keyof IUpdateCustomers]: IUpdateCustomers[P]}): Promise<void> {
    throw new Error('Method not implemented.');
  }

}