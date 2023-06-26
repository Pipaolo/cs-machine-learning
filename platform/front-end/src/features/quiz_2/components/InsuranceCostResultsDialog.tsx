import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { type Quiz2Part1Response, type Quiz2Part1FormSchema } from "../types";
import { useMemo } from "react";
import { formatNumberToPHP } from "~/utils/currency";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results?: Quiz2Part1Response | null;
  form: Quiz2Part1FormSchema;
}
export const InsuranceCostResultsDialog = ({
  form,
  results,
  ...props
}: Props) => {
  const bmi = useMemo(() => {
    if (!results) return 0;

    const heightInMeters = form.height / 100;
    const bmi = form.weight / (heightInMeters * heightInMeters);
    return bmi;
  }, [results, form.height, form.weight]);

  const insuranceCostEquation = useMemo(() => {
    if (!results) return "";
    const { coefficient, intercept } = results;
    const bmiCoefficient = coefficient[0] ?? 0;
    const ageCoefficient = coefficient[1] ?? 0;
    const numberOfChildrenCoefficient = coefficient[2] ?? 0;

    return `${intercept.toFixed(2)} + ${ageCoefficient.toFixed(
      2
    )} * age + ${bmiCoefficient.toFixed(
      2
    )} * bmi + ${numberOfChildrenCoefficient.toFixed(2)} * number_of_children`;
  }, [results]);

  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Insurance Cost Predictions 💰</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between">
                <div className="font-bold">Sex:</div>
                <span>{form.sex.toLocaleUpperCase()}</span>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Name:</div>
                <span>{form.name}</span>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Height(CM)</div>
                <span>{form.height}</span>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Weight(KG)</div>
                <span>{form.weight}</span>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Number of Children</div>
                <span>{form.children}</span>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Smoker</div>
                <div className="flex space-x-1">
                  <span>{results?.is_smoker ? "Yes" : "No"}</span>
                  <span>
                    ({((results?.smoker_probability ?? 0) * 100).toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">BMI</div>
                <span>{bmi.toFixed(2)}</span>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Insurance Cost:</div>
                <span>{formatNumberToPHP(results?.charges ?? 0)}</span>
              </div>
              <div className="flex flex-col  space-y-4">
                <div className="font-bold">Insurance Cost Equation:</div>
                <code className="inline-flex items-center space-x-4 rounded-lg bg-gray-800 p-4 text-left text-xs text-white ">
                  {insuranceCostEquation}
                </code>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogAction>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
