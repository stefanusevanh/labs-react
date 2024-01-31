import Button from "../../components/Button";
import { FormInput } from "../../components/Form";
import ProductListTable from "../../components/ProductListTable";
import { ProductListTableItem } from "../../components/ProductListTable/ProductListTable";
import Icon from "../../components/Icon";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IProductsDataResponse } from "../../types/api";
import { API_URL } from "../../config";
import { IProductCategory } from "../../types/products";
import { currencyFormat } from "../../utils/currencyFormat";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import {
  closeModal,
  removeDeletedId,
} from "../../stores/deleteProduct/deleteProductSlice";
import { ButtonInverted } from "../../components/Button/ButtonInverted";
import { useNavigate } from "react-router-dom";
import { MainContainer, PageHeader, PageTitle } from "../Products/styles";
import {
  ButtonContainer,
  ModalButtonContainer,
  PaginationButton,
  PaginationButtonContainer,
  ToolsContainer,
} from "./styles";
import { clearAllData } from "../../stores/addProduct/addProductSlice";

const ProductCategory: IProductCategory = {
  "1": "Digital Watches",
  "2": "Classic Watches",
  "3": "Smart Watches",
};
const numOfProductPerPage = 9;

const ProductList = () => {
  const navigatePage = useNavigate();
  const [pageListNum, setPageListNum] = useState(1);
  const [prevPageListNum, setPrevPageListNum] = useState(1);
  const [maxPageListNum, setMaxPageListNum] = useState(1);
  const [maxProducts, setMaxProducts] = useState(1);
  const {
    data: productsData,
    isLoading: getIsLoading,
    fetchData,
  } = useFetch<IProductsDataResponse[]>();
  const {
    fetchData: deleteData,
    isLoading: deleteIsLoading,
    error: errorDelete,
  } = useFetch();
  const sortType = "name";
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [searchName, setSearchName] = useState("");

  const deletedId = useSelector((state: RootState) => state.deleteProduct.id);
  const [deletedName, setDeletedName] = useState("");
  const isModalOpen = useSelector(
    (state: RootState) => state.deleteProduct.isModalOpen
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const url = `${API_URL}/products`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetchData(url, options);
  }, []);

  useEffect(() => {
    const url = `${API_URL}/products`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetchData(url, options);
  }, [isModalOpen, deleteIsLoading]);

  useEffect(() => {
    if (productsData !== null) {
      setMaxProducts(productsData.length);
    }
  }, [productsData, searchName]);

  useEffect(() => {
    setMaxPageListNum(Math.ceil(maxProducts / numOfProductPerPage));
  }, [maxProducts]);

  useEffect(() => {
    if (pageListNum > 1) {
      setPrevPageListNum(pageListNum - 1);
    }
  }, [pageListNum]);

  useEffect(() => {
    if (productsData !== null && searchName !== "") {
      const filteredData = productsData
        .slice() //to make a copy of productsData
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchName.toLowerCase()) ||
            searchName === ""
        );

      setMaxProducts(filteredData.length);
    }
  }, [searchName, productsData]);

  const sortProductsType = (
    a: IProductsDataResponse,
    b: IProductsDataResponse
  ) => {
    if (a[sortType].toLowerCase() < b[sortType].toLowerCase()) {
      return sortDir === "desc" ? 1 : -1;
    }
    if (a[sortType].toLowerCase() > b[sortType].toLowerCase()) {
      return sortDir === "desc" ? -1 : 1;
    }
    return 0;
  };

  const handleDeleteProduct = () => {
    const url = `${API_URL}/products/${deletedId}`;
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    deleteData(url, options);
    dispatch(removeDeletedId());
  };

  useEffect(() => {
    if (deletedId !== null) {
      setDeletedName(
        productsData?.find((product) => product.id === deletedId)
          ?.name as string
      );
    }
  }, [deletedId]);

  return (
    <>
      <MainContainer>
        <PageHeader>
          <PageTitle>PRODUCT LIST</PageTitle>
          <ToolsContainer>
            <ButtonContainer>
              <Button
                buttonText="Add Product"
                type="button"
                borderRadius="0.5rem"
                height="100%"
                onClick={() => {
                  dispatch(clearAllData());
                  navigatePage("/product/add");
                }}
              />
            </ButtonContainer>
            <FormInput
              type="text"
              placeholder="Search by name"
              iconURL="/src/assets/img/search.svg"
              iconWidth="17px"
              iconHeight="17px"
              iconStyle={{
                position: "absolute",
                right: "1rem",
                bottom: "0.6rem",
              }}
              additionalStyle={{ height: "2.25rem", paddingLeft: "1rem" }}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </ToolsContainer>
        </PageHeader>
        {getIsLoading && <p>Loading...</p>}
        {!getIsLoading && (
          <ProductListTable
            toggleSortDir={() =>
              sortDir === "asc" ? setSortDir("desc") : setSortDir("asc")
            }
          >
            {productsData !== null &&
              searchName === "" &&
              productsData
                .slice() //to make a copy of productsData
                .reverse()
                .slice(
                  (pageListNum - 1) * numOfProductPerPage,
                  pageListNum * numOfProductPerPage < maxProducts
                    ? pageListNum * numOfProductPerPage
                    : undefined
                )
                .sort(sortProductsType)
                .filter(
                  (product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) || searchName === ""
                )
                .map((product) => {
                  return (
                    <ProductListTableItem
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      category={ProductCategory[product.category]}
                      prices={currencyFormat(product.price)}
                      discount={product.discount}
                    />
                  );
                })}
            {searchName !== "" &&
              productsData !== null &&
              productsData
                .slice() //to make a copy of productsData
                .reverse()
                .filter(
                  (product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) || searchName === ""
                )
                .sort(sortProductsType)
                .slice(
                  (pageListNum - 1) * numOfProductPerPage,
                  pageListNum * numOfProductPerPage < maxProducts
                    ? pageListNum * numOfProductPerPage
                    : undefined
                )
                .map((product) => {
                  return (
                    <ProductListTableItem
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      category={ProductCategory[product.category]}
                      prices={currencyFormat(product.price)}
                      discount={product.discount}
                    />
                  );
                })}
          </ProductListTable>
        )}

        <PaginationButtonContainer>
          <PaginationButton
            onClick={() => {
              setPageListNum(1);
              setPrevPageListNum(1);
            }}
          >
            <Icon
              src="/src/assets/img/pagination-button/left-2.svg"
              width="16px"
              height="16px"
            />
          </PaginationButton>
          <PaginationButton
            onClick={() => pageListNum > 1 && setPageListNum(pageListNum - 1)}
          >
            <Icon
              src="/src/assets/img/pagination-button/left-1.svg"
              width="16px"
              height="16px"
            />
          </PaginationButton>

          {maxPageListNum !== 1 && (
            <PaginationButton
              className="first"
              $isActive={pageListNum === 1}
              onClick={() => setPageListNum(1)}
            >
              {pageListNum === maxPageListNum
                ? pageListNum - 2
                : pageListNum !== 1
                ? pageListNum - 1
                : 1}
            </PaginationButton>
          )}
          {(prevPageListNum + 1 < maxPageListNum || maxPageListNum > 1) && (
            <PaginationButton
              className="second"
              $isActive={pageListNum > 1 && pageListNum !== maxPageListNum}
            >
              {pageListNum === maxPageListNum
                ? maxPageListNum - 1
                : prevPageListNum + 1}
            </PaginationButton>
          )}

          {prevPageListNum + 2 < maxPageListNum && (
            <PaginationButton className="third">
              {prevPageListNum + 2}
            </PaginationButton>
          )}
          {prevPageListNum + 3 < maxPageListNum && (
            <PaginationButton className="fourth">...</PaginationButton>
          )}
          {maxPageListNum !== 0 && (
            <PaginationButton
              className="last"
              $isActive={pageListNum === maxPageListNum}
              onClick={() => setPageListNum(maxPageListNum)}
            >
              {maxPageListNum}
            </PaginationButton>
          )}
          <PaginationButton
            onClick={() =>
              pageListNum < maxPageListNum && setPageListNum(pageListNum + 1)
            }
          >
            <Icon
              src="/src/assets/img/pagination-button/right-1.svg"
              width="16px"
              height="16px"
            />
          </PaginationButton>
          <PaginationButton
            onClick={() => {
              setPageListNum(maxPageListNum);
              setPrevPageListNum(maxPageListNum);
            }}
          >
            <Icon
              src="/src/assets/img/pagination-button/right-2.svg"
              width="16px"
              height="16px"
            />
          </PaginationButton>
        </PaginationButtonContainer>
      </MainContainer>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => dispatch(closeModal())}>
          {errorDelete === null && !deleteIsLoading && deletedId === null && (
            <p> {deletedName} has been deleted</p>
          )}
          {deleteIsLoading && <p>Deleting data ...</p>}
          {deletedId !== null && (
            <>
              <p>Confirm Delete</p>
              <p>
                Are you sure want to delete{" "}
                <span style={{ color: "#D84727" }}>{deletedName}</span> ?
              </p>
              <ModalButtonContainer>
                <ButtonContainer $width="5.75rem">
                  <Button
                    buttonText="Yes"
                    type="button"
                    onClick={() => handleDeleteProduct()}
                  />
                </ButtonContainer>
                <ButtonContainer $width="5.75rem">
                  <ButtonInverted
                    $borderRadius="0.5rem"
                    onClick={() => dispatch(closeModal())}
                  >
                    No
                  </ButtonInverted>
                </ButtonContainer>
              </ModalButtonContainer>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default ProductList;
