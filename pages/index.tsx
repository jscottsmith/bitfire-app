import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { BitfireCanvas } from "../components/bitfire-canvas";
import { ColorOptions } from "../components/color-options";
import { ColorStops } from "../components/color-stops";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="w-full h-screen flex items-center justify-center">
          <div>
            <ColorStops />
            <ColorOptions />
            <BitfireCanvas />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
