import * as R from 'ramda';

export const messageTypes = {
  LEFT_VALUE_INPUT: 'LEFT_VALUE_INPUT',
  RIGHT_VALUE_INPUT: 'RIGHT_VALUE_INPUT',
  LEFT_UNIT_CHANGED: 'LEFT_UNIT_CHANGED',
  RIGHT_UNIT_CHANGED: 'RIGHT_UNIT_CHANGED'
};

// export function for function types
export function leftValueInputMessage(valueLeft) {
  return {
    type: 'LEFT_VALUE_INPUT',
    valueLeft: valueLeft
  };
}
// for right
export function rightValueInputMessage(valueRight) {
  return {
    type: 'RIGHT_VALUE_INPUT',
    valueRight: valueRight
  };
}

// if left selector changed
export function leftUnitChangedMessage(unitLeft) {
  return {
    type: 'LEFT_UNIT_CHANGED',
    unitLeft: unitLeft
  };
}

// if right selector changed
export function rightUnitChangedMessage(unitRight) {
  return {
    type: 'RIGHT_UNIT_CHANGED',
    unitRight: unitRight
  };
}

function round(number) {
  return Math.round(number * 10) / 10;
}

// Converting Algorithm Function
function convert(model) {
  const { valueLeft, valueRight, unitLeft, unitRight } = model;

  // if model.sourceLeft is true then use everything on Left
  // otherwise use everything from right.
  const [fromUnit, fromTemp, toUnit] = model.sourceLeft
    ? [unitLeft, valueLeft, unitRight]
    : [unitRight, valueRight, unitLeft];

  const otherValue = R.pipe(
    convertFromToTempValue,
    round
  )(fromUnit, toUnit, fromTemp);

  return model.sourceLeft
    ? { ...model, valueRight: otherValue }
    : { ...model, valueLeft: otherValue };
}

//
function convertFromToTempValue(fromUnit, toUnit, temp) {
  const convertFn = R.pathOr(
    R.identity, // Default value, return itself
    // return the value of "fromUnit.toUnit" see below UnitConversions object
    [fromUnit, toUnit],
    // the object set
    UnitConversions
  );
  console.log(temp);
  return convertFn(temp);
}

function FtoC(temp) {
  return (5 / 9) * (temp - 32);
}

function CtoF(temp) {
  return (9 / 5) * temp + 32;
}

function KtoC(temp) {
  return temp - 273.15;
}

function CtoK(temp) {
  return temp + 273.15;
}

const FtoK = R.pipe(
  FtoC,
  CtoK
);
const KtoF = R.pipe(
  KtoC,
  CtoF
);

const UnitConversions = {
  Celsius: {
    Fahrenheit: CtoF,
    Kelvin: CtoK
  },
  Fahrenheit: {
    Celsius: FtoC,
    Kelvin: FtoK
  },
  Kelvin: {
    Celsius: KtoC,
    Fahrenheit: KtoF
  }
};

// convert string to a integer number
const toInt = R.pipe(
  parseInt,
  R.defaultTo(0)
);

function update(msg, model) {
  switch (msg.type) {
    case messageTypes.LEFT_VALUE_INPUT: {
      if (msg.valueLeft === '') {
        return { ...model, sourceLeft: true, valueLeft: '', valueRight: '' };
      }
      const valueLeft = toInt(msg.valueLeft);
      return convert({ ...model, sourceLeft: true, valueLeft: valueLeft });
    }
    //
    case messageTypes.RIGHT_VALUE_INPUT: {
      if (msg.valueRight === '') {
        return {
          ...model,
          sourceLeft: false,
          valueLeft: '',
          valueRight: ''
        };
      }
      const valueRight = toInt(msg.valueRight);
      return convert({ ...model, sourceLeft: false, valueRight: valueRight });
    }
    //
    case messageTypes.LEFT_UNIT_CHANGED: {
      const { unitLeft } = msg;
      return convert({ ...model, unitLeft });
    }
    case messageTypes.RIGHT_UNIT_CHANGED: {
      const { unitRight } = msg;
      return convert({ ...model, unitRight });
    }
  }
  return model;
}

export default update;
