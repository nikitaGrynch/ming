import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { Colors } from "@utils/colors";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import {
  moderateScale,
  verticalScale,
} from "@utils/metrics";
import ButtonComponent from "@components/ButtonComponent";
import { SignUpScreenStyles as styles } from "@styles/SignUpScreenStyles";
import { emailRegex, nameRegex, passwordRegex } from "@utils/regex";
import { useAuth } from "src/context/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Role } from "@customTypes/authTypes";

const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const auth = useAuth();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [screenState, setScreenState] =
    useState<"registration">("registration");
  const [role, setRole] = useState<Role>(Role.client);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [emailErrorText, setEmailErrorText] = useState<string | null>(null);
  const [nameErrorText, setNameErrorText] = useState<string | null>(null);
  const [passwordErrorText, setPasswordErrorText] = useState<string | null>(
    null
  );
  const [passwordConfirmationErrorText, setPasswordConfirmationErrorText] =
    useState<string | null>(null);

  const onEmailChange = (text: string) => {
    setEmail(text);
  };

  const onNameChange = (text: string) => {
    setName(text);
  };

  const onPasswordChange = (text: string) => {
    setPassword(text);
  };

  const onPasswordConfirmationChange = (text: string) => {
    setPasswordConfirmation(text);
  };

  const onFocusTextInput = () => {
    setKeyboardVisible(true);
  };

  const onSignInPress = () => {
    router.push("sign-in");
  };

  const onSignUpPress = async () => {
    if (
      email.match(emailRegex) &&
      password.match(passwordRegex) &&
      password === passwordConfirmation &&
      name.match(nameRegex)
    ) {
      const res = await auth.signUp({
        email: email.toLowerCase(),
        name,
        password,
        role,
      });
      return;
    }
    if (!email) {
      setEmailErrorText("Поле не може бути пустим");
      setTimeout(() => {
        setEmailErrorText(null);
      }, 2000);
    } else if (!email.match(emailRegex)) {
      setEmailErrorText("Невірний формат email");
      setTimeout(() => {
        setEmailErrorText(null);
      }, 2000);
    }
    if (!name) {
      setNameErrorText("Поле не може бути пустим");
      setTimeout(() => {
        setNameErrorText(null);
      }, 2000);
    } else if (!name.match(nameRegex)) {
      setNameErrorText("Ім'я повинно містити тільки букви");
      setTimeout(() => {
        setNameErrorText(null);
      }, 2000);
    }
    if (!password) {
      setPasswordErrorText("Поле не може бути пустим");
      setTimeout(() => {
        setPasswordErrorText(null);
      }, 2000);
    } else if (!password.match(passwordRegex)) {
      setPasswordErrorText("Пароль повинен бути не менше 6 символів");
      setTimeout(() => {
        setPasswordErrorText(null);
      }, 2000);
    }
    if (!passwordConfirmation) {
      setPasswordConfirmationErrorText("Поле не може бути пустим");
      setTimeout(() => {
        setPasswordConfirmationErrorText(null);
      }, 2000);
    } else if (password !== passwordConfirmation) {
      setPasswordConfirmationErrorText("Паролі не співпадають");
      setTimeout(() => {
        setPasswordConfirmationErrorText(null);
      }, 2000);
    }
  };

  useEffect(() => {
    if (auth.error) {
      alert(auth.error);
    }
  }, [auth.error]);

  return (
    <ScrollView
      style={[styles.root, { paddingTop: insets.top + verticalScale(10) }]}
      contentContainerStyle={{
        alignItems: "center",
        paddingHorizontal: moderateScale(20),
        paddingBottom: verticalScale(100),
      }}
      showsVerticalScrollIndicator={false}
      onStartShouldSetResponder={() => true}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setKeyboardVisible(false);
        }}
      >
        <View style={{ width: "100%" }}>
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
              {screenState === "registration" && (
                <Animated.View
                  style={styles.header}
                  entering={FadeIn}
                  exiting={FadeOut.duration(100)}
                >
                  <Text style={styles.titleText}>
                    Створіть резюме щоб допомогти улюбленцям{" "}
                  </Text>
                  <View style={styles.loginTypeContainer}>
                    <View style={styles.loginTypeButtonsContainer}>
                      <TouchableOpacity onPress={() => setRole(Role.customer)}>
                        <Text
                          style={[
                            styles.loginTypeText,
                            role === "customer" ? { color: Colors.purple } : {},
                          ]}
                        >
                          Доглядач
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setRole(Role.client)}>
                        <Text
                          style={[
                            styles.loginTypeText,
                            role === "client" ? { color: Colors.purple } : {},
                          ]}
                        >
                          Власник
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                  </View>
                </Animated.View>
              )}
            </Animated.View>
          )}
          <Animated.View
            style={styles.mainContainer}
            layout={LinearTransition.springify()}
          >
            <Animated.View
              style={styles.loginContainer}
              layout={LinearTransition}
            >
              <Animated.View
                style={styles.inputFieldContainer}
                layout={LinearTransition.springify()}
              >
                <Text style={styles.labelText}>Email</Text>
                <TextInput
                  keyboardType="email-address"
                  onChangeText={onEmailChange}
                  style={styles.textInput}
                  onFocus={onFocusTextInput}
                />
                {emailErrorText && (
                  <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={styles.errorText}
                  >
                    {emailErrorText}
                  </Animated.Text>
                )}
              </Animated.View>
              <Animated.View
                style={styles.inputFieldContainer}
                layout={LinearTransition.springify()}
              >
                <Text style={styles.labelText}>Ім'я</Text>
                <TextInput
                  onChangeText={onNameChange}
                  style={styles.textInput}
                  onFocus={onFocusTextInput}
                />
                {nameErrorText && (
                  <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={styles.errorText}
                  >
                    {nameErrorText}
                  </Animated.Text>
                )}
              </Animated.View>
              <Animated.View
                style={styles.inputFieldContainer}
                layout={LinearTransition.springify()}
              >
                <Text style={styles.labelText}>Пароль</Text>
                <TextInput
                  secureTextEntry
                  textContentType="oneTimeCode"
                  onChangeText={onPasswordChange}
                  style={styles.textInput}
                  onFocus={onFocusTextInput}
                />
                {passwordErrorText && (
                  <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={styles.errorText}
                  >
                    {passwordErrorText}
                  </Animated.Text>
                )}
              </Animated.View>
              <Animated.View
                style={styles.inputFieldContainer}
                layout={LinearTransition.springify()}
              >
                <Text style={styles.labelText}>Підтвердження паролю</Text>
                <TextInput
                  secureTextEntry
                  textContentType="oneTimeCode"
                  onChangeText={onPasswordConfirmationChange}
                  style={styles.textInput}
                  onFocus={onFocusTextInput}
                />
                {passwordConfirmationErrorText && (
                  <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={styles.errorText}
                  >
                    {passwordConfirmationErrorText}
                  </Animated.Text>
                )}
              </Animated.View>
              <Animated.View layout={LinearTransition.springify()}>
                <ButtonComponent
                  text="Зареєструватись"
                  onPress={onSignUpPress}
                />
              </Animated.View>
              <Animated.View
                style={{ gap: moderateScale(10) }}
                entering={FadeIn.delay(100)}
                exiting={FadeOut.duration(100)}
                layout={LinearTransition.springify()}
              >
                <Text>
                  Продовжуючи, ви приймаєте
                  <Text style={styles.linkText}> правила сайту </Text>
                  та
                  <Text style={styles.linkText}>
                    {" "}
                    політику конфіденційності{" "}
                  </Text>
                  .
                </Text>
                <Text style={styles.signUpText}>
                  Вже зареєстровані?{" "}
                  <Text style={styles.signUpButtonText} onPress={onSignInPress}>
                    Увійти
                  </Text>
                </Text>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignUpScreen;
