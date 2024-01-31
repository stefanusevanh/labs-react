import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  openModal,
} from "../../stores/deleteProduct/deleteProductSlice";
import { API_URL } from "../../config";
import { useFetch } from "../../hooks/useFetch";
import { IProductsDataResponse } from "../../types/api";
import { toast } from "sonner";
import { storeAllData } from "../../stores/addProduct/addProductSlice";

const ProductListTableItemRow = styled.tr`
  max-height: 6.4375rem;
  height: fit-content;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  color: #2d3748;
  &:hover {
    background: ${(props) => props.theme.secondary};
  }
`;
const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProductListTableItem = ({
  id,
  name,
  category,
  prices,
  discount,
}: {
  id: number;
  name: string;
  category: string;
  prices: string;
  discount: number;
}) => {
  const navigatePage = useNavigate();
  const dispatch = useDispatch();
  const {
    data: existingData,
    isLoading: getDataIsLoading,
    fetchData: getData,
  } = useFetch<IProductsDataResponse>();

  const url = `${API_URL}/products/${id}`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const handleGetData = () => {
    getData(url, options);
    toast.loading("Retrieving data...", {
      id: "loading-retrieving-data",
      duration: 10000,
    });
  };

  useEffect(() => {
    if (existingData !== null && !getDataIsLoading) {
      dispatch(storeAllData(existingData));
      toast.dismiss("loading-retrieving-data");
      navigatePage(`/product/${id}/edit`);
    }
  }, [existingData, getDataIsLoading, dispatch, id, navigatePage]);

  return (
    <ProductListTableItemRow>
      <td>{id}</td>
      <td>{name}</td>
      <td>{category}</td>
      <td className="right-align">{prices}</td>
      <td className="right-align"> {discount}%</td>
      <td className="last-col">
        <IconsContainer>
          <Icon
            src="/src/assets/img/edit.svg"
            id={id.toString()}
            onClick={() => {
              handleGetData();
            }}
          />
          <Icon
            src="/src/assets/img/delete.svg"
            onClick={() => {
              dispatch(openModal());
              dispatch(deleteProduct(id));
            }}
          />
          <Icon
            id={id.toString()}
            src="/src/assets/img/more.svg"
            onClick={(e) => {
              navigatePage(`/product/${(e.target as HTMLTextAreaElement).id}`);
            }}
          />
        </IconsContainer>
      </td>
    </ProductListTableItemRow>
  );
};

const ContainerProductListTable = styled.table`
  border-radius: 0.75rem;
  border: 1px solid ${(props) => props.theme.secondaryText};
  width: 100%;
  height: fit-content;
  border-spacing: 0;
  margin-bottom: 1.125rem;
  background: white;
  th {
    padding: 0.75rem 0.85rem;
    border: 1px solid ${(props) => props.theme.secondaryText};
    border-left: none;
    border-top: none;
    text-align: left;
    font-weight: 600;

    &.isSortable {
      &:hover {
        background: ${(props) => props.theme.secondary};
        cursor: pointer;
      }
    }
  }
  td {
    padding: 1rem 1rem;
    margin: 0 1rem;
    border: 1px solid ${(props) => props.theme.secondaryText};
    border-left: none;
    border-top: none;
  }
  tr:last-child {
    td {
      border-bottom: none;
    }
  }

  .last-col {
    border-right: none;
  }

  .right-align {
    text-align: right;
  }
`;
const ProductListTable = ({
  children,
  toggleSortDir,
}: {
  children: ReactNode;
  toggleSortDir: () => void;
}) => {
  return (
    <ContainerProductListTable>
      <thead>
        <tr
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            color: "#4A5568",
          }}
        >
          <th style={{ width: "10px" }}>ID</th>
          <th
            style={{ width: "200px" }}
            onClick={toggleSortDir}
            className={"isSortable"}
          >
            Name
          </th>
          <th style={{ width: "150px" }}>Category</th>
          <th style={{ width: "75px" }}>Prices</th>
          <th style={{ width: "25px" }}>Discount</th>
          <th style={{ width: "100px" }} className="last-col"></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </ContainerProductListTable>
  );
};

export default ProductListTable;
