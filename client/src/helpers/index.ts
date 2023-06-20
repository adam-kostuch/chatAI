import { mappedAvatarImages } from 'src/utils';

export const assertUnreachable = (_: never): never => {
  throw new Error(`Unexpected value: ${_}`);
};

export const getUserImage = (image: string) => {
  return mappedAvatarImages[parseInt(image)];
};
