import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const OrderQRCode = ({ orderCode }) => {
  // Generate the unique URL for the order
  const url = `http://176.119.254.188:8080/customer/order/complete?orderCode=${121557415}`;

  return (
    <View style={styles.container}>
      <Text>Scan this QR code to validate your order:</Text>
      <QRCode
        value={url}
        size={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default OrderQRCode;
