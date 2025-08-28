import { ThemedText } from '@/components/ThemedText';
import { FlatList, StyleSheet, View } from 'react-native';

const data = [
  { id: '1', title: 'Order 1', status: 'Pending' },
  { id: '2', title: 'Order 2', status: 'Completed' },
  { id: '3', title: 'Order 3', status: 'Pending' },
  { id: '1', title: 'Order 1', status: 'Pending' },
  { id: '2', title: 'Order 2', status: 'Completed' },
  { id: '3', title: 'Order 3', status: 'Pending' },
  { id: '1', title: 'Order 1', status: 'Pending' },
  { id: '2', title: 'Order 2', status: 'Completed' },
  { id: '3', title: 'Order 3', status: 'Pending' },
  { id: '1', title: 'Order 1', status: 'Pending' },
  { id: '2', title: 'Order 2', status: 'Completed' },
  { id: '3', title: 'Order 3', status: 'Pending' },
  { id: '1', title: 'Order 1', status: 'Pending' },
  { id: '2', title: 'Order 2', status: 'Completed' },
  { id: '3', title: 'Order 3', status: 'Pending' },
  { id: '1', title: 'Order 1', status: 'Pending' },
  { id: '2', title: 'Order 2', status: 'Completed' },
  { id: '3', title: 'Order 3', status: 'Pending' },
];

export default function AllOrdersScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.listItem} >
          <ThemedText style={styles.listItemTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.listItemStatus}>{item.status}</ThemedText>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 10,
    backgroundColor: '#f5f5f5',
  },
  listItem: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  listItemTitle: {
    fontSize: 14,
  },
  listItemStatus: {
    fontSize: 14,
    color: '#0a7ea4',
  },
});