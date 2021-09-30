import FakeCustomersRepository from '@infra/repositories/CustomersRepository/fakes';
import { IModelCustomersRepository } from '@infra/repositories/CustomersRepository/interfaces';
import * as fakes from '@utils/fakes';
import CreateCustomerService from '../CreateCustomerService';

let customersRepository: IModelCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomerService', () => {

  beforeEach(() => {
    customersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(customersRepository);
  });

  it('should be able to create customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Stefany Martins',
      email: 'stefany@fbsm.com',
      identificationNumber: '00000000000',
      birthDate: new Date(1990, 0, 1)
    });

    expect(customer).resolves;
    expect(customer).toMatchObject({
      name: 'Stefany Martins',
      email: 'stefany@fbsm.com',
      identificationNumber: '00000000000',
      birthDate: new Date(1990, 0, 1)
    });
    expect(customer).toHaveProperty('id');
  });

  it('should be able to create customer', async () => {
    const generateIdMock = jest.spyOn(fakes, 'generateId').mockImplementation(() => 'as13l4j5h32jlkhn');
    const dateMock = jest.spyOn(Date, 'now').mockImplementation(() => new Date(2021, 8, 27).getTime());

    const customer = await createCustomerService.execute({
      name: 'Stefany Martins',
      email: 'stefany@fbsm.com',
      identificationNumber: '00000000000',
      birthDate: new Date(1990, 0, 1)
    });

    expect(customer).resolves;
    expect(customer).toMatchObject({
      id: 'as13l4j5h32jlkhn',
      name: 'Stefany Martins',
      email: 'stefany@fbsm.com',
      identificationNumber: '00000000000',
      birthDate: new Date(1990, 0, 1)
    });
    expect(customer).toHaveProperty('id');
    expect(generateIdMock).toBeCalled();
    expect(dateMock).toBeCalled();
  });
  it('should not be able to create customer when it is underage', async () => {
    const dateMock = jest.spyOn(Date, 'now').mockImplementation(() => new Date(2021, 8, 27).getTime());

    await expect(createCustomerService.execute({
      name: 'Stefany Martins',
      email: 'stefany@fbsm.com',
      identificationNumber: '00000000000',
      birthDate: new Date(2005, 0, 1)
    })).rejects.toThrow('User is underage');
    expect(dateMock).toBeCalled();
  });

  it('should not be able to create customer when has other customer with same email', async () => {
    await createCustomerService.execute({
      name: 'Stefany Martins',
      email: 'stefany@fbsm.com',
      identificationNumber: '00000000000',
      birthDate: new Date(1990, 0, 1)
    });

    await expect(createCustomerService.execute({
      name: 'Stefany Pereira',
      email: 'stefany@fbsm.com',
      identificationNumber: '11111111111',
      birthDate: new Date(1991, 0, 1)
    })).rejects.toThrow('Email is already being used');
  });

  it('should not be able to create customer when has other customer with same email', async () => {
    const getByEmailMock = jest.spyOn(customersRepository, 'getByEmail').mockImplementationOnce(async () => ({
      id: '123',
      name: 'Stefany Pereira',
      email: 'stefany@fbsm.com',
      identificationNumber: '11111111111',
      birthDate: new Date(1991, 0, 1)
    }));

    await expect(createCustomerService.execute({
      name: 'Stefany Pereira',
      email: 'stefany@fbsm.com',
      identificationNumber: '11111111111',
      birthDate: new Date(1991, 0, 1)
    })).rejects.toThrow('Email is already being used');
    expect(getByEmailMock).toBeCalled();
  });

  it('should not be able to create customer when has other customer with same identification number', async () => {
    const getByEmailMock = jest.spyOn(customersRepository, 'getByIdentificationNumber').mockImplementationOnce(async () => ({
      id: '123',
      name: 'Stefany Pereira',
      email: 'stefany@fbsm.com',
      identificationNumber: '11111111111',
      birthDate: new Date(1991, 0, 1)
    }));

    await expect(createCustomerService.execute({
      name: 'Stefany Pereira',
      email: 'stefany@fbsm.com',
      identificationNumber: '11111111111',
      birthDate: new Date(1991, 0, 1)
    })).rejects.toThrow('Identification number is already being used');
    expect(getByEmailMock).toBeCalled();
  });

});