import { Colors } from "@utils/colors";
import { moderateScale } from "@utils/metrics";
import { StyleSheet } from "react-native";

export const AdvtScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  header: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    flexDirection: "row",
    gap: moderateScale(15),
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: moderateScale(26),
    fontWeight: "600",
    alignSelf: "flex-start",
    flex: 1,
    color: Colors.primaryDarkText,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(10),
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(200),
    resizeMode: "contain",
    borderRadius: moderateScale(10),
  },
  tagsContainer: {
    flexDirection: "row",
    gap: moderateScale(10),
    flexWrap: "wrap",
  },
  tagContainer: {
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    backgroundColor: Colors.purpleBackground,
  },
  tagText: {
    fontSize: moderateScale(14),
    color: Colors.white,
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: moderateScale(20),
  },
  scrollViewContent: {
    width: "100%",
    gap: moderateScale(20),
    paddingBottom: moderateScale(40),
  },
  descriptionContainer: {
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: Colors.purple,
    gap: moderateScale(10),
  },
  descriptionLabelText: {
    fontSize: moderateScale(24),
    color: Colors.primaryDarkText,
    fontWeight: "500",
  },
  descriptionText: {
    fontSize: moderateScale(20),
    color: Colors.primaryDarkText,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  priceText: {
    fontSize: moderateScale(20),
    color: Colors.primaryDarkText,
    fontWeight: "600",
  },
  clientInfoContainer: {
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: Colors.purple,
    gap: moderateScale(10),
  },
  clientInfoTitleText: {
    fontSize: moderateScale(22),
    color: Colors.primaryDarkText,
    fontWeight: "500",
  },
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  phoneNumberText: {
    fontSize: moderateScale(16),
    color: Colors.purple,
    fontWeight: "300",
  },
});
