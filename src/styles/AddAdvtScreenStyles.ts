import { Colors } from "@utils/colors";
import { moderateScale, windowHeight, windowWidth } from "@utils/metrics";
import { StyleSheet } from "react-native";

export const AddAdvtScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.purple,
    padding: moderateScale(20),
  },
  headerText: {
    fontSize: moderateScale(24),
    color: Colors.white,
    fontWeight: "600",
    flex: 1,
  },
  body: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    width: "100%",
    padding: moderateScale(20),
    gap: moderateScale(20),
  },
  inputFieldContainer: {
    width: "100%",
    gap: moderateScale(10),
  },
  labelText: {
    fontSize: moderateScale(14),
    color: Colors.primaryDarkText,
  },
  textInput: {
    padding: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.lightGray,
    borderRadius: moderateScale(10),
    fontSize: moderateScale(14),
  },
  errorText: {
    color: Colors.red,
    fontSize: moderateScale(14),
  },
  selectPlaceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.purpleBackground,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  placesListContainer: {
    position: "absolute",
    backgroundColor: Colors.gray,
    borderRadius: moderateScale(10),
    width: windowWidth * 0.9,
    maxHeight: windowHeight * 0.5,
    padding: moderateScale(10),
    gap: moderateScale(10),
  },
  placeItem: {
    padding: moderateScale(5),
  },
  placeItemText: {
    fontSize: moderateScale(14),
    color: Colors.white,
  },
  descriptionTextInput: {
    height: windowHeight * 0.2,
    padding: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.lightGray,
    borderRadius: moderateScale(10),
    fontSize: moderateScale(14),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: moderateScale(10),
  },
  priceTextInput: {
    padding: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.lightGray,
    borderRadius: moderateScale(10),
    fontSize: moderateScale(14),
    minWidth: windowWidth * 0.2,
  },
});
