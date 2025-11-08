import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';

type PlaceOrderScreenRouteProp = RouteProp<{ params: { cart: Record<string, number> } }, 'params'>;

export default function PlaceOrderScreen({ route }: { route: PlaceOrderScreenRouteProp }) {
  const navigation = useNavigation();
  

 

  
  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text style={styles.header}>Order Summary</Text>
    
      <Text style={styles.totalAmount}>Total Amount: ${}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: 'gray',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});