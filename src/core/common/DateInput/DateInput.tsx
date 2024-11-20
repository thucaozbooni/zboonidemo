import React, {Component} from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, TextInputProps } from 'react-native';
import styles from './styles'

interface Props {
  mask: string,
  validate?: boolean,
  activeColor?: string,
  onChange: (text: string| Date) => void,
};

type States = {
  date: string,
  mask: any,
  maxLength: number,
  isFocused: boolean,
}

class DateInput extends Component<Props, States> {

  static defaultProps = {
    mask: 'MM/DD/YYYY',
    onChange: () => {
      // 
    },
    activeColor: '#7368FF',
    validate: true,
  };
  input: any;

  constructor(props: Props) {
    super(props);
    // tslint:disable-next-line:no-unused-expression
    this.input = React.createRef<TextInput>();
    let index = -1;
    const mask = props.mask.split('').map((v) => {
      const isTextField = ['M', 'D', 'Y'].includes(v);

      if (isTextField) {
        index++;
      }

      return {
        text: v,
        isTextField,
        index,
      };
    });

    const maxLength = Array.prototype.filter.call(mask, (m) => m.isTextField)
      .length;

    this.state = {
      date: '',
      mask,
      maxLength,
      isFocused: false,
    };
  }

  handleTextChange(date: string) {
    const mask = Array.prototype.filter.call(
      this.state.mask,
      (v) => v.isTextField,
    );

    const M = Array.prototype.filter
      .call(this.state.mask, (v) => v.text === 'M')
      .map((v) => date[v.index])
      .join('');
    const D = Array.prototype.filter
      .call(this.state.mask, (v) => v.text === 'D')
      .map((v) => date[v.index])
      .join('');
    const Y = Array.prototype.filter
      .call(this.state.mask, (v) => v.text === 'Y')
      .map((v) => date[v.index])
      .join('');

    if (this.props.validate && date.length > this.state.date.length) {
      const maxMonth = 12;
      const  maxYear = 2100;

      // Only validate year if pattern is valid.
      if ([1, 2, 3, 4].includes(Y.length)) {
        const y = parseInt(
          Y.length < 4 ? `${Y}${'0'.repeat(4 - Y.length)}` : Y,
          10,
        );

        if (!(!Number.isNaN(y) && y <= maxYear)) {
          // tslint:disable-next-line:no-console
          console.log('INVALID YEAR');

          return;
        }
      }

      // Only validate month if pattern is valid (MM)
      if ([1, 2].includes(M.length)) {
        const m = parseInt(M.length === 1 && M[0] !== '0' ? `${M}0` : M, 10);

        if (!(!Number.isNaN(m) && m <= maxMonth)) {
          // tslint:disable-next-line:no-console
          console.log('INVALID MONTH');

          return;
        }
      }

      // Only validate date if pattern is valid and month has already been entered.
      if ([1, 2].includes(D.length) && M.length === 2) {
        const d = parseInt(D.length === 1 ? `${D}0` : D, 10);

        const maxDay = new Date(
          Y.length === 4 ? parseInt(Y, 10) : new Date().getFullYear(),
          // tslint:disable-next-line:radix
          parseInt(M),
          0,
        ).getDate();

        if (!(!Number.isNaN(d) && d <= maxDay)) {
          // tslint:disable-next-line:no-console
          console.log('INVALID DAY');

          return;
        }
      }
    }

    if (mask.length === date.length) {
      const finalDate = new Date(`${M}-${D}-${Y}`);

      this.props.onChange(
        finalDate.toString() === 'Invalid Date'
          ? String.prototype.slice
              .call(this.props.mask)
              .replace(/D{2}/g, D)
              .replace(/M{2}/g, M)
              .replace(/Y{4}/g, Y)
          : finalDate,
      );
    }

    this.setState({date});
  }

  render() {
    const {mask} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          editable={true}
          keyboardType={'number-pad'}
          style={styles.textNumber}
          onFocus={() => this.setState({isFocused: true})}
          onBlur={() => this.setState({isFocused: false})}
          maxLength={this.state.maxLength}
          ref={(ref) => {
            this.input = ref;
          }}
          value={this.state.date}
          onChangeText={(text) => this.handleTextChange(text)}
        />
        {mask.map((v: { isTextField: any; text: string ; index: number; }, key: string | number | null | undefined) => (
          <TouchableWithoutFeedback
            key={key}
            onPress={() => this.input.focus()}>
            <View style={{paddingHorizontal: 6}}>
              {v.isTextField ? (
                <View pointerEvents={'none'}>
                  <TextInput
                    placeholder={v.text}
                    placeholderTextColor={'#aaa'}
                    value={this.state.date[v.index]}
                    style={[{
                      borderBottomColor:
                        this.state.isFocused &&
                        this.state.date.length === v.index
                          ? this.props.activeColor
                          : '#aaa',
                    }, styles.textInput]}
                  />
                </View>
              ) : (
                <Text style={styles.text}>{v.text}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

export default DateInput;