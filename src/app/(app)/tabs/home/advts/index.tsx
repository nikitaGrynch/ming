import {
  View,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  moderateScale,
  verticalScale,
  windowHeight,
} from "@utils/metrics";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@utils/colors";
import { router, useLocalSearchParams } from "expo-router";
import { getAllAdvts, getSavedAdvtsByUserId } from "@services/advtApi";
import { AdvtsScreenStyles as styles } from "@styles/AdvtsScreenStyles";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { AdvtType, SavedAdvtType } from "@customTypes/advtTypes";
import AdvtCardComponent from "@components/AdvtCardComponent";
import useUserStore from "@store/userStore";
import LottieView from "lottie-react-native";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const AdvtsScreen = () => {
  const { user } = useUserStore();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [advts, setAdvts] = useState<AdvtType[]>([]);
  const [isSmallHeader, setIsSmallHeader] = useState(false);
  const [savedAdvts, setSavedAdvts] = useState<SavedAdvtType[]>([]);
  const params = useLocalSearchParams();
  const { category } = params;

  const fetchSavedAdvts = async () => {
    const savedAdvtsRes = await getSavedAdvtsByUserId(user!.id);
    setSavedAdvts(savedAdvtsRes);
  };

  useEffect(() => {
    const fetchAdvts = async () => {
      if (typeof category === "string") {
        const advtsRes = await getAllAdvts("dateAsc", category);
        setAdvts(advtsRes);
        setIsLoading(false);
        return;
      }
      const advtsRes = await getAllAdvts("dateAsc");
      setAdvts(advtsRes);
      setIsLoading(false);
    };

    fetchAdvts();
    fetchSavedAdvts();
  }, []);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 10) {
      setIsSmallHeader(true);
    } else {
      setIsSmallHeader(false);
    }
  };

  const smallHeaderPaddingTop = verticalScale(10);
  const smallHeaderPaddingBottom = verticalScale(10);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: withTiming(
        isSmallHeader ? insets.top : insets.top + smallHeaderPaddingTop
      ),
      paddingBottom: withTiming(
        isSmallHeader ? smallHeaderPaddingBottom : smallHeaderPaddingBottom * 2
      ),
    };
  });

  const backButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isSmallHeader ? 0.8 : 1, { duration: 150 }),
        },
      ],
    };
  });

  const headerTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(isSmallHeader ? 20 : 26, { duration: 400 }),
    };
  });

  const smallLogoWidth = moderateScale(40);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(isSmallHeader ? smallLogoWidth : smallLogoWidth * 1.4, {
        duration: 400,
      }),
      height: windowHeight * 0.03,
      resizeMode: "contain",
    };
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
    <View style={[styles.root]}>
      <Animated.View
        layout={LinearTransition.delay(0)}
        style={[styles.header, headerAnimatedStyle]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: moderateScale(10),
            alignItems: "center",
          }}
        >
          <AnimatedTouchableOpacity
            activeOpacity={0.7}
            onPress={router.back}
            layout={LinearTransition.delay(0).duration(150)}
            style={[backButtonAnimatedStyle]}
          >
            <AnimatedIonicons
              name="arrow-back"
              size={moderateScale(30)}
              color={Colors.white}
            />
          </AnimatedTouchableOpacity>
          <View>
            <Animated.Text style={[styles.headerText, headerTextAnimatedStyle]}>
              {category}
            </Animated.Text>
            {!isSmallHeader && (
              <Animated.Text
                style={styles.headerAdditionText}
                entering={FadeIn.duration(100)}
                exiting={FadeOut.duration(100)}
              >
                {advts.length} Пропозицій
              </Animated.Text>
            )}
          </View>
        </View>
        <Animated.Image
          source={require("@assets/logo_white.png")}
          style={logoAnimatedStyle}
        />
      </Animated.View>
      <FlatList
        style={styles.root}
        contentContainerStyle={[styles.listContentContainer]}
        data={advts}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        onScroll={onScroll}
        renderItem={({ item }) => {
          return (
            <AdvtCardComponent
              advt={item}
              savedId={
                savedAdvts.find((adv) => adv.advtId === item.id)?.id || null
              }
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

export default AdvtsScreen;
