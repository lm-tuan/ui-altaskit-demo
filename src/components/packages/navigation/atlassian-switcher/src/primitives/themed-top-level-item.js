import styled from 'styled-components';
const ThemeableItemParent = styled.div `
  ${({ isParentHovered, tokens }) => isParentHovered && `background-color: ${tokens.hover.background}`};
  border-radius: 3px;
  flex-grow: 1;
`;
const ThemeableItemWrapper = styled(ThemeableItemParent) `
  width: 100%;
  overflow: hidden;
`;
const ThemeableToggleStyle = styled(ThemeableItemParent) `
  max-height: 47px;
  cursor: pointer;
  margin-left: 2px;
`;

export const ItemWrapper = (props) => (
  <TopLevelItemWrapperTheme.Consumer>
    {tokens => <ThemeableItemWrapper {...props} tokens={tokens} />}
  </TopLevelItemWrapperTheme.Consumer>
);

export const Toggle = (props) => (
  <TopLevelItemWrapperTheme.Consumer>
    {tokens => <ThemeableToggleStyle {...props} tokens={tokens} />}
  </TopLevelItemWrapperTheme.Consumer>
);
