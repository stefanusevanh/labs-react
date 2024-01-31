import { useState } from "react";
import MultiStepForm1 from "../components/MultiStepForm/MultiStepForm1";
import MultiStepForm2 from "../components/MultiStepForm/MultiStepForm2";
import MultiStepForm3 from "../components/MultiStepForm/MultiStepForm3";

const AddNewProduct = () => {
  const [stepForm, setStepForm] = useState(1);

  return (
    <>
      {stepForm === 1 && (
        <MultiStepForm1 formType="add" setStepForm={setStepForm} />
      )}
      {stepForm === 2 && (
        <MultiStepForm2 formType="add" setStepForm={setStepForm} />
      )}
      {stepForm === 3 && (
        <MultiStepForm3 formType="add" setStepForm={setStepForm} />
      )}
    </>
  );
};

export default AddNewProduct;
