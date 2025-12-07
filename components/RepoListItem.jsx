import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Helper function to format large numbers (e.g., 5100 -> 5.1k)
const formatStarCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
};

const RepoListItem = ({ repo }) => {
  const {
    name,
    description,
    stargazers_count,
    owner: { login, avatar_url },
  } = repo;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: avatar_url }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.repoName}>{name}</Text>
          <Text style={styles.ownerName}>{login}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {description || "No description provided."}
      </Text>
      <View style={styles.footer}>
        <View style={styles.starContainer}>
          <FontAwesome
            name="star"
            size={16}
            color="#FFD700"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.starCount}>
            {formatStarCount(stargazers_count)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  repoName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  ownerName: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starCount: {
    fontSize: 14,
    color: "#666",
  },
});

export default RepoListItem;
