import { colors, spacing } from "../../theme";


const BASE = {
  color: colors.black,
  fontSize: spacing[6],
};
const BASE_BOLD = {
  color: colors.black,
  // fontSize: spacing[7],
  fontWeight: "bold",
};
export const presets = {
  default: BASE,
  bold: BASE_BOLD,
  h1: {
    ...BASE_BOLD,
    fontSize: spacing[16],
  },
  h2: {
    ...BASE_BOLD,
    fontSize: spacing[14],
  },
  h3: {
    ...BASE_BOLD,
    fontSize: spacing[13],
  },
  h4: {
    ...BASE_BOLD,
    fontSize: spacing[12],
  },
  h5: {
    ...BASE_BOLD,
    fontSize: spacing[10],
  },
  h6: {
    ...BASE_BOLD,
    fontSize: spacing[9],
  },
  uppercase: {
    textTransform: "uppercase",
  },
  textWhite: {
    color: colors.white,
  },
  btn: {
    color: colors.white,
    backgroundColor: colors.green,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  JCenter: {
    justifyContent: "center",
  },
  alCenter: {
    alignItems: "center",
  },
  asCenter: {
    alignSelf: "center",
  },
  bb: {
    borderBottomWidth: 1,
  },
  TextSuccess: {
    color: "#18B18D",
  },
  textGray: {
    color: "#BBBBBB",
  },
  textDanger: {
    color: colors.red,
  },
  ml: {
    marginLeft: spacing[6],
  },
  "ml-sm": {
    marginLeft: spacing[3],
  },
  mr: {
    marginRight: spacing[6],
  },
  mt: {
    marginTop: spacing[6],
  },
  "mt-sm": {
    marginTop: spacing[3],
  },
  mb: {
    marginBottom: spacing[6],
  },
  "text-sm": {
    fontSize: spacing[5],
  },
  "text-xs": {
    fontSize: spacing[4],
  },
};
