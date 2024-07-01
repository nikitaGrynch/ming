import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { UserDataScreenStyles as styles } from "@styles/UserDataScreenStyles";
import useUserStore from "src/store/userStore";
import { moderateScale, verticalScale } from "@utils/metrics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@utils/colors";
import ButtonComponent from "@components/ButtonComponent";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UserDataScreen = () => {
  const userStore = useUserStore();
  const insets = useSafeAreaInsets();
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
        <Text style={styles.headerText}>Особисті дані</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitleText}>
                {userStore.user?.name}
              </Text>

              <View style={{ gap: moderateScale(5) }}>
                <View style={{ gap: moderateScale(5) }}>
                  <Text style={styles.labelText}>Номер телефона</Text>
                  <Text style={styles.sectionValueText}>
                    {userStore.user?.phone ?? "-"}
                  </Text>
                </View>
                <View style={{ gap: moderateScale(5) }}>
                  <Text style={styles.labelText}>Місце проживання</Text>
                  <Text style={styles.sectionValueText}>{userStore.user?.city ?? "-"}</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    flexDirection: "row",
                    gap: moderateScale(5),
                    alignSelf: "flex-start",
                    marginVertical: moderateScale(10),
                  }}
                  onPress={() => {
                    router.navigate("tabs/profile/user-data/edit-user");
                  }}
                >
                  <Ionicons
                    name="pencil-outline"
                    size={moderateScale(14)}
                    color={Colors.purple}
                  />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      color: Colors.purple,
                    }}
                  >
                    Редагувати
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Image
              source={require("@assets/default_avatar.png")}
              style={{
                width: moderateScale(70),
                height: moderateScale(70),
                borderRadius: moderateScale(70) / 2,
              }}
            />
          </View>
        </View>
        <View style={{ gap: moderateScale(20) }}>
          <ButtonComponent text="Змінити пошту" onPress={() => {}} />
          <ButtonComponent text="Змінити пароль" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default UserDataScreen;
