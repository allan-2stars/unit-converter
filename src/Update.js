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
      return { ...model, sourceLeft: true, valueLeft: valueLeft };
    }
    //
    case messageTypes.RIGHT_VALUE_INPUT: {
      if (msg.valueRight === '') {
        return { ...model, sourceLeft: false, valueLeft: '', valueRight: '' };
      }
      const valueRight = toInt(msg.valueRight);
      return { ...model, sourceLeft: false, valueRight: valueRight };
    }
    //
    case messageTypes.LEFT_UNIT_CHANGED: {
      const { unitLeft } = msg;
      return { ...model, unitLeft };
    }
    case messageTypes.RIGHT_UNIT_CHANGED: {
      const { unitRight } = msg;
      return { ...model, unitRight };
    }
  }
  return model;
}

export default update;
