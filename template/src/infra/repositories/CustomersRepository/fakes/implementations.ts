import { generateId } from '@utils/fakes';
import { ICreateFake } from '@utils/fakes/interfaces';
import { ICustomer } from '../interfaces';

export const createFakeCustomers = ({ uid, props }: ICreateFake<ICustomer>): ICustomer => {

  const customer: ICustomer = {
    id: uid || generateId(),
    email: 'example@example.com',
    identificationNumber: '00000000000',
    name: 'Example Exampler',
    birthDate: new Date()
  };

  return Object.assign(customer, props);
} ;