const isDevisibleBy5 = n => n % 5 === 0;
const isDevisibleBy3 = n => n % 3 === 0;
const identity = n => n
const always = x => () => x
const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const cond = arr => x => arr.reduce((value, [pred, trans]) => {
  if (value) return value;
  if (pred(x)) return trans(x);
  return value
}
, false);

const trasformToFizzOrBuzz = cond([
  [isDevisibleBy5,  always('Buzz')],
  [isDevisibleBy3,  always('Fizz')],
  [always(true),    identity]
]);

const count = effect => (n = 1) => {
  if (n > 100) return;
  effect(n);
  return count(effect)(n + 1)
}

const fizzBuzz = count(compose(trasformToFizzOrBuzz, console.log));
fizzBuzz();

module.exports = {
  isDevisibleBy5,
  isDevisibleBy3,
  identity,
  cond,
  always,
  trasformToFizzOrBuzz,
  count,
  compose
}
