import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
interface props {
  backgroundColor?: string;
  barStyle?: 'dark-content' | 'light-content' | 'default';
}
const CustomStatusBar: React.FC<props> = ({
  backgroundColor,
  barStyle = 'dark-content',
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor ? backgroundColor : 'white'}
        barStyle={barStyle ? barStyle : 'dark-content'}
      />
    </View>
  );
};
export default CustomStatusBar;
