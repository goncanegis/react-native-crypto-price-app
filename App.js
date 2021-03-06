import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ListItem } from "./components/ListItem";
import { SAMPLE_DATA } from "./assets/data/SampleData";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Chart } from "./components/Chart";

import { getMarketData } from "./services/CryptoService";

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider} />
  </>
);

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();

      setData(marketData);
    };
    fetchMarketData();
  }, []);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["45%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              logoUrl={item.image}
              onPress={() => {
                openModal(item);
              }}
            />
          )}
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        {selectedCoinData ? (
          <Chart
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            currentPrice={selectedCoinData.current_price}
            priceChangePercentage7d={
              selectedCoinData.price_change_percentage_7d_in_currency
            }
            logoUrl={selectedCoinData.image}
            sparkline={selectedCoinData.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#a9abb1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.75,
  },
  shadowRadius: 4,
  elevation: 5,
});
