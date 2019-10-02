import * as React from 'react';
import styled from 'styled-components';
import { colors, elevation, gridSize } from '@atlaskit/theme';


const IconBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${4 * gridSize()}px;
  height: ${4 * gridSize()}px;
  border-radius: ${gridSize()}px;
  ${({ iconElevation }) => (iconElevation ? iconElevation : '')};
  background-color: ${({ bgColor }) => bgColor}
  overflow: hidden;
`;
const ImageIconBase = styled.img`
  width: ${gridSize() * 4}px;
  height: ${gridSize() * 4}px;
`;

export const themes = {
  default: {
    backgroundColor: '#fff',
    primaryColor: '#000',
    iconElevation: elevation.e100,
  },
  product: {
    iconColor: colors.N0,
    backgroundColor: colors.B400,
    primaryColor: colors.N0,
    iconElevation: elevation.e100,
  },
  admin: {
    backgroundColor: colors.DN70,
    primaryColor: colors.N0,
    iconElevation: elevation.e100,
  },
  custom: {
    backgroundColor: colors.N0,
    primaryColor: colors.DN70,
    iconElevation: elevation.e100,
  },
  subtle: {
    backgroundColor: 'transparent',
    primaryColor: colors.text,
  },
};




export const createIcon = (
  InnerIcon,
  defaultProps,
) => props => {
  const { backgroundColor, iconElevation, ...iconProps } =
    themes[props.theme] || themes.default;

  return (
    <IconBase bgColor={backgroundColor} iconElevation={iconElevation}>
      <InnerIcon {...defaultProps} {...iconProps} />
    </IconBase>
  );
};

export const createImageIcon = (url) => props => {
  const { backgroundColor } = themes[props.theme] || themes.default;

  return (
    <IconBase bgColor={backgroundColor}>
      <ImageIconBase src={url} />
    </IconBase>
  );
};
