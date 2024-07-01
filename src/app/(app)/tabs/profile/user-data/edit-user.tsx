import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "@utils/metrics";
import { Colors } from "@utils/colors";
import { router } from "expo-router";
import { EditUserScreenStyles as styles } from "@styles/EditUserScreenStyles";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import useUserStore from "@store/userStore";
import ButtonComponent from "@components/ButtonComponent";
import { nameRegex } from "@utils/regex";
import { editUser } from "@services/authApi";

const cities = ["Київ", "Харків", "Львів", "Одеса", "Дніпро"];

const EditUserScreen = () => {
  const insets = useSafeAreaInsets();
  const { user, setUser } = useUserStore();

  const currentUserPhone = user!.phone?.slice(4);

  const [name, setName] = useState(user!.name);
  const [city, setCity] = useState(user!.city);
  const [phone, setPhone] = useState(currentUserPhone);
  const [nameErrorText, setNameErrorText] = useState<string | null>(null);

  const [saveError, setSaveError] = useState(false);

  const citiesSelectorButtonRef = useRef<TouchableOpacity>(null);

  const [citiesListTopOffset, setCitiesListTopOffset] = useState<number | null>(
    null
  );

  const onShowCities = () => {
    citiesSelectorButtonRef.current!.measure(
      (x, y, width, height, pageX, pageY) => {
        setCitiesListTopOffset(pageY + height + moderateScale(5)); // Используйте необходимые значения
      }
    );
  };

  const onNameChange = (text: string) => {
    setName(text);
  };

  const onPhoneChange = (text: string) => {
    if (text.length > 9) return;
    setPhone(text);
  };

  const onSave = async () => {
    if (
      name.match(nameRegex) &&
      city &&
      phone &&
      (name !== user?.name || city !== user?.city || phone !== currentUserPhone)
    ) {
      const res = await editUser(user!.id, {
        id: user!.id,
        email: user!.email,
        role: user!.role,
        name,
        city,
        phone: "+380" + phone,
      });
      console.log(phone);
      if (res) {
        setUser({
          ...user!,
          name,
          city,
          phone: "+380" + phone,
        });
        router.back();
      } else {
        setSaveError(true);
        setTimeout(() => {
          setSaveError(false);
        }, 3000);
      }
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
  };
  return (
    <TouchableWithoutFeedback
      style={styles.root}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          gap: moderateScale(40),
          paddingTop: insets.top + verticalScale(10),
        }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Редагування профілю</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={router.back}>
            <Ionicons
              name="close"
              size={moderateScale(36)}
              color={Colors.primaryDarkText}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Animated.View
            style={styles.inputFieldContainer}
            layout={LinearTransition.springify()}
          >
            <Text style={styles.labelText}>Ім'я</Text>
            <TextInput
              onChangeText={onNameChange}
              value={name}
              style={styles.textInput}
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
            layout={LinearTransition}
            style={styles.inputFieldContainer}
          >
            <Text style={styles.labelText}>Місце проживання</Text>
            <TouchableOpacity
              onPress={onShowCities}
              activeOpacity={0.6}
              style={styles.selectContainer}
              ref={citiesSelectorButtonRef}
            >
              <Text
                style={[styles.labelText, { flex: 1, color: Colors.white }]}
              >
                {city ? city : "Оберіть місце проживання"}
              </Text>
              <Ionicons
                name="chevron-down"
                size={moderateScale(24)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={styles.inputFieldContainer}
            layout={LinearTransition.springify()}
          >
            <Text style={styles.labelText}>Номер телефону</Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                gap: moderateScale(10),
                alignItems: "center",
              }}
            >
              <Text style={styles.labelText}>+380</Text>
              <TextInput
                onChangeText={onPhoneChange}
                value={phone ?? ""}
                style={[styles.textInput, { flex: 1 }]}
              />
            </View>
          </Animated.View>
          {saveError && (
            <Animated.Text
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.errorText}
            >
              Помилка при збереженні даних. Спробуйте ще раз пізніше
            </Animated.Text>
          )}
          <ButtonComponent
            animated
            disabled={
              name !== user?.name ||
              city !== user?.city ||
              phone !== currentUserPhone
                ? false
                : true
            }
            text="Зберегти"
            onPress={onSave}
            otherButtonStyle={{ width: "100%" }}
          />
        </ScrollView>
        {citiesListTopOffset !== null && (
          <Pressable
            style={[
              { alignItems: "center" },
              { ...StyleSheet.absoluteFillObject },
            ]}
            onPress={() => setCitiesListTopOffset(null)}
          >
            <Animated.View
              style={[styles.selectListContainer, { top: citiesListTopOffset }]}
              entering={FadeInUp}
              exiting={FadeOut.duration(100)}
            >
              <FlatList
                data={cities}
                renderItem={(item) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCity(item.item);
                        setCitiesListTopOffset(null);
                      }}
                      key={item.index}
                      style={styles.selectItem}
                    >
                      <Text style={styles.selectItemText}>{item.item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </Animated.View>
          </Pressable>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditUserScreen;
