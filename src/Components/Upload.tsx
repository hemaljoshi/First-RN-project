import {
  Image,
  Platform,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import DocumentPicker from 'react-native-document-picker';
import AppBar from '../Navigators/AppBar';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../UIComponents/CustomButton';

const {height, width} = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<ParamListBase>;
}
interface State {
  fileName: string;
  file: any[];
  resourcePath: string;
}
export default class Upload extends Component<Props, State> {
  state: State = {
    fileName: '',
    file: [],
    resourcePath: '',
  };
  firstBtn = {
    title: 'Back',
    onPress: () => {
      this.props.navigation.goBack();
    },
  };
  selectFile = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      const temp = [...this.state.file];
      var file = {
        uri:
          Platform.OS === 'ios'
            ? res[0].uri.replace('file://', '')
            : res[0].uri,
        name: res[0].name,
        type: res[0].type,
      };
      temp.push(file);
      this.setState({fileName: res.name, file: temp});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
        // Alert.alert('Document Picker Error: ', err);
      } else {
        throw err;
      }
    }
  };
  launchImageLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      const temp = [...this.state.file];
      let data: any;
      if (res.assets !== undefined) {
        data = res.assets[0];
      }
      if (res.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (res.errorMessage) {
        Alert.alert('ImagePicker Error: ', res.errorMessage);
      } else if (res.errorCode) {
        Alert.alert('ImagePicker Error: ', res.errorCode);
      } else {
        var file = {
          uri:
            Platform.OS === 'ios' ? data.uri.replace('file://', '') : data.uri,
          name: data.fileName,
          type: data.type,
        };
        temp.push(file);
        this.setState({fileName: data.fileName, file: temp});
      }
    });
  };
  captureImage = () => {
    launchCamera({mediaType: 'photo'}, res => {
      console.log('response:', res);
      const temp = [...this.state.file];
      let data: any;
      if (res.assets !== undefined) {
        data = res.assets[0];
      }
      if (res.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (res.errorMessage) {
        Alert.alert('ImagePicker Error: ', res.errorMessage);
      } else if (res.errorCode) {
        Alert.alert('ImagePicker Error: ', res.errorCode);
      } else {
        var file = {
          uri:
            Platform.OS === 'ios' ? data.uri.replace('file://', '') : data.uri,
          name: data.fileName,
          type: data.type,
        };
        temp.push(file);
        this.setState({fileName: data.fileName, file: temp});
      }
    });
  };
  render() {
    return (
      <>
        <AppBar title="Upload" firstBtn={this.firstBtn} />
        <View style={styles.content}>
          <CustomButton onPress={this.selectFile} width="40%">
            Select 📑
          </CustomButton>
          <CustomButton onPress={this.launchImageLibrary} width="40%">
            launch Image Library
          </CustomButton>
          <CustomButton onPress={this.captureImage} width="40%">
            launch Camera
          </CustomButton>
          <FlatList
            data={this.state.file}
            renderItem={({item, index}) => (
              <View style={styles.imageViewStyle}>
                <Image
                  key={index}
                  source={{uri: item.uri}}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
              </View>
            )}
          />
          {/* <ScrollView>
            {this.state.file?.map((item: any, index: number) => (
              <View style={styles.imageViewStyle}>
                <Image
                  key={index}
                  source={{uri: item.uri}}
                  style={styles.imageStyle}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {height: '100%', width: '100%'},
  imageViewStyle: {
    width: width - 50,
    height: height,
  },
});
