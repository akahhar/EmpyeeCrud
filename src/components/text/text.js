import React from "react";
import { Text as MYText } from "react-native";
import { presets } from "./text.preset";

const Text = ({ children, preset = "default", style = {} }) => {
  let textStyle = new Array(style);
  const myStyle = preset.split(" ");
  myStyle.map((item) => textStyle.push(presets[item] ? presets[item] : {}));
  return <MYText style={textStyle}>{children}</MYText>;
};
export default Text;
