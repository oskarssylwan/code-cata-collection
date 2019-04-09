const {
  isDivisibleBy5,
  isDivisibleBy3,
  isDivisibleBy3Oand5,
  identity,
  cond,
  always,
  trasformToFizzOrBuzz,
  count,
  compose
} = require('./index');

describe('isDivisibleBy5', () => {

  it('must return false if number is not a multiple of 5', () => {
    expect(isDivisibleBy5(6)).toBe(false);
  });

  it('must return true if number is a multiple of 5', () => {
    expect(isDivisibleBy5(5)).toBe(true);
  });

});

describe('isDivisibleBy3', () => {

  it('must return false if number is not a multiple of 3', () => {
    expect(isDivisibleBy3(5)).toBe(false);
  });

  it('must return true if number is a multiple of 3', () => {
    expect(isDivisibleBy3(3)).toBe(true);
  });

});

describe('isDivisibleBy3Oand5', () => {

  it('must return false if number is not a multiple of 3 and 5', () => {
    expect(isDivisibleBy3Oand5(7)).toBe(false);
  });

  it('must return true if number is a multiple of 3 and 5', () => {
    expect(isDivisibleBy3Oand5(15)).toBe(true);
  });

});

describe('indentity', () => {
  it('must return whatever value it recieves', () => {
    expect(identity('hello')).toBe('hello');
    expect(identity(1)).toBe(1);
  });
});

describe('always', () => {
  it('must always return provided value when called', () => {
    expect(always('Always')()).toBe('Always');
    expect(always('Never')()).toBe('Never');
  })
});

describe('cond', () => {

  it('must call transformer function with provided value if corresponding predicate returns true', () => {
    const pred = jest.fn().mockReturnValue(true);
    const transformer = jest.fn();
    cond([[pred, transformer]])(2);
    expect(transformer).toHaveBeenCalledWith(2);
  });

  it('must not call transformer function if corresponding predicate returns false', () => {
    const pred = jest.fn().mockReturnValue(false);
    const transformer = jest.fn();
    cond([[pred, transformer]])(2);
    expect(transformer).not.toHaveBeenCalled();
  });

  it('must return value of called transformer', () => {
    const transformer = jest.fn().mockReturnValue('Yo');
    expect(cond([
      [always(true), transformer]
    ])()).toBe('Yo');
  });

});

describe('trasformToFizzOrBuzz', () => {

  it('must return Fizz if value is a multiple of 3', () => {
    expect(trasformToFizzOrBuzz(3)).toBe('Fizz')
  });

  it('must return Buzz if value is a multiple of 5', () => {
    expect(trasformToFizzOrBuzz(5)).toBe('Buzz')
  });

  it('must return FizzBuzz if value is a multiple of 5 and 3', () => {
    expect(trasformToFizzOrBuzz(15)).toBe('FizzBuzz')
  });

  it('must act as identity if value if not a multiuple of 5 or 3', () => {
    expect(trasformToFizzOrBuzz(7)).toBe(7)
  });

});

describe('compose', () => {

  it('must call the first function in list with the provided value', () => {
    const fn = jest.fn();
    compose(fn)(2)
    expect(fn).toHaveBeenCalledWith(2);
  });

  it('must call the next function in sequens with the result from calling the current function', () => {
    const fn = jest.fn();
    compose(identity, fn)(2)
    expect(fn).toHaveBeenCalledWith(2);
  });

});

describe('count', () => {
  it('must call effect 100 times', () => {
    const effect = jest.fn();
    count(effect)();
    expect(effect).toHaveBeenCalledTimes(100);
  });
});
