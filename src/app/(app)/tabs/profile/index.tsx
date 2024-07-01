import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ProfileScreenStyles as styles } from "@styles/ProfileScreenStyles";
import { useAuth } from "src/context/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "@utils/metrics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@utils/colors";
import useUserStore from "src/store/userStore";
import { router } from "expo-router";
import WithRole from "@components/WithRole";
import { Role } from "@customTypes/authTypes";

const ProfileScreen = () => {
  const auth = useAuth();
  const insets = useSafeAreaInsets();
  const { user } = useUserStore();
  const onSignOut = () => {
    auth.signOut();
  };
  return (
    <View style={[styles.root]}>
      <View style={styles.headerContainer}>
        <View
          style={[
            styles.header,
            { paddingTop: insets.top + verticalScale(20) },
          ]}
        >
          <Image
            source={require("@assets/logo_white.png")}
            style={styles.logo}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons
              name="notifications"
              color={Colors.white}
              size={moderateScale(26)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerUserInfoContainer}>
          <Image
            source={require("@assets/default_avatar.png")}
            style={styles.headerAvatar}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextNameText}>{user?.name}</Text>
            <Text style={styles.headerTextRoleText}>
              {user?.role === "client" ? "Власник" : "Доглядач"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
          onPress={() => {
            router.navigate("tabs/profile/user-data");
          }}
        >
          <Ionicons
            name="person"
            color={Colors.purple}
            size={moderateScale(20)}
          />
          <Text style={styles.menuItemText}>Особисті дані</Text>
        </TouchableOpacity>
        <WithRole role={Role.customer}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              router.navigate("tabs/profile/resumes");
            }}
          >
            <Ionicons
              name="documents"
              color={Colors.purple}
              size={moderateScale(20)}
            />
            <Text style={styles.menuItemText}>Мої резюме</Text>
          </TouchableOpacity>
        </WithRole>
        <WithRole role={Role.client}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.navigate("tabs/profile/advts")}
          >
            <Ionicons
              name="documents"
              color={Colors.purple}
              size={moderateScale(20)}
            />
            <Text style={styles.menuItemText}>Мої пропозиції</Text>
          </TouchableOpacity>
        </WithRole>
        <WithRole role={Role.client}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <Ionicons
              name="heart"
              color={Colors.purple}
              size={moderateScale(20)}
            />
            <Text style={styles.menuItemText}>Збережені резюме</Text>
          </TouchableOpacity>
        </WithRole>
        <WithRole role={Role.customer}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              router.navigate("tabs/profile/saved/advts");
            }}
          >
            <Ionicons
              name="heart"
              color={Colors.purple}
              size={moderateScale(20)}
            />
            <Text style={styles.menuItemText}>Збережені пропозиціЇ</Text>
          </TouchableOpacity>
        </WithRole>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons
            name="file-tray"
            color={Colors.purple}
            size={moderateScale(20)}
          />
          <Text style={styles.menuItemText}>Історія відгуків</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, { marginTop: verticalScale(25) }]}
          activeOpacity={0.7}
          onPress={onSignOut}
        >
          <Ionicons
            name="log-out"
            color={Colors.purple}
            size={moderateScale(20)}
          />
          <Text style={styles.menuItemText}>Вийти</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
