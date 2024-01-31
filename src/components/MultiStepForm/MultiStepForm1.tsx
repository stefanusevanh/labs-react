import {
  MainContainer,
  PageHeader,
  PageTitle,
} from "../../pages/Products/styles";
import { Form, FormInput } from "../Form";
import { isPriceValid, maxPrice, minPrice } from "../../utils/isPriceValid";
import { currencyFormat } from "../../utils/currencyFormat";
import styled from "styled-components";
import {
  isDiscountValid,
  maxDiscount,
  minDiscount,
} from "../../utils/isDiscountValid";
import {
  isDimensionValid,
  maxDimension,
  minDimension,
} from "../../utils/isDimensionValid";
import { useState } from "react";
import DropdownMenu from "../DropdownMenu";
import Button from "../Button";
import { isProductNameValid } from "../../utils/isProductNameValid";
import { isProductCategoryValid } from "../../utils/isProductCategoryValid";
import { useDispatch, useSelector } from "react-redux";
import { addProductFirst } from "../../stores/addProduct/addProductSlice";
import { RootState } from "../../stores/store";
import { toast } from "sonner";

const PricePrefix = styled.div`
  width: 3.625rem;
  height: 6.875rem;
  background-color: inherit;
  border-radius: 0.5rem 0 0 0.5rem;
  z-index: 1;
  position: absolute;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RowForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 7rem;
  align-self: flex-end;
  margin-top: 6rem;
`;

const categories = {
  "Choose Category": "0",
  "Digital Watches": "1",
  "Classic Watches": "2",
  "Smart Watches": "3",
};
const reversedCategories = {
  "0": "Choose Category",
  "1": "Digital Watches",
  "2": "Classic Watches",
  "3": "Smart Watches",
};

const MultiStepForm1 = ({
  formType,
  setStepForm,
}: {
  formType: "add" | "edit";
  setStepForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { name, price, discount, weight, length, width, category } =
    useSelector((state: RootState) => state.addProduct);

  const [productName, setProductName] = useState(name);
  const [productPrice, setProductPrice] = useState(price);
  const [productDiscount, setProductDiscount] = useState(discount);
  const [productWeight, setProductWeight] = useState(weight);
  const [productLength, setProductLength] = useState(length);
  const [productWidth, setProductWidth] = useState(width);
  const [productCategory, setProductCategory] = useState(
    reversedCategories[category as "0" | "1" | "2" | "3"]
  );
  const [isButtonClicked, setIsButtonClicked] = use State(false);

  const dispatch = useDispatch();
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      isProductNameValid(productName) &&
      isPriceValid(productPrice) &&
      isDiscountValid(productDiscount) &&
      isDimensionValid(productWeight) &&
      isDimensionValid(productLength) &&
      isDimensionValid(productWidth) &&
      productCategory !== "Choose Category"
    ) {
      dispatch(
        addProductFirst([
          productName,
          productPrice,
          productDiscount,
          productWeight,
          productLength,
          productWidth,
          categories[
            productCategory as
              | "Digital Watches"
              | "Classic Watches"
              | "Smart Watches"
          ],
        ])
      );
      toast.loading("Saving progress...", {
        duration: 1000,
        onAutoClose: () => setStepForm(2),
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
      <div>
        <Form onSubmit={handleFormSubmit} formnovalidate>
          <FormInput
            type="text"
            titleText="Product Name"
            errorText="Product name must have 10 or more characters"
            isError={
              (!isProductNameValid(productName) && productName !== "") ||
              (productName == "" && isButtonClicked)
            }
            placeholder="Input product name.."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <RowForm>
            <div>
              <PricePrefix>Rp</PricePrefix>
              <FormInput
                type="text"
                titleText="Price"
                placeholder="Input product price.."
                errorText={`Price must be between ${currencyFormat(
                  minPrice
                )} - ${currencyFormat(maxPrice)}`}
                hideErrorBlock={false}
                isError={
                  (!isPriceValid(productPrice) && productPrice !== 0) ||
                  (productPrice === 0 && isButtonClicked)
                }
                value={
                  productPrice === 0 ? "" : productPrice.toLocaleString("id-ID")
                }
                onChange={(e) => {
                  setProductPrice(Number(e.target.value.replace(/[^\d]/g, "")));
                }}
                additionalStyle={{ paddingLeft: "4.875rem" }}
              />
            </div>
            <FormInput
              type="number"
              titleText="Discount"
              errorText={`Discount must be between ${minDiscount} - ${maxDiscount}%`}
              isError={
                (!isDiscountValid(Number(productDiscount)) &&
                  productDiscount !== 0) ||
                (Number(productDiscount) === 0 && isButtonClicked)
              }
              placeholder="Input discount value.."
              value={productDiscount === 0 ? "" : productDiscount}
              onChange={(e) => setProductDiscount(Number(e.target.value))}
              unitNumber="%"
            />
          </RowForm>
          <RowForm>
            <FormInput
              type="number"
              titleText="Weight"
              errorText={`Weight must be between ${minDimension} - ${maxDimension} kg`}
              isError={
                (!isDimensionValid(Number(productWeight)) &&
                  productWeight !== 0) ||
                (productWeight === 0 && isButtonClicked)
              }
              placeholder="Input weight value.."
              value={productWeight === 0 ? "" : productWeight}
              onChange={(e) => setProductWeight(Number(e.target.value))}
              unitNumber="kg"
            />
            <FormInput
              type="number"
              titleText="Length"
              errorText={`Length must be between ${minDimension} - ${maxDimension} cm`}
              isError={
                (!isDimensionValid(Number(productLength)) &&
                  productLength !== 0) ||
                (Number(productLength) === 0 && isButtonClicked)
              }
              placeholder="Input length value.."
              value={productLength === 0 ? "" : productLength}
              onChange={(e) => setProductLength(Number(e.target.value))}
              unitNumber="cm"
            />
            <FormInput
              type="number"
              titleText="Width"
              errorText={`Width must be between ${minDimension} - ${maxDimension} cm`}
              isError={
                (!isDimensionValid(Number(productWidth)) &&
                  productWidth !== 0) ||
                (Number(productWidth) === 0 && isButtonClicked)
              }
              placeholder="Input width value.."
              value={productWidth === 0 ? "" : productWidth}
              onChange={(e) => setProductWidth(Number(e.target.value))}
              unitNumber="cm"
            />
          </RowForm>
          <div>
            <label>Category</label>
            <DropdownMenu
              currentValue={productCategory}
              items={["Digital Watches", "Classic Watches", "Smart Watches"]}
              setCurrentValue={setProductCategory}
              width="100%"
            />
          </div>
          {!isProductCategoryValid(productCategory) && isButtonClicked && (
            <p
              style={{
                color: "red",
                animation: "tilt-shaking 0.25s 2",
                width: "fit-content",
                fontSize: "0.85rem",
              }}
            >
              Please select product category
            </p>
          )}
          <ButtonContainer>
            <Button
              buttonText="Next"
              type="submit"
              onClick={() => setIsButtonClicked(true)}
            />
          </ButtonContainer>
        </Form>
      </div>
    </MainContainer>
  );
};

export default MultiStepForm1;
