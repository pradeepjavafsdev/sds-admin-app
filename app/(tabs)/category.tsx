import { Colors } from "@/constants/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type RootStackParamList = {
  "place-order": { cart: Record<number, number> };
  // Add other routes here if needed
};

const categories = [
  "Paddy",
  "Vegetables",
  "Fruits",
  "Moong",
  "Wheat",
  "Corn",
  "Rice",
  "Barley",
];
const items = [
  { id: 1, name: "Laptop", category: "Paddy", price: 1000 },
  { id: 5, name: "TV", category: "Fruits", price: 1000 },
  { id: 6, name: "TV", category: "Paddy", price: 1000 },
  { id: 2, name: "T-Shirt", category: "Clothing", price: 20 },
  { id: 3, name: "Novel", category: "Corn", price: 15 },
  { id: 4, name: "Apple", category: "Moong", price: 2 },
  { id: 7, name: "Rajani", category: "Paddy", price: 1000 },
  { id: 8, name: "1018", category: "Paddy", price: 1000 },
  { id: 9, name: "Bina", category: "Paddy", price: 1000 },
  { id: 10, name: "Chaitanya", category: "Paddy", price: 1000 },
  { id: 11, name: "TV", category: "Paddy", price: 1000 },
  { id: 12, name: "TV", category: "Paddy", price: 1000 },
  { id: 13, name: "TV", category: "Paddy", price: 1000 },
  { id: 14, name: "TV", category: "Paddy", price: 1000 },
  { id: 15, name: "TV", category: "Paddy", price: 1000 },
  { id: 16, name: "TV", category: "Paddy", price: 1000 },
  { id: 17, name: "TV", category: "Paddy", price: 1000 },
  { id: 18, name: "TV", category: "Paddy", price: 1000 },
];

export default function CategoryScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState("Paddy");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const [manualCount, setManualCount] = useState("");

  const filteredItems = items.filter(
    (item) => item.category === selectedCategory
  );

  const addToCart = (item: {
    id: any;
    name?: string;
    category?: string;
    price?: number;
  }) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] || 0) + 1,
    }));
  };

  const incrementCart = (itemId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: prevCart[itemId] + 1,
    }));
  };

  const decrementCart = (itemId: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const openManualUpdateModal = (itemId: number) => {
    setCurrentItemId(itemId);
    setManualCount(cart[itemId]?.toString() || "");
    setModalVisible(true);
  };

  const updateCartManually = () => {
    const parsedQuantity = parseInt(manualCount, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      setCart((prevCart) => ({
        ...prevCart,
        [currentItemId!]: parsedQuantity,
      }));
      setModalVisible(false);
    } else {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid number greater than 0."
      );
    }
  };

  const placeOrder = () => {
    navigation.navigate("place-order", { cart });
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Quantity:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={manualCount}
              onChangeText={setManualCount}
            />
            <Button title="OK" onPress={updateCartManually} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.divider} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display 2 cards in a row
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            {cart[item.id] ? (
              <View  style={{flexDirection: "row",}}>
                <View style={styles.addToCartButton}>
                <TouchableOpacity onPress={() => decrementCart(item.id)}>
                  <Text style={styles.addToCartText}>-</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.addToCartButton}>
                <TouchableOpacity
                  onLongPress={() => openManualUpdateModal(item.id)}
                >
                  <Text style={styles.addToCartText}>{cart[item.id]}</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.addToCartButton}>
                <TouchableOpacity onPress={() => incrementCart(item.id)}>
                  <Text style={styles.addToCartText}>+</Text>
                </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.addToCartButton}>
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />

      {Object.keys(cart).length > 0 && (
        <View style={styles.cartContainer}>
          <Text style={styles.cartText}>
            Items in Cart: {Object.values(cart).reduce((a, b) => a + b, 0)}
          </Text>
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
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    overflow: "hidden",
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
    width: "100%",
    padding: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    borderWidth: 0.2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 12,
    color: "gray",
    marginBottom: 10,
  },
  cartContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    marginBottom: 80,
  },
  cartText: {
    fontSize: 12,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  addToCartButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.light.tint,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 50,
  },
 


  addToCartText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#d3d3d3", // Changed to a lighter gray color
    marginVertical: 10,
  },
});
