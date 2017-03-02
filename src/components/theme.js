import {
  red400,
  cyan700,
  grey50,
  grey100,
  grey300,
  grey500,
  white,
  lightBlack,
  darkBlack,
  grey800
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#e72c4b',
    primary2Color: cyan700,
    primary3Color: lightBlack,
    accent1Color: red400,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: white,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: red400,
  }
};
