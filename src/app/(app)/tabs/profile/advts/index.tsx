import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "@utils/metrics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@utils/colors";
import { AdvtsProfileScreenStyles as styles } from "@styles/AdvtsProfileScreenStyles";
import { AdvtType } from "@customTypes/advtTypes";
import { getAllAdvtsByUserId } from "@services/advtApi";
import useUserStore from "@store/userStore";
import AdvtCardComponent from "@components/AdvtCardComponent";
import LottieView from "lottie-react-native";

const AdvtsProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [advts, setAdvts] = useState<AdvtType[]>([]);
  const insets = useSafeAreaInsets();
  const { user } = useUserStore();

  const fetchAdvts = async () => {
    const advtsRes = await getAllAdvtsByUserId(user!.id, "dateAsc");
    setAdvts(advtsRes);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAdvts();
  });
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
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            gap: moderateScale(10),
            alignItems: "center",
          }}
        >
          <TouchableOpacity activeOpacity={0.7} onPress={router.back}>
            <Ionicons
              name="arrow-back"
              size={moderateScale(24)}
              color={Colors.primaryDarkText}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Мої пропозиції</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("tabs/profile/advts/add-advt")}
        >
          <Ionicons name="add" size={moderateScale(42)} color={Colors.purple} />
        </TouchableOpacity>
      </View>
      {advts.length === 0 ? (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>
            У вас немає жодної пропозиціЇ.{"\n\n"}Натисніть{" "}
            <Text style={styles.boldText}>+</Text> щоб створити першу
            пропозицію.
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.advtsList}
          contentContainerStyle={[styles.advtsListContentContainer]}
          data={advts}
          keyExtractor={(item, index) => item.id.toString() + index.toString()}
          renderItem={({ item }) => {
            return (
              <AdvtCardComponent
                advt={item}
                onPress={() => {
                  router.push(`common/advt/${item.id}`);
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default AdvtsProfileScreen;
