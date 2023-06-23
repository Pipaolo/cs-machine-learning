import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { type NextPage } from "next";
import { init } from "next/dist/compiled/@vercel/og/satori";
import Head from "next/head";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { GenericLayout } from "~/components/layout/generic";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  type HAttackAdmittedFormSchema,
  type HAttackInitialFormSchema,
} from "~/features/quiz_2";
import {
  HAttackAdmittedForm,
  HAttackInitialForm,
} from "~/features/quiz_2/components";
import { api } from "~/utils/api";

/**
 * This will be used to determine whether a person has a high or low risk of
 * having a heart attack.
 */
const POSITIVE_TRESHOLD = 0.6;

const HAttackPredictionPage: NextPage = () => {
  const minMax = api.data.minMax.useQuery({
    fileName: "q2-part-2.csv",
  });
  const initialPrediction = api.quiz2.hAttackInitialPrediction.useMutation();
  const admittedPrediction = api.quiz2.hAttackAdmittedPrediction.useMutation();
  const [initialFormData, setInitialFormData] =
    useState<HAttackInitialFormSchema | null>(null);

  const [admittedFormData, setAdmittedFormData] =
    useState<HAttackAdmittedFormSchema | null>(null);

  const onInitialFormSubmit = async (data: HAttackInitialFormSchema) => {
    setInitialFormData(null);
    await initialPrediction.mutateAsync(data, {
      onSuccess: () => {
        setInitialFormData(data);
      },
    });
  };
  const onAdmittedFormSubmit = async (data: HAttackAdmittedFormSchema) => {
    if (!initialFormData) return;
    setAdmittedFormData(null);
    await admittedPrediction.mutateAsync(
      {
        ...data,
        ...initialFormData,
      },
      {
        onSuccess: () => {
          setAdmittedFormData(data);
        },
      }
    );
  };

  const renderAdmittedResult = () => {
    if (admittedPrediction.isLoading) return <div></div>;
    const initialPredictions = initialPrediction.data;
    if (!initialPredictions) return <div></div>;
    const currentPredictions = admittedPrediction.data;
    if (!currentPredictions) return <div></div>;
    const prevHAttackProb = initialPredictions.probabilities.heart_attack;
    const currentHAttackProb = currentPredictions.probabilities.heart_attack;
    const isNearPrevious = Math.abs(prevHAttackProb - currentHAttackProb) < 0.1;
    const isAboveThreshold = currentHAttackProb > POSITIVE_TRESHOLD;

    // Check if the heart attack probability is below the threshold
    if (!isNearPrevious || !isAboveThreshold) {
      return (
        <Card className="flex w-full max-w-md flex-col p-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Heart Attack Probability:{" "}
            <span className="text-amber-500">
              {(currentHAttackProb * 100).toFixed(2)}%
            </span>
          </h4>
          <p className="scroll-m-20">
            The patient should still be admitted to the ICU, for further
            checking.
          </p>
        </Card>
      );
    }

    // Check if the heart attack probability is above the threshold
    return (
      <Card className="flex w-full max-w-md flex-col space-y-4 p-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Heart Attack Probability:{" "}
          <span className="text-red-500">
            {(currentHAttackProb * 100).toFixed(2)}%
          </span>
        </h4>
        <p className="scroll-m-20">
          The patient should be admitted to the ICU immediately, for further
          checking. Kindly show the following report to a doctor/specialist.
        </p>
        {/* Show the inputted fields */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Sex:</span>
            <span>{initialFormData?.sex}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Age:</span>
            <span>{initialFormData?.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Chest Pain Type:</span>
            <span>{initialFormData?.cp}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Resting Blood Pressure(mmHg):</span>
            <span>{initialFormData?.trestbps}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Serum Cholesterol(mg/dl):</span>
            <span>{initialFormData?.chol}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Thalach:</span>
            <span>{initialFormData?.thalach}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Fasting Blood Sugar:</span>
            <span>{admittedFormData?.fbs}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">
              Resting Electrocardiographic Results:
            </span>
            <span>{admittedFormData?.restecg}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Thal:</span>
            <span>{admittedFormData?.thal}</span>
          </div>
        </div>
      </Card>
    );
  };

  const renderInitialResult = () => {
    if (initialPrediction.isLoading) return <div></div>;

    const predictions = initialPrediction.data;
    if (!predictions) return <div></div>;

    const heartAttackProb = predictions.probabilities.heart_attack;

    if (heartAttackProb < POSITIVE_TRESHOLD) {
      return (
        <Card className="w-full max-w-md">
          <div className="flex flex-col space-y-4 p-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Heart Attack Probability:{" "}
              <span className="text-amber-500">
                {" "}
                {(heartAttackProb * 100).toFixed(2)}%
              </span>
            </h4>
            <p className="scroll-m-20">
              The patient should be admitted to a normal ward, for further
              checking.
            </p>
          </div>
        </Card>
      );
    }

    return (
      <Card className="flex w-full max-w-md flex-col space-y-4 p-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Heart Attack Probability:{" "}
          <span className="text-red-500">
            {(heartAttackProb * 100).toFixed(2)}%
          </span>
        </h4>
        <p className="scroll-m-20">
          The patient should be admitted to the ICU, for further checking.
          Kindly fill-up the form below.
        </p>

        <HAttackAdmittedForm
          isLoading={admittedPrediction.isLoading}
          minMax={minMax.data}
          onSubmit={onAdmittedFormSubmit}
        />
      </Card>
    );
  };

  const renderContent = () => {
    if (minMax.isLoading) return <div></div>;

    return (
      <>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Patient Heart Attack Prediction</CardTitle>
            <CardDescription>Quiz 2 - Part 2</CardDescription>
          </CardHeader>
          <CardContent>
            <HAttackInitialForm
              onSubmit={onInitialFormSubmit}
              minMax={minMax.data}
              isLoading={initialPrediction.isLoading}
            />
          </CardContent>
        </Card>
        {renderInitialResult()}
        {renderAdmittedResult()}
      </>
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
        <div className="m-auto flex h-full w-full flex-col items-center  justify-center space-y-4 p-4">
          {renderContent()}
        </div>
      </GenericLayout>
    </>
  );
};

export default HAttackPredictionPage;
