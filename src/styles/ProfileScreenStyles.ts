import { Colors } from "@utils/colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  windowWidth,
} from "@utils/metrics";
import { StyleSheet } from "react-native";

export const ProfileScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  headerContainer: {
    width: "100%",
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.purpleBackground,
    paddingHorizontal: horizontalScale(20),
    paddingBottom: verticalScale(15),
  },
  logo: {
    width: windowWidth * 0.15,
    height: moderateScale(25),
    marginTop: moderateScale(10),
    resizeMode: "contain",
  },
  headerUserInfoContainer: {
    paddingHorizontal: horizontalScale(20),
    width: "100%",
    flexDirection: "row",
    paddingVertical: verticalScale(20),

    justifyContent: "flex-start",
    gap: moderateScale(30),
  },
  headerAvatar: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerTextNameText: {
    color: Colors.primaryDarkText,
    fontSize: moderateScale(20),
    fontWeight: "600",
  },
  headerTextRoleText: {
    color: Colors.lightGray,
    fontSize: moderateScale(18),
    fontWeight: "500",
  },
  divider: {
    width: "100%",
    height: moderateScale(1),
    backgroundColor: Colors.lightGray,
  },
  scrollViewContainer: {
    alignItems: "center",
    width: "100%",
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(50),
    paddingHorizontal: horizontalScale(20),
    gap: moderateScale(10),
  },
  menuItem: {
    borderRadius: moderateScale(10),
    borderColor: Colors.purple,
    borderWidth: moderateScale(1),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    width: "100%",
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
  },
  menuItemText: {
    color: Colors.purple,
    fontSize: moderateScale(18),
    padding: moderateScale(10),
    fontWeight: "500",
    flex: 1,
  },
});
