import { Colors } from "@utils/colors";
import { moderateScale } from "@utils/metrics";
import { StyleSheet } from "react-native";

export const UserDataScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(40),
    alignItems: "center",
    gap: moderateScale(40),
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
  },
  headerText: {
    fontSize: moderateScale(24),
    color: Colors.primaryDarkText,
    fontWeight: "600",
    alignSelf: "flex-start",
    flex: 1,
  },
  body: {
    width: "100%",
    gap: moderateScale(60),
  },
  section: {
    width: "100%",
    gap: moderateScale(20),
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: Colors.purple,
  },
  sectionTitleText: {
    fontSize: moderateScale(18),
    color: Colors.primaryDarkText,
    fontWeight: "600",
    paddingBottom: moderateScale(20),
  },
  sectionLabelText: {
    fontSize: moderateScale(14),
    color: Colors.primaryDarkText,
  },
  sectionValueText: {
    fontSize: moderateScale(16),
    color: Colors.gray,
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
});
