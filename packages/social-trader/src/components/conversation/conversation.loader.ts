import {
  ConversationMessagePersonalDetails,
  ConversationPost,
  IConversationImage,
  IConversationUser
} from "components/conversation/conversation.types";
import {
  getRandomBoolean,
  getRandomInteger,
  getRandomWord,
  getRandomWords,
  tableLoaderCreator
} from "utils/helpers";
import uuid from "uuid";

const mockImages = [
  "https://lh3.google.com/u/0/d/1Z1CtoXnDiIpxPVi-DanRaoKeRy0szwkb=w2880-h990-iv1",
  "https://lh3.google.com/u/0/d/18eDqPiguyjOHmJRNgWIwVsq351UmvhI7=w2880-h990-iv1",
  "https://lh3.google.com/u/0/d/1AFhKdEm71ybkV9RTqKLLf81JOby_L6WF=w2880-h990-iv1",
  "https://lh3.google.com/u/0/d/1jEB3mQ5NH689eOqHaAv2GwbIr2-XUfro=w2880-h990-iv1",
  "https://lh3.google.com/u/0/d/1fM4TkucwqAf1DFTI5HR6CTHryXaxzacw=w2880-h990-iv1",
  "https://lh3.google.com/u/0/d/1CU4k2_WWNtvTVKbKkETuBr2tWN8RknJP=w2880-h1596-iv1",
  "https://lh3.google.com/u/0/d/1GySQdlSH4CBgbNxu0pIyXiVPJkYfVZgy=w2880-h976-iv1",
  "https://lh3.google.com/u/0/d/119p-NEzY17aqq7XVrCQ4mRdeBU-EfCcn=w2880-h976-iv1",
  "https://lh3.google.com/u/0/d/1wrjTP-3O9ncltXfXTzbno0-p-QmlQpH7=w2880-h976-iv1",
  "https://lh3.google.com/u/0/d/1t-qZmXULRLutHrOYjSiyfF3Tu3BSteg4=w2880-h976-iv1",
  "https://lh3.google.com/u/0/d/1ZN2SszD7G4X8VFDITRmxVFk2dGgyf1OP=w2880-h976-iv1",
  "https://lh3.google.com/u/0/d/1om7Ycn-MBw5IFsGfS4F4i1EgVWw__lz-=w2880-h1498-iv1",
  "https://lh6.googleusercontent.com/gmsktW0XHtOL-Go0x5OtkhoZXuYrZMFYuh1e2nZrRmmGK836ee14z_-ESjy1_HxN0XJL-sPBvnngQQLa19lG=w2880-h1498",
  "https://sun9-32.userapi.com/c857328/v857328519/1223db/bHocmSAuc2M.jpg",
  "https://sun9-35.userapi.com/c857336/v857336259/123957/IClFjwh8YnE.jpg",
  "https://sun9-44.userapi.com/c857328/v857328519/1223e2/kkqXCLDz-ZQ.jpg"
];

export const getConversationImageLoaderData = (): IConversationImage => ({
  url: mockImages[getRandomInteger(0, mockImages.length - 1)]
});

export const getConversationPersonalDetailsLoaderData = (): ConversationMessagePersonalDetails => ({
  canClose: getRandomBoolean(),
  canComment: true,
  canLike: true,
  liked: getRandomBoolean()
});

export const getConversationUserLoaderData = (): IConversationUser => ({
  id: uuid.v4(),
  achievements: [],
  avatar: "",
  name: getRandomWord(getRandomInteger(8, 50)),
  link: ""
});

export const getConversationPostLoaderData = (
  imagesCount: number,
  commentsCount: number
): ConversationPost => {
  const images = new Array(imagesCount)
    .fill("")
    .map(getConversationImageLoaderData);

  return {
    comments: tableLoaderCreator(
      () => getConversationPostLoaderData(getRandomInteger(0, 2), 0),
      commentsCount
    ),
    id: uuid.v4(),
    images,
    author: getConversationUserLoaderData(),
    date: new Date().toLocaleString(),
    likesCount: getRandomInteger(1, 10),
    text: getRandomWords(getRandomInteger(3, 50)),
    actions: getConversationPersonalDetailsLoaderData()
  };
};

export const getConversationPostListLoaderData = (): ConversationPost[] =>
  tableLoaderCreator(
    () =>
      getConversationPostLoaderData(
        getRandomInteger(0, 10),
        getRandomInteger(0, 5)
      ),
    getRandomInteger(2, 5)
  );
