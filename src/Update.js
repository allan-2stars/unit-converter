import * as R from 'ramda';

export const messageTypes = {
  LEFT_VALUE_INPUT: 'LEFT_VALUE_INPUT',
  RIGHT_VALUE_INPUT: 'RIGHT_VALUE_INPUT'
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
  }
  return model;
}

export default update;
