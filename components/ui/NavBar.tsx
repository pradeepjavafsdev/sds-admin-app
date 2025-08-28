import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function NavBar({ title }: { title: string }) {
  return (
    <View style={styles.navBar}>
      <Image
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsText}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'transparent',
    marginTop: 20, // Move the navbar details slightly down
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  settingsText: {
    fontSize: 16,
  },
});