import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CS Machine Learning</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center  bg-slate-950">
        <h4 className="p-4 text-center text-2xl font-bold text-white">
          CS Machine Learning - Grupo ni Reginald
        </h4>
        <div className="container m-auto grid h-full grid-cols-1 place-content-center gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Insurance Prediction Model</CardTitle>
              <CardDescription>Quiz 2 - Part 1</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This contains the application for the medical insturance
                prediction engine
              </p>
            </CardContent>
            <CardFooter className="flex w-full items-center justify-center">
              <Link href={"/quiz_2/part_1"} className="w-full">
                <Button className="w-full">Visit</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Heart Attack Prediction Model</CardTitle>
              <CardDescription>Quiz 2 - Part 2</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This contains the application for the heart disease prediction
                engine
              </p>
            </CardContent>
            <CardFooter className="flex w-full items-center justify-center">
              <Link href={"/quiz_2/part_2"} className="w-full">
                <Button className="w-full">Visit</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Home;