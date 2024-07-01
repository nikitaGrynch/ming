import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { HomeScreenStyles as styles } from "@styles/HomeScreenStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  LinearTransition,
} from "react-native-reanimated";
import { Colors } from "@utils/colors";
import { router } from "expo-router";
import { AdvtCategory } from "@customTypes/advtTypes";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <Animated.View
        style={[styles.header, { paddingTop: insets.top }]}
        layout={LinearTransition.springify()}
      >
        <Image source={require("@assets/logo_white.png")} style={styles.logo} />
        <Animated.View
          style={styles.headerTitleContainer}
          layout={LinearTransition.springify()}
        >
          <Text style={styles.headerTitleText}>
            Пропозиції по турботі за улюбленцями
          </Text>
          <Image
            source={require("@assets/header_cat.png")}
            style={styles.headerCatImage}
          />
        </Animated.View>
      </Animated.View>
      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.body}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.borderRadiusBlock,
            { backgroundColor: Colors.lightPink },
          ]}
        >
          <Text style={styles.borderRadiusBlockTitle}>Категорія тварин</Text>
          <Image
            source={require("@assets/categories_cat_dog.png")}
            style={styles.borderRadiusBlockImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.borderRadiusBlock,
            { backgroundColor: Colors.lightPurple },
          ]}
          onPress={() => {
            router.navigate({
              pathname: "tabs/home/advts",
              params: { category: AdvtCategory.living },
            });
          }}
        >
          <Text style={styles.borderRadiusBlockTitle}>Проживання</Text>
          <Image
            source={require("@assets/categories_living.png")}
            style={styles.borderRadiusBlockImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.borderRadiusBlock,
            { backgroundColor: Colors.lightBlue },
          ]}
          onPress={() => {
            router.navigate({
              pathname: "tabs/home/advts",
              params: { category: AdvtCategory.walking },
            });
          }}
        >
          <Text style={styles.borderRadiusBlockTitle}>Прогулянка</Text>
          <Image
            source={require("@assets/categories_walking.png")}
            style={styles.borderRadiusBlockImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.borderRadiusBlock,
            { backgroundColor: Colors.lightGreen },
          ]}
          onPress={() => {
            router.navigate({
              pathname: "tabs/home/advts",
              params: { category: AdvtCategory.oneTimeService },
            });
          }}
        >
          <Text style={styles.borderRadiusBlockTitle}>Одноразова послуга</Text>
          <Image
            source={require("@assets/categories_one_time_service.png")}
            style={styles.borderRadiusBlockImage}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
