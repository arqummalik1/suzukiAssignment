import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../theme/theme';

/**
 * Counter component that displays and controls a numeric value
 * @param {Object} props - Component props
 * @param {number} props.count - Current numeric value to display
 * @param {Function} props.onDecrement - Callback when decrement button is pressed
 * @param {Function} props.onIncrement - Callback when increment button is pressed
 * @returns {JSX.Element} A rendered counter component with gradient background
 */
const Counter = (props) => {
  return (
    <LinearGradient
      colors={[Theme.primary, Theme.secondary]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity 
        style={styles.button} 
        onPress={props.onDecrement}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{props.count}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={props.onIncrement}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 24,
    includeFontPadding: false,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    minWidth: 50,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

// Memoize the component to prevent unnecessary re-renders
export default React.memo(Counter);