import {
  MainContainer,
  PageHeader,
  PageTitle,
} from "../../pages/Products/styles";
import { Form, FormInput } from "../Form";

import styled from "styled-components";

import { Fragment, useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { toast } from "sonner";
import { IProductsDataResponse } from "../../types/api";
import {
  isProductDetailsValid,
  maxProductDetailsLength,
  minProductDetailsLength,
} from "../../utils/isProductDetailsValid";
import { camelCaseToTitle } from "../../utils/camelCaseToTitle";
import { addProductDetails } from "../../stores/addProduct/addProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../config";

const ButtonContainer = styled.div`
  display: flex;
  width: 8rem;
  align-self: flex-end;
`;

const MultiStepForm3 = ({
  formType,
  setStepForm,
}: {
  formType: "add" | "edit";
  setStepForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { id } = useParams();
  const { name } = useSelector((state: RootState) => state.addProduct);
  const previousDataStore = useSelector((state: RootState) => state.addProduct);
  const [productDetails, setProductDetails] = useState<
    Partial<IProductsDataResponse>
  >({
    material: previousDataStore.material,
    caseDetail: previousDataStore.caseDetail,
    movement: previousDataStore.movement,
    dial: previousDataStore.dial,
    hand: previousDataStore.hand,
    importantNote: previousDataStore.importantNote,
  });

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const navigatePage = useNavigate();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      Object.keys(productDetails).every((key) =>
        isProductDetailsValid(
          productDetails[key as keyof Partial<IProductsDataResponse>] as string
        )
      )
    ) {
      dispatch(addProductDetails(productDetails));
      toast.loading(`${formType === "add" ? "Adding" : "Editing"} product...`, {
        duration: 2000,
        onAutoClose: () => {
          toast.success(
            `Product: "${name}" (ID:${id}) has been ${
              formType === "add" ? "added" : "edited"
            }`
          );
          navigatePage("/product");
        },
      });
      handleFetchData();
    }
  }

  const { fetchData } = useFetch<RequestInit>();
  const handleFetchData = () => {
    //sending data from state management AND local state
    const url = `${API_URL}/products${formType === "edit" ? `/${id}` : ""}`;
    const options = {
      method: `${formType === "add" ? "POST" : "PATCH"}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: previousDataStore.name,
        price: Number(previousDataStore.price),
        weight: Number(previousDataStore.weight),
        width: Number(previousDataStore.width),
        length: Number(previousDataStore.length),
        category: previousDataStore.category,
        discount: Number(previousDataStore.discount),
        caseDetail: productDetails.caseDetail,
        dial: productDetails.dial,
        hand: productDetails.hand,
        material: productDetails.material,
        importantNote: productDetails.importantNote,
        movement: productDetails.movement,
        model: previousDataStore.model.map((model) => {
          return {
            name: model.name,
            photos: model.photos,
            qty: Number(model.qty),
          };  
        }),
      }),
    };
    fetchData(url, options);
  };

  return (
    <MainContainer>
      <PageHeader>
        <PageTitle>
          {formType === "add" ? "ADD NEW" : "EDIT"} PRODUCT 1/3
        </PageTitle>
      </PageHeader>
      <div>
        <Form onSubmit={handleFormSubmit} formnovalidate>
          <h3>DETAIL</h3>
          {Object.keys(productDetails).map((item, idx) => {
            return (
              <Fragment key={idx}>
                <h4>
                  {item === "caseDetail" ? "Case" : camelCaseToTitle(item)}
                </h4>
                <FormInput
                  type="textarea"
                  value={(() => {
                    const newProductDetails = { ...productDetails };
                    return newProductDetails[
                      item as keyof Partial<IProductsDataResponse>
                    ] as string;
                  })()}
                  minLength={minProductDetailsLength}
                  maxLength={maxProductDetailsLength}
                  placeholder="ex: kayu jati mod"
                  errorText={`This field must have ${minProductDetailsLength}-${maxProductDetailsLength} characters`}
                  isError={(() => {
                    const detail = productDetails[
                      item as keyof Partial<IProductsDataResponse>
                    ] as string;
                    return (
                      (!isProductDetailsValid(detail) && detail !== "") ||
                      (detail === "" && isButtonClicked)
                    );
                  })()}
                  onChange={(e) => {
                    const newProductDetails = { ...productDetails };
                    newProductDetails[
                      item as keyof Partial<IProductsDataResponse>
                    ] = e.target.value as unknown as undefined;
                    setProductDetails(newProductDetails);
                  }}
                />
              </Fragment>
            );
          })}
          <ButtonContainer>
            <Button
              buttonText="Prev"
              type="button"
              onClick={() => setStepForm(2)}
            />
            <Button
              buttonText="Submit"
              type="submit"
              onClick={() => {
                setIsButtonClicked(true);
              }}
            />
          </ButtonContainer>
        </Form>
      </div>
    </MainContainer>
  );
};

export default MultiStepForm3;
