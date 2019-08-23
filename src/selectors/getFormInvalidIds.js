// @flow
import type { Structure, GetFormState } from '../types'
import type { GetFormInvalidIdsInterface } from './getFormInvalidIds.types'

const createGetFormInvalidIds = ({ getIn, empty }: Structure<*, *>) => (
  form: string,
  getFormState: ?GetFormState
): GetFormInvalidIdsInterface => (state: any) => {
  const nonNullGetFormState: GetFormState =
    getFormState || (state => getIn(state, 'form'))
  return getIn(nonNullGetFormState(state), `${form}.invalidIds`) || empty
}

export default createGetFormInvalidIds
