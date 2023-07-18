import { allPass, compose, gte, equals, prop, complement, propEq, dissoc, countBy, identity, values, __, dissoc } from 'ramda';
import { COLORS, SHAPES } from '../constants';

const { STAR, SQUARE, TRIANGLE, CIRCLE } = SHAPES;
const { RED, BLUE, ORANGE, GREEN, WHITE } = COLORS;

//figures
const getStar = prop(STAR);
const getTriangle = prop(TRIANGLE);
const getSquare = prop(SQUARE);
const getCircle = prop(CIRCLE);

//colors
const isRed = equals(RED);
const isWhite = equals(WHITE);
const isGreen = equals(GREEN);
const isOrange = equals(ORANGE);
const isBlue = equals(BLUE);
const getGreen = prop(GREEN);
const twoGreens = propEq(GREEN, 2);
const oneReds = propEq(RED, 1);
const dissocWhite = dissoc(WHITE);
const allHasColor = color => compose(propEq(color, 4), numberOfColors);;


const isRedStar = compose(isRed, getStar);
const isGreenSquare = compose(isGreen, getSquare);
const isWhiteTriangle = compose(isWhite, getTriangle);
const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);
const isGreenTriangle = compose(isGreen, getTriangle);
const isWhiteSquare = compose(isWhite, getSquare);

const isNotRedStar = complement(isRedStar);
const isNotWhiteStar = complement(isWhiteTriangle);
const isNotWhiteSquare = complement(isWhiteSquare);
const isNotWhiteTriangle = complement(isWhiteTriangle);



const numberOfColors = compose(countBy(identity), values);
const numberOfColorsWithoutWhite = compose(dissocWhite, numberOfColors);

const greaterOrEqualsThenTwo = gte(__, 2);
const anyGreaterOrEqualsThenThree = gte(__, 3);
const anyValueGreaterOrEqualsThenThree = compose(anyGreaterOrEqualsThenThree, values);


const numberOfGreenColors = compose(getGreen,numberOfColors);
const twoGreenColors = compose(twoGreens, numberOfColors);
const oneRedColor = compose(oneReds, numberOfColors);
const redEqualsBlue = ({blue, red}) => blue === red;
const squareEqualsTriangle = ({square, triangle}) => square === triangle;





// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(greaterOrEqualsThenTwo, numberOfGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redEqualsBlue, numberOfColors);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isRedStar, isBlueCircle, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(anyValueGreaterOrEqualsThenThree, numberOfColorsWithoutWhite);
;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, twoGreenColors, oneRedColor]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allHasColor(ORANGE);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allHasColor(GREEN)

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isNotWhiteSquare, isNotWhiteTriangle, squareEqualsTriangle]);;
