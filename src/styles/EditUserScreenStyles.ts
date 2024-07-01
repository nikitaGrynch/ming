import { Colors } from "@utils/colors";
import { moderateScale, windowHeight, windowWidth } from "@utils/metrics";
import { StyleSheet } from "react-native";

export const EditUserScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(30),
    alignItems: "center",
    gap: moderateScale(40),
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(20),
  },
  headerText: {
    fontSize: moderateScale(24),
    color: Colors.primaryDarkText,
    fontWeight: "600",
    flex: 1,
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: moderateScale(20),
  },
  scrollViewContent: {
    width: "100%",
    alignItems: "center",
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
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.purpleBackground,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  selectListContainer: {
    position: "absolute",
    backgroundColor: Colors.gray,
    borderRadius: moderateScale(10),
    width: windowWidth * 0.9,
    maxHeight: windowHeight * 0.5,
    padding: moderateScale(10),
    gap: moderateScale(10),
  },
  selectItem: {
    padding: moderateScale(5),
  },
  selectItemText: {
    fontSize: moderateScale(14),
    color: Colors.white,
  },
});
