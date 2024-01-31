import { useState } from "react";
import MultiStepForm1 from "../components/MultiStepForm/MultiStepForm1";
import MultiStepForm2 from "../components/MultiStepForm/MultiStepForm2";
import MultiStepForm3 from "../components/MultiStepForm/MultiStepForm3";

const EditProduct = () => {
  const [stepForm, setStepForm] = useState(1);

  return (
    <>
      {stepForm === 1 && (
        <MultiStepForm1 formType="edit" setStepForm={setStepForm} />
      )}
      {stepForm === 2 && (
        <MultiStepForm2 formType="edit" setStepForm={setStepForm} />
      )}
      {stepForm === 3 && (
        <MultiStepForm3 formType="edit" setStepForm={setStepForm} />
      )}
    </>
  );
};

export default EditProduct;
