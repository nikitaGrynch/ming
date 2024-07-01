import { Colors } from "@utils/colors";
import {
  moderateScale,
  verticalScale,
} from "@utils/metrics";
import { StyleSheet } from "react-native";

export const SignInScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: moderateScale(30),
    gap: moderateScale(15),
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: verticalScale(24),
    color: Colors.primaryDarkText,
    fontWeight: "600",
    marginVertical: moderateScale(20),
  },
  logo: {
    marginTop: verticalScale(60),
    height: verticalScale(60),
    resizeMode: "contain",
    alignSelf: "center",
  },
  mainContainer: {
    padding: moderateScale(30),
    borderRadius: moderateScale(20),
    borderColor: Colors.purple,
    borderWidth: moderateScale(1),
    width: "100%",
  },
  mainContainerTitleText: {
    fontSize: moderateScale(22),
    color: Colors.primaryDarkText,
    fontWeight: "500",
    marginVertical: moderateScale(10),
    alignSelf: "center",
    textAlign: "center",
  },
  loginContainer: {
    width: "100%",
    gap: moderateScale(20),
  },
  resetPasswordContainer: {
    width: "100%",
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
  forgotPasswordText: {
    color: Colors.primaryDarkText,
    fontSize: moderateScale(14),
    textDecorationLine: "underline",
  },
  linkText: {
    color: Colors.purple,
    fontSize: moderateScale(14),
    textDecorationLine: "underline",
  },
  signUpText: {
    color: Colors.primaryDarkText,
    fontSize: moderateScale(14),
  },
  signUpButtonText: {
    color: Colors.purple,
    fontSize: moderateScale(14),
    textAlignVertical: "bottom",
  },
});
