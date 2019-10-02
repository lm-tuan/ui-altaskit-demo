import * as React from 'react';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';


const ImageContainer = styled.img`
  height: ${gridSize() * 3}px;
  width: ${gridSize() * 3}px;
  margin: ${gridSize() / 2}px;
  border-radius: 3px;
  position: absolute;
  top: 0;
`;

const Container = styled.div`
  position: relative;
`;

export default class Avatar extends React.Component{
  state = {
    imageLoadFailed: false,
  };

  render() {
    const { avatarUrl, fallbackComponent } = this.props;
    return (
      <Container>
        {fallbackComponent}
        {avatarUrl && !this.state.imageLoadFailed && (
          <ImageContainer src={avatarUrl} onError={this.onError} />
        )}
      </Container>
    );
  }

   onError = () => {
    this.setState({ imageLoadFailed: true });
  };
}
