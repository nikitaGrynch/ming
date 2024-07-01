import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SavedAdvtsScreenStyles as styles } from "@styles/SavedAdvtsScreenStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "@utils/metrics";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@utils/colors";
import AdvtCardComponent from "@components/AdvtCardComponent";
import { AdvtType } from "@customTypes/advtTypes";
import {
  getSavedAdvtsWithDataByUserId,
} from "@services/advtApi";
import useUserStore from "@store/userStore";
import LottieView from "lottie-react-native";

const SavedAdvtsScreen = () => {
  const { user } = useUserStore();
  const insets = useSafeAreaInsets();
  const [advts, setAdvts] = useState<(AdvtType & { savedId: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSavedAdvts = async () => {
    const savedAdvts = await getSavedAdvtsWithDataByUserId(user!.id);
    setAdvts(savedAdvts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSavedAdvts();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("@assets/animations/loading_animation.json")}
          style={{ width: moderateScale(200), height: moderateScale(200) }}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    <View style={[styles.root, { paddingTop: insets.top + verticalScale(20) }]}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={router.back}>
          <Ionicons
            name="arrow-back"
            size={moderateScale(24)}
            color={Colors.primaryDarkText}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Збережені пропозиціЇ</Text>
      </View>
      <FlatList
        style={styles.advtsList}
        contentContainerStyle={[styles.advtsListContentContainer]}
        data={advts}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={({ item }) => {
          return (
            <AdvtCardComponent
              advt={item}
              savedId={item.savedId}
              onPress={() => {
                router.push(`common/advt/${item.id}`);
              }}
              onSave={fetchSavedAdvts}
            />
          );
        }}
      />
    </View>
  );
};

export default SavedAdvtsScreen;
