import { type NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GenericLayout } from "~/components/layout/generic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Quiz2Part1FormSchema } from "~/features/quiz_2";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { validationErrors } from "~/utils/error";
import { useEffect, useMemo, useState } from "react";
import { InsuranceCostResultsDialog } from "~/features/quiz_2/components";
import { ScaleLoader } from "react-spinners";
import { Input, NumberInput, NumberInputField } from "@chakra-ui/react";

const Quiz2Part1Page: NextPage = () => {
  const minMax = api.data.minMax.useQuery(
    {
      fileName: "q2-part-1.csv",
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const insuranceCostPrediction =
    api.quiz2.insuranceCostPrediction.useMutation();
  const [isResultsDialogOpen, setIsResultsDialogOpen] = useState(false);

  const formMinMax = useMemo(() => {
    if (!minMax.data)
      return {
        min: {
          children: 0,
          age: 0,
        },
        max: {
          children: 0,
          age: 0,
        },
      };

    return {
      min: {
        children: Number(minMax.data.min.children),
        age: Number(minMax.data.min.age),
      },
      max: {
        children: Number(minMax.data.max.children),
        age: Number(minMax.data.max.age),
      },
    };
  }, [minMax.data]);

  const form = useForm<Quiz2Part1FormSchema>({
    defaultValues: {
      name: "John Doe",
      age: formMinMax.min.age,
      children: formMinMax.min.children,
      height: 170,
      weight: 70,
      sex: "male",
    },

    resolver: zodResolver(
      Quiz2Part1FormSchema.extend({
        age: z.coerce
          .number()
          .min(formMinMax.min.age, validationErrors.min(formMinMax.min.age))
          .max(formMinMax.max.age, validationErrors.min(formMinMax.max.age)),

        children: z.coerce
          .number()
          .min(
            formMinMax.min.children,
            validationErrors.min(formMinMax.min.children)
          )
          .max(
            formMinMax.max.children,
            validationErrors.max(formMinMax.max.children)
          ),
      })
    ),
  });
  const { setValue } = form;

  useEffect(() => {
    setValue("age", formMinMax.min.age);
    setValue("children", formMinMax.min.children);
  }, [formMinMax, setValue]);

  const onSubmit = (data: Quiz2Part1FormSchema) => {
    insuranceCostPrediction.mutate(data, {
      onSuccess: () => {
        setIsResultsDialogOpen(true);
      },
    });
  };

  const renderContent = () => {
    if (minMax.isLoading)
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <ScaleLoader color="#000000" />
          <p className="mt-4">Loading...</p>
        </div>
      );

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="sex"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Sex</FormLabel>
                  <Select
                    disabled={minMax.isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-md px-4 py-5">
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
              const {} = field;
              return (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <NumberInput
                      size={"md"}
                      id={field.name}
                      value={field.value}
                      defaultValue={formMinMax.min.age}
                      min={formMinMax.min.age}
                      max={formMinMax.max.age}
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
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="height"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Height(cm)</FormLabel>
                  <FormControl>
                    <NumberInput
                      size={"md"}
                      id={field.name}
                      value={field.value}
                      defaultValue={1}
                      min={1}
                      max={500}
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
                        placeholder="Enter height..."
                        rounded={"md"}
                      />
                    </NumberInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="weight"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Weight(kg)</FormLabel>
                  <FormControl>
                    <NumberInput
                      size={"md"}
                      id={field.name}
                      value={field.value}
                      defaultValue={1}
                      min={1}
                      max={600}
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
                        placeholder="Enter weight..."
                        rounded={"md"}
                      />
                    </NumberInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="children"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Number of Children</FormLabel>
                  <FormControl>
                    <NumberInput
                      size={"md"}
                      id={field.name}
                      value={field.value}
                      defaultValue={formMinMax.min.children}
                      min={formMinMax.min.children}
                      max={formMinMax.max.children}
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
                        placeholder="Enter number of children..."
                        rounded={"md"}
                      />
                    </NumberInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button disabled={insuranceCostPrediction.isLoading}>
            {insuranceCostPrediction.isLoading ? (
              <ScaleLoader color="white" height={15} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <>
      <Head>
        <title>Quiz 2 | Part 2</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GenericLayout>
        <div className="m-auto flex h-full w-full transform flex-col items-center justify-center space-y-4 p-4 ">
          <Card className="w-full max-w-md animate-in fade-in zoom-in-0 duration-500 ease-in-out">
            <CardHeader>
              <CardTitle>Insurance Cost Prediction</CardTitle>
              <CardDescription>Quiz 2 - Part 1</CardDescription>
            </CardHeader>
            <CardContent>{renderContent()}</CardContent>
          </Card>
        </div>
        <InsuranceCostResultsDialog
          form={form.getValues()}
          open={isResultsDialogOpen}
          onOpenChange={setIsResultsDialogOpen}
          results={insuranceCostPrediction.data}
        />
      </GenericLayout>
    </>
  );
};

export default Quiz2Part1Page;
