import "styled-components/native";
import { echoselfTheme } from "./echoself-theme";

type ThemeType = typeof echoselfTheme;

declare module "styled-components/native" {
  export interface DefaultTheme extends ThemeType {}
}
