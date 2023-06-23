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
import {
  FastingBloodSugar,
  HAttackAdmittedFormSchema,
  RestingElectrocardiographicResults,
} from "../types";
import { type MinMaxData } from "~/features/data";
import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { validationErrors } from "~/utils/error";
interface Props {
  minMax?: MinMaxData | null;
  isLoading: boolean;
  onSubmit: (data: HAttackAdmittedFormSchema) => Promise<void>;
}
export const HAttackAdmittedForm = ({
  onSubmit,
  minMax,
  isLoading = false,
}: Props) => {
  const minMaxData = useMemo(() => {
    return {
      min: {
        thal: Number(minMax?.min.thal) ?? 0,
      },
      max: {
        thal: Number(minMax?.max.thal) ?? 0,
      },
    };
  }, [minMax]);

  const form = useForm<HAttackAdmittedFormSchema>({
    resolver: zodResolver(
      HAttackAdmittedFormSchema.extend({
        thal: z.coerce
          .number()
          .min(minMaxData.min.thal, validationErrors.min(minMaxData.min.thal))
          .max(minMaxData.max.thal, validationErrors.max(minMaxData.max.thal)),
      })
    ),
    defaultValues: {
      fbs: "0",
      restecg: "0",
      thal: 0,
    },
  });
  const { reset } = form;

  // Set the min values as the default values
  useEffect(() => {
    reset({
      thal: minMaxData.min.thal,
    });
  }, [reset, minMaxData.min.thal]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          name="fbs"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Fasting Blood Sugar</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fasting blood sugar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FastingBloodSugar.options.map((option, i) => (
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
          name="restecg"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Resting Electrocardiographic Results</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select options" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RestingElectrocardiographicResults.options.map(
                      (option, i) => (
                        <SelectItem key={option} value={i.toString()}>
                          {option}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="thal"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Thal</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter thal..." {...field} />
                </FormControl>
                <FormDescription>
                  Enter a value between {minMaxData.min.thal} and{" "}
                  {minMaxData.max.thal}
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
