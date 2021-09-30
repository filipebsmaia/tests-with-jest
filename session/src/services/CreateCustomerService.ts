import { differenceInYears } from 'date-fns';
import { ICustomer, IModelCustomersRepository } from '@infra/repositories/CustomersRepository/interfaces';

export interface IRequest {
  name: string;
  email: string;
  identificationNumber: string;
  birthDate: Date;
}

export type IResponse = ICustomer;

export default class CreateCustomerService {
  private customersRepository: IModelCustomersRepository;

  constructor(
    CustomersRepository: IModelCustomersRepository,
  ) {
    this.customersRepository = CustomersRepository;
  }

  async execute({ email, identificationNumber, name, birthDate }: IRequest): Promise<IResponse> {
    const hasCustomerWithEmail = await this.customersRepository.getByEmail(email);
    if (hasCustomerWithEmail) {
      throw new Error('Email is already being used');
    }

    const hasCustomerWithIdentificationNumber = await this.customersRepository.getByIdentificationNumber(email);
    if (hasCustomerWithIdentificationNumber) {
      throw new Error('Identification number is already being used');
    }

    const age = differenceInYears(Date.now(), birthDate);
    const isUnderAge = age < 18;
    if (isUnderAge) {
      throw new Error('User is underage');
    }

    const customer = await this.customersRepository.create({
      email,
      identificationNumber,
      name,
      birthDate
    });

    return customer;
  }
}