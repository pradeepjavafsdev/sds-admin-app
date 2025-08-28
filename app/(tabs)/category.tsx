import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = ['Paddy', 'Vegetables', 'Fruits', 'Moong', 'Wheat', 'Corn', 'Rice', 'Barley'];
const items = [
  { id: 1, name: 'Laptop', category: 'Paddy', price: 1000 },
  { id: 5, name: 'TV', category: 'Fruits', price: 1000 },
  { id: 6, name: 'TV', category: 'Paddy', price: 1000 },
  { id: 2, name: 'T-Shirt', category: 'Clothing', price: 20 },
  { id: 3, name: 'Novel', category: 'Corn', price: 15 },
  { id: 4, name: 'Apple', category: 'Moong', price: 2 },
];

export default function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [cart, setCart] = useState<Record<number, number>>({});

  const filteredItems = items.filter(item => item.category === selectedCategory);

  const addToCart = (item: { id: any; name?: string; category?: string; price?: number; }) => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] || 0) + 1,
    }));
  };

  const incrementCart = (itemId: number) => {
    setCart(prevCart => ({
      ...prevCart,
      [itemId]: prevCart[itemId] + 1,
    }));
  };

  const decrementCart = (itemId: number) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const placeOrder = () => {
    alert(`Order placed for ${Object.values(cart).reduce((a, b) => a + b, 0)} items!`);
    setCart({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // Display 2 cards in a row
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            {cart[item.id] ? (
              <View style={styles.cartControls}>
                <Button title="-" onPress={() => decrementCart(item.id)} />
                <Text style={styles.cartCount}>{cart[item.id]}</Text>
                <Button title="+" onPress={() => incrementCart(item.id)} />
              </View>
            ) : (
              <Button title="Add to Cart" onPress={() => addToCart(item)} />
            )}
          </View>
        )}
      />

      {Object.keys(cart).length > 0 && (
        <View style={styles.cartContainer}>
          <Text style={styles.cartText}>Items in Cart: {Object.values(cart).reduce((a, b) => a + b, 0)}</Text>
          <Button title="Place Order" onPress={placeOrder} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 10,
  },
  categoryContainer: {
    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    overflow: 'hidden',
    height: 30, // Adjusted height to make it smaller
  },
  categoryButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: Colors.light.background,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.light.tint,
  
  },
  categoryText: {
    color: Colors.light.text,
    fontSize: 12,
  },
  card: {
    flex: 1,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  cartControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cartCount: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  cartContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
  cartText: {
    fontSize: 12,
    marginBottom: 10,
  },
});