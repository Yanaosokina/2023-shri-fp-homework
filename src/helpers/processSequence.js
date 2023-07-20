import Api from '../tools/api';

import {
  allPass,
  test,
  __,
  gt,
  length,
  prop,
  partial,
  complement,
  tap,
  compose,
  andThen,
  cond,
  lt,
  mathMod,
  gte,
  lte
} from 'ramda';

const URL_NUMBERS = 'https://api.tech/numbers/base';
const URL_ANIMALS = 'https://animals.tech/';

const api = new Api();

const square = num => num ** 2;
const modForThreeToString = compose(String, mathMod(__, 3));
const gteTwo = gte(__, 2);
const lteTen = lt(__, 11);
const testOnlyNumbers = test(/^[0-9.]+$/);


const validate = allPass([
    lteTen,
    gteTwo,
    (x) => parseFloat(x) > 0,
    testOnlyNumbers,
]);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const handleFetchAnimal = compose(
    andThen(compose(handleSuccess, prop(['result']))),
    async (id) => await api.get(URL_ANIMALS + `${id}`, {}),
    tap(writeLog),
    square,
    tap(writeLog),
    modForThreeToString,
    tap(writeLog),
    length,
    tap(writeLog),
    prop(['result']),
  );


  const handleFetchBinary = compose(
    andThen(handleFetchAnimal),
    api.get(URL_NUMBERS),
    (value) => ({ from: 10, to: 2, number: value }),
    tap(writeLog),
    Math.round,
  );

  const start = cond([
    [validate, handleFetchBinary],
    [complement(validate), partial(handleError, ['ValidationError'])],
  ]);

  compose(start, tap(writeLog))(value);
};

export default processSequence;
