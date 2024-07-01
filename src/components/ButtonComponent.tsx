import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import React from "react";
import { moderateScale } from "@utils/metrics";
import { Colors } from "@utils/colors";
import Animated, { LinearTransition } from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type ButtonComponentProps = {
  text: string;
  onPress: () => void;
  otherTextStyle?: StyleProp<TextStyle>;
  otherButtonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  animated?: boolean;
};

const ButtonComponent = ({
  text,
  onPress,
  otherTextStyle,
  otherButtonStyle,
  disabled = false,
  animated = false,
}: ButtonComponentProps) => {
  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: disabled ? Colors.gray : Colors.purple,
      padding: moderateScale(12),
      borderRadius: moderateScale(10),
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: {
      fontSize: moderateScale(14),
      color: Colors.white,
    },
  });
  if (!animated) {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.buttonStyle, otherButtonStyle]}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text style={[styles.textStyle, otherTextStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <AnimatedTouchableOpacity
        disabled={disabled}
        style={[styles.buttonStyle, otherButtonStyle]}
        activeOpacity={0.7}
        onPress={onPress}
        layout={LinearTransition}
      >
        <Text style={[styles.textStyle, otherTextStyle]}>{text}</Text>
      </AnimatedTouchableOpacity>
    );
  }
};

export default ButtonComponent;
