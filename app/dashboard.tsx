import AllOrdersScreen from '@/app/all-orders';
import { ThemedText } from '@/components/ThemedText';
import { FlatList, StyleSheet, View } from 'react-native';


export default function DashboardScreen() {
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.panelContainer}>
            <View style={styles.panel}>
              <ThemedText style={styles.panelTitle}>Total Sales</ThemedText>
              <ThemedText style={styles.panelValue}>₹ 1,00,000</ThemedText>
            </View>
            <View style={styles.panel}>
              <ThemedText style={styles.panelTitle}>Pending Collection</ThemedText>
              <ThemedText style={styles.panelValue}>₹ 50,000</ThemedText>
            </View>
          </View>

          <ThemedText style={styles.sectionTitle}>All Orders</ThemedText>
        </View>
      }
      data={[]}
      renderItem={null}
      ListFooterComponent={<AllOrdersScreen />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  panelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  panel: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  panelTitle: {
   
    fontWeight: 'bold',
    marginBottom: 8,
  },
  panelValue: {
    
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  sectionTitle: {
    
    fontWeight: 'bold',
    marginVertical: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemTitle: {
   color:'red'
  },
  listItemStatus: {
    color: '#0a7ea4',
  },
});