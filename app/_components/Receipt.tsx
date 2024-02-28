"use client";
import React, { useEffect, Dispatch, SetStateAction, useState } from "react";

export interface ReceiptProps {
  sessionToken: string;
  setImage: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const Receipt = ({ sessionToken, setImage, setIsEditing }: ReceiptProps) => {
  const [veryfiLens, setVeryfiLens] = useState<{
    setUserAgent: (arg0: string) => void;
    initWasm: (arg0: string) => void;
    startCameraWasm: () => void;
    getSocketStatusColor: () => React.SetStateAction<string>;
    captureWasm: (
      arg0: React.Dispatch<React.SetStateAction<string>>,
      arg1: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
  } | null>(null);
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  useEffect(() => {
    const startWasm = async () => {
      if (typeof window !== "undefined") {
        const lens = require("veryfi-lens-wasm").default;
        console.log(await lens.getDeviceData());
        lens.setUserAgent(navigator.userAgent);
        await lens.initWasm(sessionToken, CLIENT_ID);
        setVeryfiLens(lens);
      }
    };
    startWasm();
  }, []);

  const takePhoto = () => {
    if (veryfiLens) {
      veryfiLens.captureWasm(setImage, setIsEditing);
    } else {
      console.log("veryfiLens is not initialized");
    }
  };

  return (
    <div className="h-full">
      <div
        className="relative flex justify-center w-full h-full overflow-hidden"
        id="veryfi-container"
      ></div>
      <button
        className="absolute bottom-8 sm:bottom-16 left-0 right-0 ml-auto mr-auto border-4 border-white-600 hover:bg-white/50 rounded-full w-16 h-16 z-50"
        onClick={takePhoto}
      />
    </div>
  );
};

export default Receipt;
