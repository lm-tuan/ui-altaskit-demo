import * as colors from '@atlaskit/theme/colors';
import { gridSize, createTheme } from '@atlaskit/theme';
import { ThemeProps, ThemeTokens, ThemingPublicApi } from './types';

export const defaultThemingColors = {
  primaryTextColor: colors.text,
  secondaryTextColor: colors.N200,
  primaryHoverBackgroundColor: colors.N30,
  secondaryHoverBackgroundColor: colors.N20,
};

const defaultTopLevelItemWrapperTheme = () => {
  return {
    hover: {
      background: defaultThemingColors.secondaryHoverBackgroundColor,
    },
  };
};

const defaultItemTheme = () => {
  const gridSizeResult = gridSize();
  return {
    display: 'block',
    padding: {
      default: {
        bottom: gridSizeResult,
        top: gridSizeResult,
        left: gridSizeResult,
        right: gridSizeResult,
      },
    },
    hover: {
      background: defaultThemingColors.primaryHoverBackgroundColor,
    },
    default: {
      background: 'transparent',
      text: defaultThemingColors.primaryTextColor,
      secondaryText: defaultThemingColors.secondaryTextColor,
    },
    active: {
      background: 'transparent',
    },
    width: {
      default: '100%',
    },
  };
};

const defaultChildItemTheme = () => {
  const defaultItemThemeResult = defaultItemTheme();
  const gridSizeResult = gridSize();
  return {
    padding: {
      default: {
        left: gridSizeResult,
        right: gridSizeResult,
        bottom: gridSizeResult / 2,
        top: gridSizeResult / 2,
      },
    },
    hover: {
      ...defaultItemThemeResult.hover,
    },
    active: {
      background: 'transparent',
    },
    default: {
      ...defaultItemThemeResult.default,
      background: defaultThemingColors.secondaryHoverBackgroundColor,
    },
  };
};

export const TopLevelItemWrapperTheme = createTheme(defaultTopLevelItemWrapperTheme);
export const ItemTheme = createTheme(
  defaultItemTheme,
);
export const ChildItemTheme = createTheme(
  defaultChildItemTheme,
);
