import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";
import { IProductsDataResponse } from "../types/api";
import { useFetch } from "../hooks/useFetch";
import styled, { css } from "styled-components";
import { currencyFormat } from "../utils/currencyFormat";
import { camelCaseToTitle } from "../utils/camelCaseToTitle";
import { ButtonInverted } from "../components/Button/ButtonInverted";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  /* height: 70vh; */
  margin: 5rem 0 0.7rem 0;
`;
const ProductSmallPhotosContainer = styled.div`
  height: 30rem;
  padding: 0 1rem;
  overflow-y: scroll;
`;
const ProductBigPhotoContainer = styled.div`
  /* height: ; */
`;
const ProductInfoContainer = styled.div``;

const ProductPhoto = styled.img<{ $variant: string; $isActive: boolean }>`
  ${(props) => {
    switch (props.$variant) {
      case "small":
        return css`
          width: 125px;
        `;
      case "big":
        return css`
          width: 400px;
        `;
    }
  }}

  ${(props) =>
    !props.$isActive &&
    css`
      opacity: 0.5;
    `}
`;

const DetailTextContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  width: 7rem;
  align-self: flex-end;
`;

const ProductDetail = () => {
  const navigatePage = useNavigate();

  const { id } = useParams();
  const { data: productData, fetchData } = useFetch<IProductsDataResponse>();
  const [activePhoto, setActivePhoto] = useState("");
  useEffect(() => {
    const url = `${API_URL}/products/${id}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetchData(url, options);
  }, []);

  useEffect(() => {
    if (productData !== null) {
      setActivePhoto(productData.model[0].photos[0]);
    }
  }, [productData]);
  const totalQuantity =
    productData !== null
      ? productData.model.reduce((acc, item) => acc + Number(item.qty), 0)
      : 0;

  const details: (keyof IProductsDataResponse)[] = [
    "material",
    "caseDetail",
    "movement",
    "dial",
    "hand",
    "importantNote",
  ];
  return (
    <>
      {productData !== null && (
        <MainContainer>
          <ButtonContainer>
            <ButtonInverted
              $borderRadius="0.5rem"
              onClick={() => navigatePage("/product")}
            >
              Back
            </ButtonInverted>
          </ButtonContainer>

          <HeadContainer>
            <ProductSmallPhotosContainer>
              {productData.model.map((model, idx1) => {
                return model.photos.map((photo, idx2) => {
                  return (
                    <ProductPhoto
                      key={idx1 * 10 + idx2}
                      src={photo}
                      $isActive={photo === activePhoto}
                      $variant="small"
                      onClick={(e) =>
                        setActivePhoto((e.target as HTMLImageElement).src)
                      }
                    />
                  );
                });
              })}
            </ProductSmallPhotosContainer>
            <ProductBigPhotoContainer>
              <ProductPhoto src={activePhoto} $variant="big" $isActive={true} />
            </ProductBigPhotoContainer>
            <ProductInfoContainer>
              <h1>{productData.name}</h1>
              <p>disc {productData.discount}%</p>
              <p>{currencyFormat(productData.price)}</p>
              <p>
                quantity {totalQuantity} {totalQuantity <= 1 ? "pc" : "pcs"}{" "}
              </p>
            </ProductInfoContainer>
          </HeadContainer>
          <DetailTextContainer>
            <h2>Detail</h2>
            {details.map((item) => {
              return (
                <div key={item + id}>
                  <h3>{camelCaseToTitle(item)}</h3>
                  <p>{productData[item] as string}</p>
                </div>
              );
            })}
          </DetailTextContainer>
        </MainContainer>
      )}
    </>
  );
};

export default ProductDetail;
