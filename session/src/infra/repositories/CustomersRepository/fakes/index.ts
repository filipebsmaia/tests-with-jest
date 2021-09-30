import { generateId } from '@utils/fakes';
import { object as dotToObject } from 'dot-object';
import { ICustomer, IModelCustomersRepository, IUpdateCustomers } from '../interfaces';
import { createFakeCustomers } from './implementations';

export default class FakeCustomersRepository implements IModelCustomersRepository {

  private repository: ICustomer[] = [];

  async create(props?: Partial<ICustomer>): Promise<ICustomer> {
    const customer = createFakeCustomers({ uid: generateId(), props });
    this.repository.push(customer);
    return customer;
  }

  async get(uid: string): Promise<ICustomer> {
    const customers = this.repository.find(customers => customers.id === uid);
    if (!customers) {
      throw new Error('Customer not found');
    }
    return customers;
  }

  async getByEmail(email: string): Promise<ICustomer | null> {
    const customer = this.repository.find(customers => customers.email === email) || null;
    return customer;
  }

  async getByIdentificationNumber(identificationNumber: string): Promise<ICustomer | null> {
    const customer = this.repository.find(customers => customers.identificationNumber === identificationNumber) || null;
    return customer;
  }

  async update(uid: string, data: {[P in keyof IUpdateCustomers]: IUpdateCustomers[P]}): Promise<void> {
    const customers = await this.get(uid);
    const customersIndex = this.repository.findIndex(customers => customers.id === uid);

    const parsedData = dotToObject(data);
    this.repository[customersIndex] = Object.assign(customers, parsedData);
  }

}