import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * PostDetails component displays detailed view of a single post
 * @param {Object} props - Component props
 * @param {number} props.postId - ID of the post to fetch and display
 * @param {Function} props.onGoBack - Callback function for back navigation
 */
const PostDetails = React.memo(({ postId, onGoBack }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches post details when postId changes
   * Handles loading state and errors
   */
  useEffect(() => {
    console.log('PostDetails re-rendered due to postId change');
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  // Loading state UI
  if (loading) {
    return (
      <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#6a11cb" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Post Details</Text>
            <View style={styles.headerRight} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6a11cb" />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Error state UI (when post not found)
  if (!post) {
    return (
      <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#6a11cb" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Post Details</Text>
            <View style={styles.headerRight} />
          </View>
          <View style={styles.container}>
            <Text>No post found</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Main post details view
  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#6a11cb" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post Details</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.card}>
          <Text style={styles.id}>ID: {post.id}</Text>
          <Text style={styles.titleText}>Title: {post.title}</Text>
          <Text style={styles.body}>Body: {post.body}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  headerRight: {
    width: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  id: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6a11cb',
    fontSize: 16,
  },
  titleText: {
    marginBottom: 15,
    fontSize: 18,
    color: '#333',
  },
  body: {
    color: '#666',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default PostDetails;