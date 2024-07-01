import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AdvtType } from "@customTypes/advtTypes";
import { getAdvtById } from "@services/advtApi";
import { AdvtScreenStyles as styles } from "@styles/AdvtScreenStyles";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "@utils/metrics";
import { Colors } from "@utils/colors";
import { UserType } from "@customTypes/authTypes";
import { getUserById } from "@services/authApi";
import LottieView from "lottie-react-native";

const AdvtScreen = () => {
  const { id } = useLocalSearchParams();
  const [advt, setAdvt] = useState<AdvtType | null>(null);
  const [client, setClient] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchAdvt = async () => {
      if (typeof id !== "string") {
        router.back();
        return;
      }
      const res = await getAdvtById(id);
      if (res) {
        setAdvt(res);
        const client = await getUserById(res.authorId);
        if (client) {
          setClient(client);
        }
      }
    };

    fetchAdvt();
  }, []);
  if (!advt || !client) {
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
    <View style={[styles.root]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{advt.title}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={router.back}>
          <Ionicons
            name="close"
            size={moderateScale(36)}
            color={Colors.purple}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("@assets/pet_default.jpeg")}
          />
        </View>
        <View style={styles.tagsContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{advt.category}</Text>
          </View>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{advt.animalType}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.priceContainer}>
            <Ionicons
              name="wallet"
              size={moderateScale(26)}
              color={Colors.purple}
            />
            <Text style={styles.priceText}>
              {advt.price} {Number(advt.price) ? "грн." : ""}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{client.city}</Text>
            <Ionicons
              name="location"
              size={moderateScale(26)}
              color={Colors.purple}
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabelText}>Опис</Text>
          <Text style={styles.descriptionText}>{advt.description}</Text>
        </View>
        <View style={styles.clientInfoContainer}>
          <Text style={styles.clientInfoTitleText}>{client.name}</Text>
          <View style={styles.phoneNumberContainer}>
            <Ionicons
              name="call"
              size={moderateScale(22)}
              color={Colors.purple}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                Linking.openURL(`tel:${client.phone}`);
              }}
            >
              <Text style={styles.phoneNumberText}>{client.phone}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdvtScreen;
