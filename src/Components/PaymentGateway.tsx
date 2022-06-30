import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import React, {Component} from 'react';
import AppBar from '../Navigators/AppBar';
import Container from '../UIComponents/Container';
import Card from '../UIComponents/Card';
import ThemeContext, {Theme} from '../Context/ThemeContext';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import CustomButton from '../UIComponents/CustomButton';

const {height, width} = Dimensions.get('window');

interface State {
  product: any | null;
  paymentProcessing: boolean;
}
export class PaymentGateway extends Component<{}, State> {
  static contextType = ThemeContext;
  state: State = {
    product: null,
    paymentProcessing: false,
  };

  onComponentMount = async () => {
    const {data} = await axios.get(
      `https://fakestoreapi.com/products/${Math.floor(Math.random() * 20)}`,
    );
    data.price = Math.ceil(data.price) * 100;
    this.setState({product: data});
  };

  onClickPayment = () => {
    this.setState({paymentProcessing: true});
    var options = {
      description: this.state.product.description.slice(0, 200), // slicing description because razorpay accepts only 255 characters
      image: `${this.state.product.image}`,
      currency: 'INR',
      key: 'rzp_test_Vg2xrnRfcyUZ76', // api key
      amount: this.state.product.price,
      name: this.state.product.title,
      prefill: {
        email: 'hemal.joshi@extwebtech.in',
        contact: '7383890133',
        name: 'Hemal Virendra Joshi',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error: any) => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
        console.log(error.description);
      });
    this.setState({paymentProcessing: false});
  };

  componentDidMount() {
    this.onComponentMount();
  }

  render() {
    const {colors} = this.context as Theme;
    const styles = StyleSheet.create({
      titleStyle: {
        color: colors.themeColor.primaryText,
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 0,
      },
      loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        height: 200,
        width: 200,
        borderRadius: 10,
      },
      title: {
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center',
        color: colors.themeColor.primaryText,
      },
      description: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: colors.themeColor.primaryText,
      },
      cardStyle: {
        height: Platform.OS === 'android' ? height - 200 : height - 250,
        width: width - 40,
        alignItems: 'center',
        padding: 10,
      },
      detailsViewStyle: {
        paddingHorizontal: 10,
      },
    });
    const {product, paymentProcessing} = this.state;
    if (!product) {
      return (
        <View style={styles.loadingScreen}>
          <ActivityIndicator color="#a29bfe" size={60} />
          <CustomButton width="30%">Buy</CustomButton>
        </View>
      );
    }
    return (
      <>
        <AppBar title="Payment" />
        <Container>
          <Card style={styles.cardStyle}>
            <Text style={styles.titleStyle}>Checkout</Text>
            <Image source={{uri: product.image}} style={styles.image} />
            <ScrollView style={styles.detailsViewStyle}>
              <View>
                <Text style={styles.title}>{product.title}</Text>
              </View>
              <View>
                <Text style={styles.description}>{product.description}</Text>
              </View>
            </ScrollView>
            {paymentProcessing ? (
              <ActivityIndicator color="white" size={30} />
            ) : (
              <CustomButton onPress={this.onClickPayment}>
                Buy for ₹ {product.price / 100}
              </CustomButton>
            )}
          </Card>
        </Container>
      </>
    );
  }
}

export default PaymentGateway;
