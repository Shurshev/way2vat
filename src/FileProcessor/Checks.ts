import { Check, Expense, STATUS } from '../types';
import { logger } from '../utils/logger';
import { faker } from '@faker-js/faker/locale/en';

class AllowedCompaniesCheck implements Check {
  private allowedCompanies: Set<string>;

  constructor(allowedCompanies: string[]) {
    this.allowedCompanies = new Set(allowedCompanies);
  }

  check(expense: Omit<Expense, 'status'>) {
    if(this.allowedCompanies.has(expense.companyName)) {
      return { result: true }
    }
    return { errorStatus: STATUS.EXCLUDED, result: false }
  }
}

class ImageCheck implements Check {

  check = async (expense: Omit<Expense, 'status'>) => {
    if(!expense.img) return { errorStatus: STATUS.FAILED, result: false }
    const isImgExist = await this._isPublicS3ObjectAvailable(expense.img)
    if(!isImgExist) {
      return { errorStatus: STATUS.FAILED, result: false }
    }
    return { result: true }
  }

   _isPublicS3ObjectAvailable = async (url: string): Promise<boolean> => {
    try {
      return faker.datatype.boolean({ probability: 0.9});
      //TODO how It Should Work, but for test we will mock it
      // const response = await fetch(url, { method: 'HEAD' });
      // return response.ok
      // of if we have access to the s3 bucket we can use S3 lib for it by checking metadata of the object
    } catch (e) {
      // @ts-ignore
      logger.warn(e.message)
      return false
    }
  }
}

class AmountCheck implements Check {
  check(expense: Omit<Expense, 'status'>): { errorStatus?: STATUS; result: boolean } {
    if(expense.amount === 0) return { errorStatus: STATUS.FAILED, result: false }
    return { result: true }
  }
}

export const getChecks = (allowedCompanies: string[]): Check[] => [
  new AllowedCompaniesCheck(allowedCompanies),
  new AmountCheck(),
  new ImageCheck(),
]