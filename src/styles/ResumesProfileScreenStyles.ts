import { Colors } from "@utils/colors";
import { moderateScale } from "@utils/metrics";
import { StyleSheet } from "react-native";

export const ResumesProfileScreenStyles = StyleSheet.create({
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
  emptyListContainer: {
    borderRadius: moderateScale(10),
    backgroundColor: Colors.purpleBackground,
    padding: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontSize: moderateScale(18),
    color: Colors.white,
    fontWeight: "400",
  },
  boldText: {
    fontWeight: "700",
  },
});
