const {
  findSubset,
  storeResult
} = require('../lib')
const {
  mockedInput,
  mockedOutput
} = require('../__mocks__')

describe('Test suite for clicks app', () => {

  it('should return an error in case of no input arguments', () => {
    expect(findSubset).toThrow('No Input!')
  })

  it('should have equal no. of items in case of valid input', () => {
    expect(findSubset(mockedInput).length).toBe(mockedOutput.length)
  })

})