import {
  MainContainer,
  PageHeader,
  PageTitle,
} from "../../pages/Products/styles";
import { Form } from "../Form";
import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import ModelCard from "../ModelCard/ModelCard";
import { addModel } from "../../stores/addProduct/addProductSlice";
import { toast } from "sonner";
import { isProductNameValid } from "../../utils/isProductNameValid";
import { isProductImagesValid } from "../../utils/isProductImagesValid";
import { isStockValid } from "../../utils/isStockValid";

const ButtonContainer = styled.div`
  display: flex;
  width: 8rem;
  align-self: flex-end;
`;

const MultiStepForm2 = ({
  formType,
  setStepForm,
}: {
  formType: "add" | "edit";
  setStepForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const totalModel = useSelector(
    (state: RootState) => state.addProduct.total_model
  );
  const modelsDataStore = useSelector(
    (state: RootState) => state.addProduct.model
  );

  const [isNavButtonClicked, setIsNavButtonClicked] = useState(false);
  const dispatch = useDispatch();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      modelsDataStore.every(
        (model) =>
          isProductNameValid(model.name) &&
          isProductImagesValid(model.photos) &&
          isStockValid(Number(model.qty))
      )
    ) {
      toast.loading("Saving progress...", {
        duration: 1000,
        onAutoClose: () => setStepForm(3),
      });
    }
  }

  return (
    <MainContainer>
      <PageHeader>
        <PageTitle>
          {formType === "add" ? "ADD NEW" : "EDIT"} PRODUCT 1/3
        </PageTitle>
      </PageHeader>
      <Form onSubmit={handleFormSubmit} formnovalidate>
        {[...Array(totalModel).keys()].map((idx) => {
          return (
            <ModelCard
              key={idx + 1}
              modelNum={idx + 1}
              isButtonClicked={isNavButtonClicked}
            />
          );
        })}
        <ButtonContainer>
          <Button
            buttonText="Add Model"
            type="button"
            onClick={() => {
              setIsNavButtonClicked(false);
              dispatch(addModel());
            }}
          />
        </ButtonContainer>

        <ButtonContainer>
          <Button
            buttonText="Prev"
            type="button"
            onClick={() => {
              setIsNavButtonClicked(true);
              toast.loading("Saving progress...", {
                duration: 1000,
                onAutoClose: () => setStepForm(1),
              });
            }}
          />
          <Button
            buttonText="Next"
            type="submit"
            onClick={() => {
              setIsNavButtonClicked(true);
            }}
          />
        </ButtonContainer>
      </Form>
    </MainContainer>
  );
};

export default MultiStepForm2;
