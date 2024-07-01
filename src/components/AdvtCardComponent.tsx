import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { moderateScale } from "@utils/metrics";
import { Colors } from "@utils/colors";
import { AdvtType } from "@customTypes/advtTypes";
import { formatDate } from "@utils/date";
import { Ionicons } from "@expo/vector-icons";
import WithRole from "./WithRole";
import { Role } from "@customTypes/authTypes";
import {
  deleteSavedAdvt,
  saveAdvt,
} from "@services/advtApi";
import useUserStore from "@store/userStore";

interface AdvtCardComponentProps {
  advt: AdvtType;
  onPress?: () => void;
  savedId?: string | null;
  onSave?: () => void;
}

const AdvtCardComponent = ({
  advt,
  onPress,
  savedId = null,
  onSave,
}: AdvtCardComponentProps) => {
  const dateText = formatDate(new Date(advt.date));
  const { user } = useUserStore();

  const onSaveAdvt = async () => {
    let res;
    if (savedId) {
      res = await deleteSavedAdvt(savedId);
    } else {
      res = await saveAdvt(advt.id, user!.id);
    }
    if (res) {
      onSave && onSave();
    }
  };
  return (
    <TouchableOpacity style={styles.root} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.titleContainer}>
        <View style={{ gap: moderateScale(10), flex: 1 }}>
          <Text style={styles.titleText}>{advt.title}</Text>
          <Text style={styles.priceText}>
            {advt.price}
            {Number(advt.price) ? " грн." : ""}
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require("@assets/pet_default.jpeg")}
        />
      </View>
      <Text numberOfLines={2} style={styles.descriptionText}>
        {advt.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.dateText}>{dateText}</Text>
        <WithRole role={Role.customer}>
          <TouchableOpacity onPress={onSaveAdvt} activeOpacity={0.7}>
            <Ionicons
              name={savedId ? "heart" : "heart-outline"}
              size={moderateScale(24)}
              color={savedId ? Colors.red : Colors.gray}
            />
          </TouchableOpacity>
        </WithRole>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    borderRadius: moderateScale(10),
    borderColor: Colors.purple,
    borderWidth: moderateScale(1),
    padding: moderateScale(15),
    justifyContent: "center",
    gap: moderateScale(10),
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: moderateScale(10),
  },
  image: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(10),
    resizeMode: "contain",
  },
  titleText: {
    fontSize: moderateScale(18),
    color: Colors.primaryDarkText,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  priceText: {
    fontSize: moderateScale(16),
    color: Colors.primaryDarkText,
    fontWeight: "400",
    alignSelf: "flex-start",
  },
  descriptionText: {
    fontSize: moderateScale(16),
    color: Colors.primaryDarkText,
    fontWeight: "300",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: moderateScale(14),
    color: Colors.gray,
    fontWeight: "400",
  },
});

export default AdvtCardComponent;
