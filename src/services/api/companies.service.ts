import { COMPANIES_BY_ID_API } from '@constants/api.constants';
import {
  IGetCompanyAPIResponse,
} from '@interfaces/companies.interfaces';
import { get, post } from '@helpers/axios.helpers';

export function getCompanyAPI(id: string): Promise<IGetCompanyAPIResponse> {
  return get(COMPANIES_BY_ID_API(id));
}
