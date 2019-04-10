const isDivisibleBy5 = n => n % 5 === 0;
const isDivisibleBy3 = n => n % 3 === 0;
const isDivisibleBy3Oand5 = n => isDivisibleBy3(n) && isDivisibleBy5(n);
const identity = n => n
const always = x => () => x
const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
const cond = arr => x => arr.reduce((value, [pred, trans]) => value || pred(x) && trans(x), false);

const trasformToFizzOrBuzz = cond([
  [isDivisibleBy3Oand5,  always('FizzBuzz')],
  [isDivisibleBy5,       always('Buzz')],
  [isDivisibleBy3,       always('Fizz')],
  [always(true),         identity]
]);

const count = effect => (n = 1) => {
  if (n > 100) return;
  effect(n);
  return count(effect)(n + 1)
}

const fizzBuzz = count(compose(trasformToFizzOrBuzz, console.log));
fizzBuzz();

module.exports = {
  isDivisibleBy5,
  isDivisibleBy3,
  isDivisibleBy3Oand5,
  identity,
  cond,
  always,
  trasformToFizzOrBuzz,
  count,
  compose
}
