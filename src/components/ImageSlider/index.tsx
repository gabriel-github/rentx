import React from "react";

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CardImageWrapper,
  CardImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CardImageWrapper>
        <CardImage
          source={{
            uri: imagesUrl[0],
          }}
          resizeMode="contain"
        />
      </CardImageWrapper>
    </Container>
  );
}
