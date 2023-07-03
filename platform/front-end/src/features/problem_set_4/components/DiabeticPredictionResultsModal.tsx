import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { DiabeticFormSchema, DiabeticPredictionResponse } from "../types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { useMemo } from "react";

interface Props extends UseDisclosureReturn {
  formData?: DiabeticFormSchema;
  results: DiabeticPredictionResponse | null;
}

export const DiabeticPredictionResults = ({
  formData,
  results,
  ...props
}: Props) => {
  const isDiabetic = useMemo(() => {
    if (!results) return false;
    return results?.is_diabetic ?? false;
  }, [results]);
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Diabetic Prediction Results</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row justify-between">
              <div className="font-bold">Pregnancies:</div>
              <span>{formData?.pregnancies}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-bold">Glucose:</div>
              <span>{formData?.glucose}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-bold">Blood Pressure:</div>
              <span>{formData?.blood_pressure}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-bold">Skin Thickness:</div>
              <span>{formData?.skin_thickness}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-bold">Insulin:</div>
              <span>{formData?.insulin}</span>
            </div>

            <div className="flex flex-row justify-between">
              <div className="font-bold">BMI:</div>
              <span>{formData?.bmi}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-bold">Diabetes Pedigree Function:</div>
              <span>{formData?.diabetes_pedigree_function}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-bold">Age:</div>
              <span>{formData?.age}</span>
            </div>

            <div className="flex flex-row justify-between">
              <div className="font-bold">Prediction:</div>
              <span
                className={`${
                  isDiabetic
                    ? "bg-yellow-800 text-yellow-200"
                    : " bg-green-800 text-green-200"
                } rounded-md px-2 py-1`}
              >
                {isDiabetic ? "Diabetic" : "Not Diabetic"}
              </span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
