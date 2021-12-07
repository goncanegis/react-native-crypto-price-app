import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const ListItem = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  onPress,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34c759" : "#ff3b30";

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        {/* Left side */}
        <View style={styles.leftWrapper}>
          <Image
            source={{
              uri: logoUrl,
            }}
            style={styles.image}
          />
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        {/* Right side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.title}>
            ${currentPrice.toLocaleString("en-US", { currency: "USD" })}
          </Text>
          <Text style={[styles.subtitle, { color: priceChangeColor }]}>
            {priceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 48,
    width: 48,
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  titlesWrapper: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#a9abb1",
  },
  rightWrapper: {
    alignItems: "flex-end",
  },
});
