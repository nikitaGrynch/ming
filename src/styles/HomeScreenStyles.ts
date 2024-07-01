import { Colors } from "@utils/colors";
import { moderateScale, windowWidth } from "@utils/metrics";
import { StyleSheet } from "react-native";

export const HomeScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.purpleBackground,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
  },
  logo: {
    width: windowWidth * 0.1,
    height: moderateScale(20),
    marginTop: moderateScale(10),
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  headerTitleContainer: {
    marginTop: moderateScale(10),
    flexDirection: "row",
    gap: moderateScale(10),
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
  },
  headerTitleText: {
    fontSize: moderateScale(24),
    color: Colors.white,
    fontWeight: "bold",
    alignSelf: "flex-start",
    flex: 1,
  },
  headerCatImage: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  body: {
    width: "100%",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(30),
    gap: moderateScale(15),
  },
  borderRadiusBlock: {
    borderRadius: moderateScale(10),
    width: "100%",
    padding: moderateScale(20),
    justifyContent: "center",
    height: moderateScale(120),
  },
  borderRadiusBlockImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    resizeMode: "contain",
    height: moderateScale(60),
    width: moderateScale(120),
  },
  borderRadiusBlockTitle: {
    fontSize: moderateScale(18),
    color: Colors.purple,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
});
