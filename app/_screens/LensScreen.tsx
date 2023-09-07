"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Receipt from "../_components/Receipt";
import LongReceipt from "../_components/LongReceipt";
import SocketReceipt from "../_components/SocketReceipt";
import axios from "axios";

export interface LensScreenProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string>>;
}

const LensScreen = ({ setIsEditing, setImage }: LensScreenProps) => {
  const clientId: string = 'Your Client ID';
  const VALIDATE_URL = 'https://lens.veryfi.com/rest/validate_partner'; //Ideally put those to .env file
  const [isNormal, setIsNormal] = useState<boolean>(false);
  const [isLong, setIsLong] = useState<boolean>(false);
  const [isSocket, setIsSocket] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string>('');

  const getVeryfiSession = async (clientId: string) => {
    return await axios
      .post(
        VALIDATE_URL,
        {},
        {
          headers: {
            'CLIENT-ID': clientId,
          },
        }
      )
      .then((response) => {
        console.log(response.data.session);
        setSessionToken(response.data.session);
      })
      .catch((error) => error);
  }

  useEffect(() => {
    getVeryfiSession(clientId);
  }, []);


  const reset = () => {
    setIsNormal(false);
    setIsLong(false);
    setIsSocket(false);
  };
  return (
    <div className="h-screen overflow-hidden">
      {!isNormal && !isLong && !isSocket &&(
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center w-[30vw] bg-gray-300 rounded-md">
            <button
              className="text-start border-b-2 p-4 hover:text-blue-500 text-gray-800 w-full cursor-pointer disabled:text-gray-400 "
              onClick={() => setIsSocket(true)}
            >
              Receipts & Invoices (WebSocket)
            </button>
            <button
              className="text-start border-b-2 p-4 hover:text-blue-500 text-gray-800 w-full cursor-pointer disabled:text-gray-400 "
              onClick={() => setIsNormal(true)}
            >
              Receipts & Invoices (WASM)
            </button>
            <button
              className="text-start p-4 hover:text-blue-500 text-gray-800 w-full cursor-pointer disabled:text-gray-400"
              onClick={() => setIsLong(true)}
            >
              Long Receipts
            </button>
          </div>
        </div>
      )}
      {isNormal && (
        <div className="h-screen overflow-hidden">
          <a
            href="/"
            className="absolute z-[60] top-4 m-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => reset()}
          >
            X
          </a>

          <Receipt
            sessionToken={sessionToken}
            setImage={setImage}
            setIsEditing={setIsEditing}
          />
        </div>
      )}
      {isLong && (
        <div className="h-screen overflow-hidden">
          <a
            href="/"
            className="absolute z-[60] top-4 m-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => reset()}
          >
            X
          </a>
          <LongReceipt
            sessionToken={sessionToken}
            setImage={setImage}
            setIsEditing={setIsEditing}
          />
        </div>
      )}
      {isSocket && (
         <div className="h-screen overflow-hidden">
         <a
           href="/"
           className="absolute z-[60] top-4 m-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           onClick={() => reset()}
         >
           X
         </a>
         <SocketReceipt
           sessionToken={sessionToken}
           setImage={setImage}
           setIsEditing={setIsEditing}
         />
       </div>
      )}
    </div>
  );
};

export default LensScreen;
