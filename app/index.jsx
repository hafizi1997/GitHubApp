import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { fetchRepos } from "../api/github";
import RepoListItem from "../components/RepoListItem";
const Home = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRepos = useCallback(
    async (pageNumber, isRefreshing = false) => {
      if (loading || (!hasMore && !isRefreshing)) return;

      setLoading(true);
      try {
        const data = await fetchRepos(pageNumber);

        if (isRefreshing) {
          setRepos(data.items);
          setPage(2);
        } else {
         setRepos(prev =>
         [...prev, ...data.items].filter(
            (repo, index, self) => index === self.findIndex(r => r.id === repo.id)
         )
         );
          setPage(pageNumber + 1);
        }

        if (data.items.length < 30) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.error("Failed to load repositories:", error);
      } finally {
        setLoading(false);
        if (isRefreshing) setRefreshing(false);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    loadRepos(1);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) loadRepos(page);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setRepos([]);
    setHasMore(true);
    loadRepos(1, true);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending Repos</Text>
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RepoListItem repo={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={() =>
          !loading && (
            <Text style={styles.emptyText}>No repositories found.</Text>
          )
        }
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 15,
    textAlign: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  loadingContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
