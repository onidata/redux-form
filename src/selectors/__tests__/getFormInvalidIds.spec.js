import createGetFormInvalidIds from '../getFormInvalidIds'
import plain from '../../structure/plain'
import plainExpectations from '../../structure/plain/__tests__/expectations'
import immutable from '../../structure/immutable'
import immutableExpectations from '../../structure/immutable/__tests__/expectations'

const describeGetFormInvalidIds = (name, structure, setup) => {
  const getFormInvalidIds = createGetFormInvalidIds(structure)

  const { fromJS, getIn } = structure

  describe(name, () => {
    beforeAll(() => {
      setup()
    })

    it('should return a function', () => {
      expect(typeof createGetFormInvalidIds('foo')).toBe('function')
    })

    it('should get the form values from state', () => {
      expect(
        getFormInvalidIds('foo')(
          fromJS({
            form: {
              foo: {
                invalidIds: {
                  inv: {
                    dog: 'Snoopy',
                    cat: 'Garfield'
                  }
                }
              }
            }
          })
        )
      ).toEqualMap({
        inv: {
          dog: 'Snoopy',
          cat: 'Garfield'
        }
      })
    })

    it('should return object if there are no invalid ids', () => {
      expect(
        getFormInvalidIds('foo')(
          fromJS({
            form: {
              foo: {}
            }
          })
        )
      ).toEqual(fromJS({}))
    })

    it('should use getFormState if provided', () => {
      expect(
        getFormInvalidIds('foo', state => getIn(state, 'someOtherSlice'))(
          fromJS({
            someOtherSlice: {
              foo: {
                invalidIds: {
                  inv: {
                    dog: 'Snoopy',
                    cat: 'Garfield'
                  }
                }
              }
            }
          })
        )
      ).toEqualMap({
        inv: {
          dog: 'Snoopy',
          cat: 'Garfield'
        }
      })
    })
  })
}

describeGetFormInvalidIds('getFormInvalidIds.plain', plain, () =>
  expect.extend(plainExpectations)
)
describeGetFormInvalidIds('getFormInvalidIds.immutable', immutable, () =>
  expect.extend(immutableExpectations)
)
