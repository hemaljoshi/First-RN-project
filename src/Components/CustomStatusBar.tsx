import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
interface props {
  backgroundColor?: any;
  barStyle?: 'dark-content' | 'light-content' | 'default';
}
const CustomStatusBar: React.FC<props> = ({backgroundColor, barStyle}) => {
  const [backgroundColorState, setBackgroundColorState] = useState('#fff');
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setBackgroundColorState(backgroundColor);
  }, [backgroundColor]);
  return (
    <View style={{height: insets?.top, backgroundColor: backgroundColorState}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColorState}
        barStyle={barStyle ? barStyle : 'dark-content'}
      />
    </View>
  );
};

export default (props: props) => {
  return <CustomStatusBar {...props} />;
};
