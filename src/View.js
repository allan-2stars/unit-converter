import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { leftValueInputMessage, rightValueInputMessage } from './Update';

const { div, h1, pre, input, select, option } = hh(h);

const UNITS = ['Fahrenheit', 'celsius', 'Kelvin'];

function unitOptions(selectedUnit) {
  return R.map(
    unit => option({ value: unit, selected: selectedUnit === unit }, unit),
    UNITS
  );
}

function unitSection(dispatch, unit, value, inputMessage) {
  return div({ className: 'w-50 ma1' }, [
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-rest ba',
      value,
      oninput: e => dispatch(inputMessage(e.target.value))
    }),
    select(
      {
        className: 'db w-100 pa2 ba input-reset br1 bg-white ba b--black'
      },
      unitOptions(unit)
    )
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div({ className: 'flex' }, [
      unitSection(
        dispatch,
        model.unitLeft,
        model.valueLeft,
        leftValueInputMessage
      ),
      unitSection(
        dispatch,
        model.unitRight,
        model.valueRight,
        rightValueInputMessage
      )
    ]),

    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
