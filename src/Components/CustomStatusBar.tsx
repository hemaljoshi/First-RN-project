import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
interface props {
  backgroundColor?: any;
  barStyle?: 'dark-content' | 'light-content' | 'default';
}
const CustomStatusBar: React.FC<props> = ({backgroundColor, barStyle}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{height: insets.top, backgroundColor: backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor ? backgroundColor : '#fff'}
        barStyle={barStyle ? barStyle : 'dark-content'}
      />
    </View>
  );
};

export default CustomStatusBar;
