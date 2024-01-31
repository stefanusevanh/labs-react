import styled from "styled-components";
import Icon from "../Icon";
import { FormInput } from "../Form";
import { isProductNameValid } from "../../utils/isProductNameValid";
import UploadImagesSection from "../UploadImagesSection/UploadImagesSection";
import { isStockValid, maxStock, minStock } from "../../utils/isStockValid";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { css } from "styled-components";
import Button from "../Button";
import { ButtonInverted } from "../Button/ButtonInverted";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import {
  updateModelDetails,
  deleteModel,
  setIsUpdating,
} from "../../stores/addProduct/addProductSlice";
import { toast } from "sonner";
import { toggleDeleteButton } from "../../stores/toggleModelDeleteButton/toggleModelDeleteButtonSlice";
import { IModel } from "../../types/api";

const ModelCardContainer = styled.div`
  border: 0.5px solid #000;
  height: fit-content;
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 100%;
`;

const ModelCardHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.div<{ $width?: string }>`
  width: fit-content;
  display: flex;
  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `}
`;
const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 3.6875rem;
  gap: 1rem;
  justify-content: flex-end;
`;

interface IModelCard {
  modelNum: number;
  isButtonClicked: boolean;
}

const ModelCard = ({ modelNum, isButtonClicked }: IModelCard) => {
  const modelsDataStore = useSelector(
    (state: RootState) => state.addProduct.model
  );
  const totalModel = useSelector(
    (state: RootState) => state.addProduct.total_model
  );
  const isDeleteButtonClicked = useSelector(
    (state: RootState) => state.modelDelete.isDeleteButtonClicked
  );

  const dispatch = useDispatch();
  const modelDataStore = modelsDataStore[modelNum - 1];
  const [modelName, setModelName] = useState(modelDataStore.name);
  const [productImages, setProductImages] = useState(modelDataStore.photos);
  const [productStock, setProductStock] = useState(modelDataStore.qty);
  const isUpdatingData = useSelector(
    (state: RootState) => state.addProduct.isUpdating
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModelCardDelete = () => {
    dispatch(deleteModel(modelNum - 1));
    dispatch(toggleDeleteButton(false));
    setIsModalOpen(false);
    toast.success("Model has been deleted");
    dispatch(setIsUpdating(true));
  };

  const handleDeleteButtonOnClick = () => {
    dispatch(toggleDeleteButton(true));
    if (totalModel === 1) {
      toast.error("Oops! Product must have at least 1 model");
      dispatch(toggleDeleteButton(false));
      return;
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isUpdatingData) {
      setModelName(modelsDataStore[modelNum - 1].name);
      setProductImages([]);
      setProductStock(modelsDataStore[modelNum - 1].qty);
      dispatch(setIsUpdating(false));
    }
  }, [isUpdatingData, modelsDataStore, modelNum, dispatch]);

  useEffect(() => {
    //save data
    if (!isUpdatingData) {
      const modelDetailsData: IModel = {
        name: modelName,
        photos: productImages,
        qty: productStock,
      };
      if (isDeleteButtonClicked || isButtonClicked) {
        dispatch(updateModelDetails([modelNum - 1, modelDetailsData]));
      }
    }
  }, [
    modelName,
    productImages,
    productStock,
    isUpdatingData,
    isDeleteButtonClicked,
    isButtonClicked,
    modelNum,
    dispatch,
  ]);

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(toggleDeleteButton(false));
    }
  }, [isModalOpen, dispatch]);

  return (
    <>
      <ModelCardContainer>
        <ModelCardHead>
          <h3>MODEL #{modelNum}</h3>
          <Icon
            src="/src/assets/img/close.svg"
            onClick={() => handleDeleteButtonOnClick()}
          />
        </ModelCardHead>
        <FormInput
          type="text"
          titleText="Model Name"
          errorText="Product name must have 10 or more characters"
          isError={
            (!isProductNameValid(modelName) && modelName !== "") ||
            (modelName == "" && isButtonClicked)
          }
          placeholder="Input product name.."
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
        />

        <UploadImagesSection
          id={modelNum - 1}
          setUploadedImagesURL={setProductImages}
          minImage={1}
          maxImage={5}
          isButtonClicked={isButtonClicked}
        />
        <FormInput
          type="number"
          titleText="Stock"
          errorText={`Stock must be between ${minStock} - ${maxStock}`}
          isError={
            (!isStockValid(Number(productStock)) && productStock !== 0) ||
            (productStock === 0 && isButtonClicked)
          }
          placeholder="Input stock.."
          value={productStock === 0 ? "" : productStock}
          onChange={(e) => setProductStock(Number(e.target.value))}
        />
      </ModelCardContainer>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p>Confirm Delete</p>
          <p>Are you sure want to delete Model #{modelNum}?</p>
          <ModalButtonContainer>
            <ButtonContainer $width="5.75rem">
              <Button
                buttonText="Yes"
                type="button"
                onClick={() => handleModelCardDelete()}
              />
            </ButtonContainer>
            <ButtonContainer $width="5.75rem">
              <ButtonInverted
                $borderRadius="0.5rem"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </ButtonInverted>
            </ButtonContainer>
          </ModalButtonContainer>
        </Modal>
      )}
    </>
  );
};

export default ModelCard;
