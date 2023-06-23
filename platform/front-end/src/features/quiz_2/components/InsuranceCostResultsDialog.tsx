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

  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Insurance Cost Predictions 💰</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between">
                <div className="font-bold">Sex:</div>
                <div>{form.sex.toLocaleUpperCase()}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Name:</div>
                <div>{form.name}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Height(CM)</div>
                <div>{form.height}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Weight(KG)</div>
                <div>{form.weight}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Number of Children</div>
                <div>{form.children}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Smoker Probability</div>
                <div>
                  {((results?.smoker_probability ?? 0) * 100).toFixed(2)}%
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">BMI</div>
                <div>{bmi.toFixed(2)}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="font-bold">Insurance Cost</div>
                <div>P{(results?.charges ?? 0).toFixed(2)}</div>
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
