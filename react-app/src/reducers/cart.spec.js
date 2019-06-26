import cartReducer from './cart';

describe('test', () => {
  it('should pass', () => {
    expect(cartReducer({}, {})).toEqual({
      addedIds: [],
      quantityById: {}
    });
  });
});
