import { Center } from "components/center/center";
import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import {
  ConversationInputShape,
  postMessageDefaultOptions
} from "components/conversation/conversation-input/conversation-input.helpers";
import { OnMessageSendFunc } from "components/conversation/conversation.types";
import { AttachImagePostButton } from "components/conversation/post/post-input/attach-image-post-button";
import { PostInputImagePreview } from "components/conversation/post/post-input/post-input-image-preview";
import ErrorMessage from "components/error-message/error-message";
import { IImageValue } from "components/form/input-image/input-image";
import { HookFormInputImages } from "components/form/input-image/input-images";
import { RowItem } from "components/row-item/row-item";
import { SubmitButton } from "components/submit-button/submit-button";
import { NewPostTag } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm, postponeFunc } from "utils/hook-form.helpers";
import { object } from "yup";

import "./post-input.scss";

const MAX_IMAGES = 10;

enum FORM_FIELDS {
  tags = "tags",
  images = "images",
  text = "text"
}

export interface PostInputFormValues {
  [FORM_FIELDS.text]: string;
  [FORM_FIELDS.tags]: NewPostTag[];
  [FORM_FIELDS.images]: IImageValue[];
}

interface Props {
  errorMessage?: string;
  status?: API_REQUEST_STATUS;
  onSubmit: OnMessageSendFunc;
}

const _PostInput: React.FC<Props> = ({ errorMessage, onSubmit, status }) => {
  const [t] = useTranslation();
  const [isFocused, _, __, setFocused] = useIsOpen();
  const form = useForm<PostInputFormValues>({
    defaultValues: postMessageDefaultOptions,
    validationSchema: object().shape({
      [FORM_FIELDS.text]: ConversationInputShape(t)
    }),
    mode: "onChange"
  });
  const { setValue, errors, watch, reset, handleSubmit } = form;
  const { text, images } = watch();
  const isSuccessful = status === API_REQUEST_STATUS.SUCCESS;

  useEffect(() => {
    if (isSuccessful) postponeFunc(() => reset({ text: "", images: [] }));
  }, [isSuccessful]);

  const inputSubmit = useCallback(() => {
    return handleSubmit(values => {
      return onSubmit(values);
    });
  }, [onSubmit, handleSubmit]);
  const handleRemoveImage = useCallback(
    id => {
      const newImages = images.filter(image => image.id !== id);
      setValue(FORM_FIELDS.images, newImages, true);
    },
    [images, setValue]
  );
  const disabledImages = images?.length >= MAX_IMAGES;
  const disabled = !text && !images?.length;
  const isOpenPanel = isFocused || !!text || !!images?.length;
  const errorText = errorMessage || errors[FORM_FIELDS.text]?.message;
  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <HookFormInputImages
        maxImages={MAX_IMAGES}
        disabled={disabledImages}
        className="post-input__container"
        name={FORM_FIELDS.images}
        content={open => (
          <>
            <Center className="post-input__input-container">
              <ConversationInput
                setFocused={setFocused}
                submitForm={inputSubmit()}
                name={"text"}
                placeholder={"What's new?"}
              />
              {!disabledImages && <AttachImagePostButton onClick={open} />}
            </Center>
            {isOpenPanel && (
              <Center className="post-input__edit-panel-container">
                <RowItem className="post-input__add-buttons">
                  <Center wrap>
                    {images &&
                      images.map(image => (
                        <RowItem key={image.id} bottomOffset>
                          <PostInputImagePreview
                            onRemove={handleRemoveImage}
                            image={image}
                          />
                        </RowItem>
                      ))}
                  </Center>
                </RowItem>
                <RowItem className="post-input__errors">
                  {errorText && <ErrorMessage error={errorText} />}
                </RowItem>
                <RowItem className="post-input__send-buttons">
                  <SubmitButton
                    isSuccessful={isSuccessful}
                    checkDirty={false}
                    checkValid={false}
                    disabled={disabled}
                  >
                    Send
                  </SubmitButton>
                </RowItem>
              </Center>
            )}
          </>
        )}
      />
    </HookForm>
  );
};

export const PostInput = React.memo(_PostInput);
