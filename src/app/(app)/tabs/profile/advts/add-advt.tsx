import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, verticalScale } from "@utils/metrics";
import { Colors } from "@utils/colors";
import { AddAdvtScreenStyles as styles } from "@styles/AddAdvtScreenStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonComponent from "@components/ButtonComponent";
import {
  AddAdvtType,
  AdvtCategory,
  AnimalType,
} from "@customTypes/advtTypes";
import useUserStore from "@store/userStore";
import { addAdvt } from "@services/advtApi";

const MAX_TITLE_LENGTH = 50;
const MIN_DESCRIPTION_LENGTH = 50;

const AddAdvtScreen = () => {
  const { user } = useUserStore();
  const insets = useSafeAreaInsets();

  const [addingError, setAddingError] = useState<boolean>(false);

  const categories = Object.values(AdvtCategory);
  const animalTypes = Object.values(AnimalType);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

  const categorySelectorButtonRef = useRef<TouchableOpacity>(null);

  const [categoryListTopOffset, setCategoryListTopOffset] = useState<
    number | null
  >(null);

  const onShowCategories = () => {
    categorySelectorButtonRef.current!.measure(
      (x, y, width, height, pageX, pageY) => {
        setCategoryListTopOffset(pageY + height + moderateScale(5)); // Используйте необходимые значения
      }
    );
  };

  const animalTypeSelectorButtonRef = useRef<TouchableOpacity>(null);

  const [animalTypeListTopOffset, setAnimalTypeListTopOffset] = useState<
    number | null
  >(null);

  const onShowAnimalTypes = () => {
    animalTypeSelectorButtonRef.current!.measure(
      (x, y, width, height, pageX, pageY) => {
        setAnimalTypeListTopOffset(pageY + height + moderateScale(5)); // Используйте необходимые значения
      }
    );
  };

  const onCreateAdvt = async () => {
    let isErrors = false;
    if (title.length === 0) {
      setTitleError("Поле не може бути пустим");
      setTimeout(() => {
        setTitleError(null);
      }, 3000);
      isErrors = true;
    } else if (title.length > MAX_TITLE_LENGTH) {
      setTitleError("Максимальна довжина назви 50 символів");
      setTimeout(() => {
        setTitleError(null);
      }, 3000);
      isErrors = true;
    }
    if (description.length === 0) {
      setDescriptionError("Поле не може бути пустим");
      setTimeout(() => {
        setDescriptionError(null);
      }, 3000);
      isErrors = true;
    } else if (description.length < MIN_DESCRIPTION_LENGTH) {
      setDescriptionError("Мінімальна довжина опису 50 символів");
      setTimeout(() => {
        setDescriptionError(null);
      }, 3000);
      isErrors = true;
    }
    if (Number(price) <= 0) {
      setPriceError("Ціна повинна бути більше 0");
      setTimeout(() => {
        setPriceError(null);
      }, 3000);
      isErrors = true;
    }
    if (!isErrors) {
      const advt: AddAdvtType = {
        title: title.trim(),
        category,
        animalType,
        description: description.trim(),
        price: price,
        authorId: user!.id,
        city: "Київ",
      };
      const res = await addAdvt(advt);
      if (res) {
        router.back();
      } else {
        setAddingError(true);
        setTimeout(() => {
          setAddingError(false);
        }, 3000);
      }
    }
  };

  return (
    <View style={[styles.root]}>
      <View
        style={[styles.header, { paddingTop: insets.top + verticalScale(10) }]}
      >
        <Text style={styles.headerText}>Додати пропозицію</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={router.back}>
          <Ionicons
            name="close"
            size={moderateScale(36)}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Animated.View
            layout={LinearTransition}
            style={styles.inputFieldContainer}
          >
            <Text style={styles.labelText}>Назва пропозиціЇ</Text>
            <TextInput
              value={title}
              onChangeText={(value) => setTitle(value)}
              style={styles.textInput}
            />
            {titleError && (
              <Animated.Text
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.errorText}
              >
                {titleError}
              </Animated.Text>
            )}
          </Animated.View>
          <Animated.View
            layout={LinearTransition}
            style={styles.inputFieldContainer}
          >
            <Text style={styles.labelText}>Категорія пропозиціЇ</Text>
            <TouchableOpacity
              onPress={onShowCategories}
              activeOpacity={0.6}
              style={styles.selectPlaceContainer}
              ref={categorySelectorButtonRef}
            >
              <Text
                style={[styles.labelText, { flex: 1, color: Colors.white }]}
              >
                {category ? category : "Оберіть категорію"}
              </Text>
              <Ionicons
                name="chevron-down"
                size={moderateScale(24)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            layout={LinearTransition}
            style={styles.inputFieldContainer}
          >
            <Text style={styles.labelText}>Тип тварини</Text>
            <TouchableOpacity
              onPress={onShowAnimalTypes}
              activeOpacity={0.6}
              style={styles.selectPlaceContainer}
              ref={animalTypeSelectorButtonRef}
            >
              <Text
                style={[styles.labelText, { flex: 1, color: Colors.white }]}
              >
                {animalType ? animalType : "Оберіть тип тварини"}
              </Text>
              <Ionicons
                name="chevron-down"
                size={moderateScale(24)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            layout={LinearTransition}
            style={styles.inputFieldContainer}
          >
            <Text style={styles.labelText}>Опис пропозиціЇ</Text>
            <TextInput
              multiline
              onChangeText={(value) => setDescription(value)}
              style={styles.descriptionTextInput}
            />
            {descriptionError && (
              <Animated.Text
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.errorText}
              >
                {descriptionError}
              </Animated.Text>
            )}
          </Animated.View>
          <Animated.View layout={LinearTransition}>
            <View style={styles.priceContainer}>
              <Text style={styles.labelText}>Ціна</Text>
              <View style={styles.priceValueContainer}>
                <TextInput
                  value={price}
                  keyboardType="numeric"
                  onChangeText={(value) => setPrice(value.trim())}
                  style={styles.priceTextInput}
                />
                <Text style={styles.labelText}>₴</Text>
              </View>
            </View>
            {priceError && (
              <Animated.Text
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.errorText}
              >
                {priceError}
              </Animated.Text>
            )}
          </Animated.View>
          {addingError && (
            <Animated.Text
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.errorText}
            >
              Помилка при додаванні пропозиції. Спробуйте пізніше
            </Animated.Text>
          )}
          <ButtonComponent
            animated
            disabled={
              title && category && animalType && description && price
                ? false
                : true
            }
            text="Додати пропозицію"
            onPress={onCreateAdvt}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
      {categoryListTopOffset !== null && (
        <Pressable
          style={[
            { alignItems: "center" },
            { ...StyleSheet.absoluteFillObject },
          ]}
          onPress={() => setCategoryListTopOffset(null)}
        >
          <Animated.View
            style={[styles.placesListContainer, { top: categoryListTopOffset }]}
            entering={FadeInUp}
            exiting={FadeOut.duration(100)}
          >
            <FlatList
              data={categories}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCategory(item.item);
                      setCategoryListTopOffset(null);
                    }}
                    key={item.index}
                    style={styles.placeItem}
                  >
                    <Text style={styles.placeItemText}>{item.item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </Animated.View>
        </Pressable>
      )}
      {animalTypeListTopOffset !== null && (
        <Pressable
          style={[
            { alignItems: "center" },
            { ...StyleSheet.absoluteFillObject },
          ]}
          onPress={() => setAnimalTypeListTopOffset(null)}
        >
          <Animated.View
            style={[
              styles.placesListContainer,
              { top: animalTypeListTopOffset },
            ]}
            entering={FadeInUp}
            exiting={FadeOut.duration(100)}
          >
            <FlatList
              data={animalTypes}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setAnimalType(item.item);
                      setAnimalTypeListTopOffset(null);
                    }}
                    key={item.index}
                    style={styles.placeItem}
                  >
                    <Text style={styles.placeItemText}>{item.item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

export default AddAdvtScreen;
