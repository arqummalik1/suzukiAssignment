import React, { useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Computation } from '../utils/computation';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../theme/theme';

// React.memo prevents re-rendering this component unless props 'item' or 'onPress' change
const PostItem = React.memo(({ item, onPress }) => {

  // useMemo caches the result of a heavy computation for this specific 'item'
  // It only recalculates when 'item' changes
  const computedDetails = useMemo(() => {
    const startTime = performance.now();
    const result = Computation(item);
    const endTime = performance.now();
    console.log(`Heavy Computation took ==>> ${endTime - startTime}ms`);
    return result;
  }, [item]);

  return (
    <TouchableOpacity onPress={() => onPress(item.id)} activeOpacity={0.8}>
      <LinearGradient
        colors={['#ffffff', Theme.background]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.id}>#{item.id}</Text>
          <View style={[styles.statusIndicator, {
            // Change status color based on whether ID is even or odd
            backgroundColor: item.id % 2 === 0 ? Theme.secondary : Theme.primary
          }]} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{computedDetails}</Text>
        <View style={styles.footer}>
          <Text style={styles.moreText}>Tap for details →</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Theme.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  id: {
    color: Theme.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    color: Theme.text,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  details: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    alignItems: 'flex-end',
  },
  moreText: {
    color: Theme.secondary,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PostItem;