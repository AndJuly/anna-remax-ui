import * as React from 'react';
import { View, Text } from 'remax/one';
import classNames from 'classnames';
import Icon from '../icon';
import FormValue from '../form-value';
import Picker from '../picker';
import Input, { InputProps } from '../input';
import { getPrefixCls } from '../common';

const prefixCls = getPrefixCls('cell');

export interface CellProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  description?: React.ReactNode;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  valueAlign?: 'left' | 'right' | 'center';
  verticality?: boolean;
  icon?: string;
  required?: boolean;
  border?: boolean;
  arrow?: boolean;
  extra?: React.ReactNode;
  field?: boolean;
  defaultNullValue?: string;
  onTap?: () => void;
}

const Cell = (props: CellProps) => {
  const {
    label,
    style,
    labelStyle,
    valueStyle,
    valueAlign = 'right',
    children,
    description,
    verticality,
    icon,
    border = true,
    arrow,
    extra,
    required,
    field,
    defaultNullValue = '',
    onTap,
  } = props;

  if (verticality) {
    return (
      <View className={prefixCls} style={style} onTap={onTap}>
        <View className={`${prefixCls}-verticality`}>
          {label ? (
            <View className={`${prefixCls}-verticality-label`} style={labelStyle}>
              {required ? <Text className={`${prefixCls}-verticality-required`}>*</Text> : null}
              {label}
            </View>
          ) : null}
          <View className={`${prefixCls}-verticality-value`} style={valueStyle}>
            {children}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      className={classNames(prefixCls, {
        [`${prefixCls}-border`]: border,
      })}
      style={style}
      onTap={onTap}
    >
      <View className={`${prefixCls}-container`}>
        <View
          className={classNames(`${prefixCls}-container-left`, {
            [`${prefixCls}-container-left-input`]: field,
          })}
        >
          <View className={`${prefixCls}-container-left-label`}>
            {required ? (
              <Text className={`${prefixCls}-container-left-label-required`}>*</Text>
            ) : null}
            {icon ? (
              <Icon type={icon} size="32px" style={{ marginRight: '10px' }} color="#333" />
            ) : null}
            {label ? (
              <Text className={`${prefixCls}-container-left-label-value`} style={labelStyle}>
                {label}
              </Text>
            ) : null}
          </View>
        </View>
        <View className={`${prefixCls}-container-right`}>
          <View
            className={classNames(
              `${prefixCls}-container-right-value`,
              `${prefixCls}-container-right-value-${valueAlign}`,
            )}
            style={valueStyle}
          >
            {children || children === 0 ? children : defaultNullValue}
          </View>
          {extra ? <View className={`${prefixCls}-extra`}>{extra}</View> : null}
          {arrow ? <Icon type="right" style={{ marginLeft: '10px' }} color="#666" /> : null}
        </View>
      </View>
      {description ? (
        <View className={`${prefixCls}-container-description`}>{description}</View>
      ) : null}
    </View>
  );
};

export interface CellPickerProps extends CellProps {
  range?: any[];
  rangeKey?: string;
  disabled?: boolean;
  [propName: string]: any;
}

Cell.Picker = (props: CellPickerProps) => {
  const {
    align = 'left',
    value,
    onChange,
    placeholder,
    children,
    disabled,
    range,
    rangeKey = 'text',
  } = props;

  let selectedText = '';
  if (Array.isArray(value)) {
    const selected = value.map((i, columnIndex) => range?.[columnIndex]?.[i]);
    selectedText = selected
      .map((i: any) => (typeof i === 'object' ? i[rangeKey] || '' : i))
      .join(' ');
  } else {
    const selected = range?.[value];
    selectedText = typeof selected === 'object' ? selected[rangeKey] || '' : selected;
  }

  return (
    <Cell field labelStyle={{ width: '180px' }} {...props}>
      <Picker
        range={range}
        rangeKey={rangeKey}
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        {children ?? (
          <FormValue
            placeholder={placeholder}
            style={
              {
                textAlign: align,
                color: disabled ? '#999' : undefined,
              } as React.CSSProperties
            }
          >
            {selectedText}
          </FormValue>
        )}
      </Picker>
    </Cell>
  );
};

export interface CellInputProps extends CellProps, InputProps {
  [propName: string]: any;
}

const defaultInputWrapperStyle = {
  display: 'flex',
  padding: 0,
  border: 0,
};

const defaultInputStyle = {
  height: '48px',
  lineHeight: '48px',
  minHeight: '48px',
};

Cell.Input = (props: CellInputProps) => {
  return (
    <Cell field labelStyle={{ width: '180px' }} {...props}>
      <Input {...props} style={defaultInputWrapperStyle} inputStyle={defaultInputStyle} />
    </Cell>
  );
};

export default Cell;
