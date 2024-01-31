import { useEffect, useState } from "react";
import { FormInput } from "../Form";
import Icon from "../Icon";
import styled, { css } from "styled-components";
import { useFetch } from "../../hooks/useFetch";
import {
  CLOUDINARY_API_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "../../config";
import { ICloudinaryResponse } from "../../types/api";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

const UploadButtonLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  width: 3.1875rem;
  height: 2.6875rem;
  background: ${(props) => props.theme.primary};
  cursor: pointer;
`;

const DeleteButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  width: 3.1875rem;
  height: 2.6875rem;
  padding: 0.5rem;
  background: ${(props) => props.theme.primary};
  cursor: pointer;
  border: none;
`;

const DeleteButton = ({
  onClick,
  id,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
}) => {
  return (
    <DeleteButtonStyle onClick={onClick} id={id}>
      <Icon
        src="/src/assets/img/delete-white.svg"
        height="24px"
        width="20px"
        id={id}
      />
    </DeleteButtonStyle>
  );
};

const ImagesOuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  width: fit-content;
  height: 5.4375rem;
  align-items: center;
  margin: 0.5rem 0;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  max-width: 60vw;
  overflow-y: scroll;
  margin-right: 1rem;
  ${(props) =>
    !props.children &&
    css`
      margin-right: 0;
    `}
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;
  background: white;
  padding: 0.5rem;
  min-width: 12.5rem;
  margin-right: 0.5rem;
`;

type TUploadImagesSection = {
  id: number;
  setUploadedImagesURL: React.Dispatch<React.SetStateAction<string[]>>;
  minImage: number;
  maxImage: number;
  isButtonClicked: boolean;
};

const UploadImagesSection = ({
  id,
  setUploadedImagesURL,
  minImage,
  maxImage,
  isButtonClicked,
}: TUploadImagesSection) => {
  const imagesURLStore = useSelector(
    (state: RootState) => state.addProduct.model[id].photos
  );
  const [uploadedImages, setUploadedImages] = useState<FileList | null>(null);
  const [tempImagesData, setTempImagesData] = useState<ICloudinaryResponse[]>(
    imagesURLStore.map((url, idx) => {
      return {
        url: url,
        asset_id: idx.toString(),
      };
    })
  );

  const {
    data: uploadedImageData,
    isLoading: isImageUploading,
    error: IsUploadError,
    fetchData,
  } = useFetch<ICloudinaryResponse>();

  const uploadPhotosToCloudinary = (imageFile: File) => {
    const bodyData = new FormData();
    bodyData.append("file", imageFile);
    bodyData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    bodyData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    const url = `${CLOUDINARY_API_URL}/image/upload`;
    const options = {
      method: "POST",
      body: bodyData,
    };

    fetchData(url, options);
  };

  useEffect(() => {
    if (uploadedImageData !== null && !isImageUploading) {
      const newTempImagesData = [...tempImagesData, uploadedImageData];

      //slice the data in case of unexpected behaviour during uploads
      setTempImagesData(
        newTempImagesData.slice(
          0,
          newTempImagesData.length > maxImage ? maxImage : undefined
        )
      );
      setUploadedImagesURL([
        ...tempImagesData.map((data) => data.url),
        uploadedImageData.url,
      ]);
    }
  }, [uploadedImageData, isImageUploading]);

  const handleUploadPhotos = () => {
    if (
      uploadedImages !== null &&
      uploadedImages.length >= minImage &&
      uploadedImages.length <= maxImage
    ) {
      for (const imageFile of uploadedImages) {
        uploadPhotosToCloudinary(imageFile);
      }
    }
  };

  useEffect(() => {
    handleUploadPhotos();
  }, [uploadedImages]);

  return (
    <>
      <FormInput
        //this element is hidden
        type="file"
        titleText="Product Images"
        acceptedFormat="image/png, image/jpeg"
        id={`upload-img-${id}`}
        errorText={`Min ${minImage} image is required. Upload up to ${maxImage} images.`}
        isError={
          (uploadedImages === null &&
            imagesURLStore.length === 0 &&
            isButtonClicked) ||
          (uploadedImages !== null && uploadedImages.length < minImage) ||
          (uploadedImages !== null && uploadedImages.length > maxImage)
        }
        onChange={(e) => {
          if (
            (e.target as HTMLInputElement).files !== null &&
            (e.target as HTMLInputElement).files!.length +
              tempImagesData.length <=
              maxImage
          ) {
            setUploadedImages((e.target as HTMLInputElement).files);
            return;
          }
          toast.error(`Oops! Max images to be uploaded: ${maxImage} `);
        }}
        additionalStyle={{ display: "none" }}
      />
      <ImagesOuterContainer>
        <ImagesContainer>
          {tempImagesData !== null &&
            !isImageUploading &&
            tempImagesData.map((imageData, idx) => {
              return (
                <ImageContainer key={imageData.asset_id}>
                  <img src={imageData.url} style={{ height: "80px" }} />
                  <DeleteButton
                    id={idx.toString()}
                    onClick={(e) => {
                      const deletedItemID = Number(
                        (e.target as HTMLTextAreaElement).id
                      );
                      setTempImagesData([
                        ...tempImagesData.slice().slice(0, deletedItemID),
                        ...tempImagesData
                          .slice()
                          .slice(deletedItemID + 1, undefined),
                      ]);
                      setUploadedImagesURL([
                        ...tempImagesData
                          .slice()
                          .slice(0, deletedItemID)
                          .map((data) => data.url),
                        ...tempImagesData
                          .slice()
                          .slice(deletedItemID + 1, undefined)
                          .map((data) => data.url),
                      ]);
                    }}
                  />
                </ImageContainer>
              );
            })}
        </ImagesContainer>
        <UploadButtonLabel
          htmlFor={`upload-img-${id}`}
          onClick={handleUploadPhotos}
        >
          <Icon src="/src/assets/img/upload.svg" />
        </UploadButtonLabel>
      </ImagesOuterContainer>
    </>
  );
};

export default UploadImagesSection;
