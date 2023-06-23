import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { useForm, type UseFormReturn } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ChestPainType, HAttackInitialFormSchema } from "../types";
import { type MinMaxData } from "~/features/data";
import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { validationErrors } from "~/utils/error";
interface Props {
  minMax?: MinMaxData | null;
  isLoading: boolean;
  onSubmit: (data: HAttackInitialFormSchema) => Promise<void>;
}
export const HAttackInitialForm = ({
  onSubmit,
  minMax,
  isLoading = false,
}: Props) => {
  const minMaxData = useMemo(() => {
    return {
      min: {
        age: Number(minMax?.min.age) ?? 0,
        chol: Number(minMax?.min.chol) ?? 0,
        thalach: Number(minMax?.min.thalach) ?? 0,
        trestbps: Number(minMax?.min.trestbps) ?? 0,
      },
      max: {
        age: Number(minMax?.max.age) ?? 0,
        chol: Number(minMax?.max.chol) ?? 0,
        thalach: Number(minMax?.max.thalach) ?? 0,
        trestbps: Number(minMax?.max.trestbps) ?? 0,
      },
    };
  }, [minMax]);

  const form = useForm<HAttackInitialFormSchema>({
    resolver: zodResolver(
      HAttackInitialFormSchema.extend({
        age: z.coerce.number().min(minMaxData.min.age).max(minMaxData.max.age),
        chol: z.coerce
          .number()
          .min(minMaxData.min.chol, validationErrors.min(minMaxData.min.chol))
          .max(minMaxData.max.chol, validationErrors.max(minMaxData.max.chol)),
        thalach: z.coerce
          .number()
          .min(
            minMaxData.min.thalach,
            validationErrors.min(minMaxData.min.thalach)
          )
          .max(
            minMaxData.max.thalach,
            validationErrors.max(minMaxData.max.thalach)
          ),
        trestbps: z.coerce
          .number()
          .min(
            minMaxData.min.trestbps,
            validationErrors.min(minMaxData.min.trestbps)
          )
          .max(
            minMaxData.max.trestbps,
            validationErrors.max(minMaxData.max.trestbps)
          ),
      })
    ),
    defaultValues: {
      age: 0,
      chol: 0,
      cp: "0",
      sex: "male",
      thalach: 0,
      trestbps: 0,
    },
  });
  const { reset } = form;

  // Set the min values as the default values
  useEffect(() => {
    reset({
      age: minMaxData.min.age,
      chol: minMaxData.min.chol,
      thalach: minMaxData.min.thalach,
      trestbps: minMaxData.min.trestbps,
    });
  }, [
    reset,
    minMaxData.min.age,
    minMaxData.min.chol,
    minMaxData.min.thalach,
    minMaxData.min.trestbps,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          name="sex"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Input type="number" placeholder="Enter age..." {...field} />
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
        <FormField
          name="cp"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Chest Pain</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chest pain" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ChestPainType.options.map((option, i) => (
                      <SelectItem key={option} value={i.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="trestbps"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Blood Pressure</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter blood pressure..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.trestbps} and{" "}
                  {minMaxData.max.trestbps}
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="chol"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Cholesterol</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter cholesterol..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.chol} and{" "}
                  {minMaxData.max.chol}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="thalach"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Maximum Heart Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter maximum heart rate..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.thalach} and{" "}
                  {minMaxData.max.thalach}
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
