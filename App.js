import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, SafeAreaView ,Text} from 'react-native';
import Counter from './src/components/Counter';
import PostItem from './src/components/PostItem';
import PostDetails from './src/components/PostDetails';
import { setupPushNotifications, sendNotification } from './src/services/notificationService';
import { Theme } from './src/theme/theme';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Initialize push notifications
  useEffect(() => {
    setupPushNotifications();
  }, []);

  const fetchPosts = async (pageNum = 1) => {
    if (!hasMore && pageNum !== 1) return;
    
    setLoading(true);
    await sendNotification('Data Fetching', `FETCHING PAGE ${pageNum} DATA`);
    
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`
      );
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => pageNum === 1 ? data : [...prev, ...data]);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      await sendNotification('Error', 'Failed to fetch data');
    } finally {
      setLoading(false);
      await sendNotification('Data Fetching', `FETCHING PAGE ${pageNum} COMPLETE`);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPosts(page + 1);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const handlePostPress = useCallback((postId) => {
    setSelectedPostId(postId);
  }, []);

  const renderItem = useCallback(
    ({ item }) => <PostItem item={item} onPress={handlePostPress} />,
    [handlePostPress]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={Theme.primary} />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[Theme.background, '#ffffff']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Counter
          count={count}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />

        {selectedPostId ? (
          <PostDetails 
            postId={selectedPostId} 
            onGoBack={() => setSelectedPostId(null)} 
          />
        ) : (
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContent}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No posts found</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding:10
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingFooter: {
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Theme.text,
  },
});

export default App;