import { moderateScale } from "@utils/metrics";
import { StyleSheet } from "react-native";
import { Colors } from "@utils/colors";

export const AdvtsScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  listContentContainer: {
    width: "100%",
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(40),
    paddingBottom: moderateScale(40),
    gap: moderateScale(40),
  },
  header: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.purpleBackground,
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  headerText: {
    fontSize: moderateScale(26),
    color: Colors.white,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  headerAdditionText: {
    fontSize: moderateScale(14),
    color: Colors.lightPurple,
    fontWeight: "400",
    alignSelf: "flex-start",
  },
});
