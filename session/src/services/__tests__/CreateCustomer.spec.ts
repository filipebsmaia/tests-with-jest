import FakeCustomersRepository from '@infra/repositories/CustomersRepository/fakes';
import { IModelCustomersRepository } from '@infra/repositories/CustomersRepository/interfaces';
import CreateCustomerService from '../CreateCustomerService';
import * as fakes from '@utils/fakes';

let customersRepository: IModelCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {

  beforeEach(() => {
    customersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(customersRepository);
  });

});