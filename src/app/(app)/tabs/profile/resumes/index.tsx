import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale, verticalScale } from "@utils/metrics";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@utils/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ResumesProfileScreenStyles as styles } from "@styles/ResumesProfileScreenStyles";

const ResumesProfileScreen = () => {
  const insets = useSafeAreaInsets();
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
          <Text style={styles.headerText}>Мої резюме</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("tabs/profile/resumes/add-resume")}
        >
          <Ionicons name="add" size={moderateScale(42)} color={Colors.purple} />
        </TouchableOpacity>
      </View>
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          У вас немає жодного резюме.{"\n\n"}Натисніть{" "}
          <Text style={styles.boldText}>+</Text> щоб створити резюме та знайти
          роботу. пропозицію.
        </Text>
      </View>
    </View>
  );
};

export default ResumesProfileScreen;
