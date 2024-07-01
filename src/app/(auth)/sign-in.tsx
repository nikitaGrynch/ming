import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SignInScreenStyles as styles } from "@styles/SignInScreenStyles";
import { moderateScale, verticalScale } from "@utils/metrics";
import ButtonComponent from "@components/ButtonComponent";
import { Colors } from "@utils/colors";
import { router } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useAuth } from "src/context/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignInScreen = () => {
  const insets = useSafeAreaInsets();
  const auth = useAuth();
  const [screenState, setScreenState] = useState<"login" | "resetPassword">(
    "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = React.useRef<TextInput>(null);

  const [isEmailEmpty, setEmailEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const onEmailChange = (text: string) => {
    setEmail(text);
  };

  const onPasswordChange = (text: string) => {
    setPassword(text);
  };

  const onFocusTextInput = () => {
    setKeyboardVisible(true);
  };

  const onForgotPasswordPress = () => {
    setScreenState("resetPassword");
  };

  const onSignUpPress = () => {
    router.push("sign-up");
  };

  const onSignInPress = async () => {
    if (email && password) {
      const res = await auth.signIn(email, password);
      if (!res) {
        passwordRef.current?.clear();
        setPassword("");
      }
      return;
    }
    if (!email) {
      setEmailEmpty(true);
      setTimeout(() => {
        setEmailEmpty(false);
      }, 2000);
    }
    if (!password) {
      setPasswordEmpty(true);
      setTimeout(() => {
        setPasswordEmpty(false);
      }, 2000);
    }
  };
  return (
    <TouchableWithoutFeedback
      style={[{ flex: 1 }]}
      onPress={() => {
        Keyboard.dismiss();
        setKeyboardVisible(false);
      }}
    >
      <View
        style={[
          styles.root,
          screenState === "resetPassword" && {
            gap: moderateScale(100),
          },
          { paddingTop: insets.top + verticalScale(10) },
        ]}
      >
        {!isKeyboardVisible && (
          <Animated.View
            entering={FadeIn.delay(100)}
            exiting={FadeOut.duration(100)}
            style={[{ width: "100%" }]}
          >
            <Image
              source={require("@assets/logo_purple.png")}
              style={styles.logo}
            />
            {screenState === "login" && (
              <Animated.View
                style={styles.header}
                entering={FadeIn}
                exiting={FadeOut.duration(100)}
              >
                <Text style={styles.titleText}>Вхід</Text>
              </Animated.View>
            )}
          </Animated.View>
        )}
        <Animated.View
          style={styles.mainContainer}
          layout={LinearTransition.springify()}
        >
          {screenState === "login" ? (
            <Animated.View style={styles.loginContainer}>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.labelText}>Email</Text>
                <TextInput
                  keyboardType="email-address"
                  onChangeText={onEmailChange}
                  style={styles.textInput}
                  onFocus={onFocusTextInput}
                />
                {isEmailEmpty && (
                  <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={styles.errorText}
                  >
                    Поле не може бути пустим
                  </Animated.Text>
                )}
              </View>
              <Animated.View
                style={styles.inputFieldContainer}
                layout={LinearTransition.springify()}
              >
                <Text style={styles.labelText}>Пароль</Text>
                <TextInput
                  ref={passwordRef}
                  secureTextEntry
                  textContentType="oneTimeCode"
                  onChangeText={onPasswordChange}
                  style={styles.textInput}
                  onFocus={onFocusTextInput}
                />
                {isPasswordEmpty && (
                  <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={styles.errorText}
                  >
                    Поле не може бути пустим
                  </Animated.Text>
                )}
              </Animated.View>
              {auth.error && (
                <Animated.Text
                  entering={FadeIn}
                  exiting={FadeOut}
                  style={styles.errorText}
                >
                  Невірний email або пароль
                </Animated.Text>
              )}
              <Animated.View layout={LinearTransition.springify()}>
                <ButtonComponent text="Увійти" onPress={onSignInPress} />
              </Animated.View>
              <Animated.View
                style={{ gap: moderateScale(10) }}
                entering={FadeIn.delay(100)}
                exiting={FadeOut.duration(100)}
                layout={LinearTransition.springify()}
              >
                <TouchableOpacity onPress={onForgotPasswordPress}>
                  <Text style={styles.forgotPasswordText}>Забули пароль?</Text>
                </TouchableOpacity>
                <Text style={styles.signUpText}>
                  Ще не з нами?{" "}
                  <Text style={styles.signUpButtonText} onPress={onSignUpPress}>
                    Зареєструватись
                  </Text>
                </Text>
              </Animated.View>
            </Animated.View>
          ) : (
            <Animated.View style={styles.resetPasswordContainer}>
              <Text style={styles.mainContainerTitleText}>
                Відновлення паролю
              </Text>
              <View style={styles.inputFieldContainer}>
                <Text style={styles.labelText}>Email</Text>
                <TextInput
                  onChangeText={onEmailChange}
                  style={styles.textInput}
                  onFocus={onFocusTextInput}
                />
              </View>
              <ButtonComponent text="Продовжити" onPress={() => {}} />
              <ButtonComponent
                text="Скасувати"
                otherButtonStyle={{
                  backgroundColor: "transparent",
                  borderColor: Colors.purple,
                  borderWidth: moderateScale(1),
                }}
                otherTextStyle={{ color: Colors.purple }}
                onPress={() => {
                  setScreenState("login");
                }}
              />
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
