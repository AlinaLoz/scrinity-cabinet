import { CRITERIONS_API } from '@constants/api.constants';
import { get } from '@helpers/axios.helpers';

export function getCriterions(): Promise<Record<string, string>> {
  return get(CRITERIONS_API);
}
