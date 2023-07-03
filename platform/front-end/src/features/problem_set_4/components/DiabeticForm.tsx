import {
  UseFormRegister,
  type UseFormReturn,
  type UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import { DiabeticFormSchema } from "../types";
import { type MinMaxData } from "~/features/data";
import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { Button } from "~/components/ui/button";

interface Props {
  isLoading: boolean;
  minMax?: MinMaxData | null;
  onSubmit: (data: DiabeticFormSchema) => Promise<void>;
}

export const DiabeticForm = ({ minMax, isLoading, onSubmit }: Props) => {
  const minMaxData = useMemo(() => {
    return {
      min: {
        pregnancies: Number(minMax?.min.pregnancies) ?? 0,
        glucose: Number(minMax?.min.glucose) ?? 0,
        bloodPressure: Number(minMax?.min.bloodPressure) ?? 0,
        skinThickness: Number(minMax?.min.skinThickness) ?? 0,
        insulin: Number(minMax?.min.insulin) ?? 0,
        bmi: Number(minMax?.min.bmi) ?? 0,
        diabetesPedigreeFunction:
          Number(minMax?.min.diabetesPedigreeFunction) ?? 0,
        age: Number(minMax?.min.age) ?? 0,
      },
      max: {
        pregnancies: Number(minMax?.max.pregnancies) ?? 0,
        glucose: Number(minMax?.max.glucose) ?? 0,
        bloodPressure: Number(minMax?.max.bloodPressure) ?? 0,
        skinThickness: Number(minMax?.max.skinThickness) ?? 0,
        insulin: Number(minMax?.max.insulin) ?? 0,
        bmi: Number(minMax?.max.bmi) ?? 0,
        diabetesPedigreeFunction:
          Number(minMax?.max.diabetesPedigreeFunction) ?? 0,
        age: Number(minMax?.max.age) ?? 0,
      },
    };
  }, [minMax]);
  const form = useForm<DiabeticFormSchema>({
    resolver: zodResolver(
      DiabeticFormSchema.extend({
        pregnancies: z
          .number()
          .min(minMaxData.min.pregnancies)
          .max(minMaxData.max.pregnancies),
        glucose: z
          .number()
          .min(minMaxData.min.glucose)
          .max(minMaxData.max.glucose),
        blood_pressure: z
          .number()
          .min(minMaxData.min.bloodPressure)
          .max(minMaxData.max.bloodPressure),
        skin_thickness: z
          .number()
          .min(minMaxData.min.skinThickness)
          .max(minMaxData.max.skinThickness),
        insulin: z
          .number()
          .min(minMaxData.min.insulin)
          .max(minMaxData.max.insulin),
        bmi: z.number().min(minMaxData.min.bmi).max(minMaxData.max.bmi),
        diabetes_pedigree_function: z
          .number()
          .min(minMaxData.min.diabetesPedigreeFunction)
          .max(minMaxData.max.diabetesPedigreeFunction),
        age: z.number().min(minMaxData.min.age).max(minMaxData.max.age),
      })
    ),
    defaultValues: {
      age: 0,
      blood_pressure: 0,
      bmi: 0,
      diabetes_pedigree_function: 0,
      glucose: 0,
      insulin: 0,
      pregnancies: 0,
      skin_thickness: 0,
    },
  });
  const { reset } = form;

  // Set the min values as the default values
  useEffect(() => {
    reset({
      age: minMaxData.min.age,
      blood_pressure: minMaxData.min.bloodPressure,
      bmi: minMaxData.min.bmi,
      diabetes_pedigree_function: minMaxData.min.diabetesPedigreeFunction,
      glucose: minMaxData.min.glucose,
      insulin: minMaxData.min.insulin,
      pregnancies: minMaxData.min.pregnancies,
      skin_thickness: minMaxData.min.skinThickness,
    });
  }, [
    reset,
    minMaxData.min.age,
    minMaxData.min.bloodPressure,
    minMaxData.min.bmi,
    minMaxData.min.diabetesPedigreeFunction,
    minMaxData.min.glucose,
    minMaxData.min.insulin,
    minMaxData.min.pregnancies,
    minMaxData.min.skinThickness,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          name="pregnancies"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Pregnancies</FormLabel>
                <FormControl>
                  <NumberInput
                    size={"md"}
                    id={field.name}
                    value={field.value}
                    defaultValue={1}
                    isDisabled={isLoading}
                    min={minMaxData.min.pregnancies}
                    max={minMaxData.max.pregnancies}
                    keepWithinRange
                    onBlur={field.onBlur}
                    onChange={(valueAsString, valueAsNumber) => {
                      if (valueAsString === "") {
                        field.onChange(0);
                        return;
                      }
                      field.onChange(valueAsNumber);
                    }}
                  >
                    <NumberInputField
                      ref={field.ref}
                      placeholder="Enter pregnancy count..."
                      rounded={"md"}
                    />
                  </NumberInput>
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.pregnancies} and{" "}
                  {minMaxData.max.pregnancies}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="glucose"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Glucose</FormLabel>
                <FormControl>
                  <NumberInput
                    size={"md"}
                    id={field.name}
                    value={field.value}
                    isDisabled={isLoading}
                    defaultValue={1}
                    min={minMaxData.min.glucose}
                    max={minMaxData.max.glucose}
                    keepWithinRange
                    onBlur={field.onBlur}
                    onChange={(valueAsString, valueAsNumber) => {
                      if (valueAsString === "") {
                        field.onChange(0);
                        return;
                      }
                      field.onChange(valueAsNumber);
                    }}
                  >
                    <NumberInputField
                      ref={field.ref}
                      placeholder="Enter glucose..."
                      rounded={"md"}
                    />
                  </NumberInput>
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.glucose} and{" "}
                  {minMaxData.max.glucose}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="blood_pressure"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Blood Pressure</FormLabel>
                <FormControl>
                  <NumberInput
                    size={"md"}
                    id={field.name}
                    value={field.value}
                    isDisabled={isLoading}
                    defaultValue={1}
                    min={minMaxData.min.bloodPressure}
                    max={minMaxData.max.bloodPressure}
                    keepWithinRange
                    onBlur={field.onBlur}
                    onChange={(valueAsString, valueAsNumber) => {
                      if (valueAsString === "") {
                        field.onChange(0);
                        return;
                      }
                      field.onChange(valueAsNumber);
                    }}
                  >
                    <NumberInputField
                      ref={field.ref}
                      placeholder="Enter blood pressure..."
                      rounded={"md"}
                    />
                  </NumberInput>
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.bloodPressure} and{" "}
                  {minMaxData.max.bloodPressure}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="bmi"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>BMI</FormLabel>
                <FormControl>
                  <NumberInput
                    size={"md"}
                    id={field.name}
                    isDisabled={isLoading}
                    defaultValue={field.value}
                    precision={2}
                    min={minMaxData.min.bmi}
                    max={minMaxData.max.bmi}
                    keepWithinRange
                    onBlur={field.onBlur}
                    onChange={(valueAsString, valueAsNumber) => {
                      field.onChange(valueAsNumber);
                    }}
                  >
                    <NumberInputField
                      ref={field.ref}
                      value={field.value}
                      placeholder="Enter bmi..."
                      rounded={"md"}
                    />
                  </NumberInput>
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.bmi} and{" "}
                  {minMaxData.max.bmi}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="insulin"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Insulin</FormLabel>
                <FormControl>
                  <NumberInput
                    size={"md"}
                    id={field.name}
                    value={field.value}
                    isDisabled={isLoading}
                    defaultValue={1}
                    min={minMaxData.min.insulin}
                    max={minMaxData.max.insulin}
                    keepWithinRange
                    onBlur={field.onBlur}
                    onChange={(valueAsString, valueAsNumber) => {
                      if (valueAsString === "") {
                        field.onChange(0);
                        return;
                      }
                      field.onChange(valueAsNumber);
                    }}
                  >
                    <NumberInputField
                      ref={field.ref}
                      placeholder="Enter insulin..."
                      rounded={"md"}
                    />
                  </NumberInput>
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.insulin} and{" "}
                  {minMaxData.max.insulin}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="diabetes_pedigree_function"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Diabetes Pedigree Function</FormLabel>
                <FormControl>
                  <NumberInput
                    size={"md"}
                    precision={2}
                    id={field.name}
                    isDisabled={isLoading}
                    defaultValue={field.value}
                    min={minMaxData.min.diabetesPedigreeFunction}
                    max={minMaxData.max.diabetesPedigreeFunction}
                    keepWithinRange
                    onBlur={field.onBlur}
                    onChange={(valueAsString, valueAsNumber) => {
                      field.onChange(valueAsNumber);
                    }}
                  >
                    <NumberInputField
                      ref={field.ref}
                      value={field.value}
                      placeholder="Enter diabetes pedigree function..."
                      rounded={"md"}
                    />
                  </NumberInput>
                </FormControl>
                <FormDescription>
                  Enter a value between{" "}
                  {minMaxData.min.diabetesPedigreeFunction} and{" "}
                  {minMaxData.max.diabetesPedigreeFunction}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="skin_thickness"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Skin Thickness</FormLabel>
                <FormControl>
                  <NumberInput
                    size={"md"}
                    id={field.name}
                    value={field.value}
                    isDisabled={isLoading}
                    defaultValue={1}
                    min={minMaxData.min.skinThickness}
                    max={minMaxData.max.skinThickness}
                    keepWithinRange
                    onBlur={field.onBlur}
                    onChange={(valueAsString, valueAsNumber) => {
                      if (valueAsString === "") {
                        field.onChange(0);
                        return;
                      }
                      field.onChange(valueAsNumber);
                    }}
                  >
                    <NumberInputField
                      ref={field.ref}
                      placeholder="Enter skin thickness..."
                      rounded={"md"}
                    />
                  </NumberInput>
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.skinThickness} and{" "}
                  {minMaxData.max.skinThickness}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="age"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <NumberInput
                    size={"md"}
                    id={field.name}
                    value={field.value}
                    defaultValue={1}
                    min={minMaxData.min.age}
                    max={minMaxData.max.age}
                    keepWithinRange
                    onBlur={field.onBlur}
                    onChange={(valueAsString, valueAsNumber) => {
                      if (valueAsString === "") {
                        field.onChange(0);
                        return;
                      }
                      field.onChange(valueAsNumber);
                    }}
                  >
                    <NumberInputField
                      ref={field.ref}
                      placeholder="Enter age..."
                      rounded={"md"}
                    />
                  </NumberInput>
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.age} and{" "}
                  {minMaxData.max.age}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button disabled={isLoading}>Submit</Button>
      </form>
    </Form>
  );
};
