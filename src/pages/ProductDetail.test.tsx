import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ProductDetail from "./ProductDetail";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
import "vitest-fetch-mock";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

vi.mock("react-router-dom", async () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
  useParams: () => ({ id: "1" }),
}));

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("API testing", () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  test("it should call the API to fetch product details", async () => {
    fetchMocker.mockResponseOnce(
      JSON.stringify({
        product: {
          name: "Sample Product",
          discount: 10,
          price: 100,
          model: [
            {
              photos: ["photo1.jpg", "photo2.jpg"],
              qty: 5,
            },
          ],
          material: "Sample Material",
          caseDetail: "Sample Case Detail",
          movement: "Sample Movement",
          dial: "Sample Dial",
          hand: "Sample Hand",
          importantNote: "Sample Important Note",
        },
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <ProductDetail />
        </MemoryRouter>
      );

      // Wait for any asynchronous operations to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Assert that fetch was called with the correct URL
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/product/")
    );
  });
});

describe("Product Detail page", () => {
  test("should work as expected", async () => {
    render(<ProductDetail />);

    const pageHeading = screen.getByRole("heading", {
      level: 1,
    });

    expect(pageHeading).toBeInTheDocument();
  });
});
