import { Colors } from "@utils/colors";
import { moderateScale } from "@utils/metrics";
import { StyleSheet } from "react-native";

export const SavedAdvtsScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: moderateScale(40),
    alignItems: "center",
    gap: moderateScale(20),
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
  },
  headerText: {
    fontSize: moderateScale(24),
    color: Colors.primaryDarkText,
    fontWeight: "600",
    alignSelf: "flex-start",
    flex: 1,
  },
  advtsList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: moderateScale(20),
  },
  advtsListContentContainer: {
    width: "100%",
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(40),
    gap: moderateScale(40),
  },
});
