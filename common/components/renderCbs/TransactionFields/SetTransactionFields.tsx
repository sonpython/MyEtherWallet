import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'reducers';
import {
  TransactionFieldPayloadedAction,
  setValueField,
  setGasLimitField,
  setDataField,
  setToField,
  setNonceField,
  TSetGasLimitField,
  TSetDataField,
  TSetToField,
  TSetNonceField,
  TSetValueField
} from 'actions/transactionFields';
import { upperFirst } from 'lodash';

type FieldNames = keyof AppState['transactionFields'];
type FieldSetter = (
  payload: TransactionFieldPayloadedAction['payload']
) => void;
interface ReduxProps {
  setGasLimitField: TSetGasLimitField;
  setDataField: TSetDataField;
  setToField: TSetToField;
  setNonceField: TSetNonceField;
  setValueField: TSetValueField;
}
interface SetterProps {
  name: FieldNames;
  withFieldSetter(setter: FieldSetter): React.ReactElement<any> | null;
}

class SetTransactionFieldsClass extends Component<SetterProps & ReduxProps> {
  public render() {
    return this.props.withFieldSetter(this.fieldSetter);
  }
  private fieldSetter = (payload: TransactionFieldPayloadedAction['payload']) =>
    this.props[`set${upperFirst(this.props.name)}Field`](payload);
}

export const SetTransactionFields = connect(null, {
  setGasLimitField,
  setDataField,
  setToField,
  setNonceField,
  setValueField
})(SetTransactionFieldsClass);
