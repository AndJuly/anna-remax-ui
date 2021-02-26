import React, { useRef } from 'react';
import { View } from 'remax/one';
import classNames from 'classnames';
import { Filter, Tag } from 'annar';
import { Block, Frame } from '../../common';
import styles from './index.module.scss';

const { CheckableTag } = Tag;

const options = [
  {
    value: '0',
    text: '装饰片',
  },
  {
    value: '1',
    text: '织带',
  },
  {
    value: '2',
    text: '缝纫线',
  },
  {
    value: '3',
    text: '花边',
  },
  {
    value: '4',
    text: '珠钻',
  },
];

const options1 = [
  {
    value: '0',
    text: '1000',
  },
  {
    value: '1',
    text: '2000',
  },
  {
    value: '2',
    text: '3000',
  },
];

export default () => {
  const moreRef = useRef<any>();
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  const [value2, setValue2] = React.useState('2');
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);

  const handleComplete = () => {
    moreRef.current.toggle();
  };

  const handleReset = () => {
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);
  };

  return (
    <Frame grayBg style={{ overflow: 'hidden' }}>
      <Block title="Basic">
        <Filter style={{ zIndex: 5 }}>
          <Filter.Item
            title="品类"
            value={value}
            options={options}
            onChange={e => setValue(e.value)}
          />
          <Filter.Item
            title="价格"
            value={value1}
            options={options1}
            onChange={e => setValue1(e.value)}
          />
        </Filter>
      </Block>
      <Block title="Custom">
        <Filter style={{ zIndex: 4 }}>
          <Filter.Item
            title="品类"
            value={value2}
            options={options}
            onChange={e => setValue2(e.value)}
          />
          <Filter.Item title="更多" ref={moreRef}>
            <View className={styles.custom}>
              <View className={styles.tags}>
                <View className={styles.tag}>
                  <View className={styles.title}>品质</View>
                  <CheckableTag checked={checked1} onChange={v => setChecked1(v)}>
                    大众优选
                  </CheckableTag>
                  <CheckableTag checked={checked2} onChange={v => setChecked2(v)}>
                    点评高分
                  </CheckableTag>
                </View>
                <View className={styles.tag}>
                  <View className={styles.title}>速度</View>
                  <CheckableTag checked={checked3} onChange={() => setChecked3(v => !v)}>
                    60分钟内
                  </CheckableTag>
                  <CheckableTag checked={checked4} onChange={() => setChecked4(v => !v)}>
                    40分钟内
                  </CheckableTag>
                </View>
              </View>
              <View className={styles.action}>
                <View
                  className={classNames({
                    [styles.btn]: true,
                    [styles.reset]: true,
                  })}
                  onTap={handleReset}
                >
                  重置
                </View>
                <View
                  className={classNames({
                    [styles.btn]: true,
                    [styles.complete]: true,
                  })}
                  onTap={handleComplete}
                >
                  完成
                </View>
              </View>
            </View>
          </Filter.Item>
        </Filter>
      </Block>
      <Block title="ActiveColor">
        <Filter style={{ zIndex: 3 }}>
          <Filter.Item
            title="品类"
            value={value}
            options={options}
            onChange={e => setValue(e.value)}
            activeColor="#FF7777"
          />
          <Filter.Item
            title="价格"
            value={value1}
            options={options1}
            onChange={e => setValue1(e.value)}
            activeColor="#FF7777"
          />
        </Filter>
      </Block>
      <Block title="Disabled">
        <Filter style={{ zIndex: 2 }}>
          <Filter.Item
            title="品类"
            value={value}
            options={options}
            onChange={e => setValue(e.value)}
            disabled
          />
          <Filter.Item
            title="价格"
            value={value1}
            options={options1}
            onChange={e => setValue1(e.value)}
            disabled
          />
        </Filter>
      </Block>
    </Frame>
  );
};
