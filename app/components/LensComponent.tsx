'use client'
import React, { useEffect, Dispatch, SetStateAction } from "react";
import veryfiLens from "veryfi-lens-sdk"

const VALIDATE_URL = 'https://lens.veryfi.com/rest/validate_partner';
const CLIENT_ID = 'YOUR CLIENT ID HERE'

export interface LensComponentProps {
  sessionToken: string;
  setImage: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  coordinates: number[][];
}

const Lens = ({
  setImage,
  setIsEditing,
}: LensComponentProps) => {

  const fetchSessionId = async (clientId: string) => {
    return await fetch(VALIDATE_URL, {
      method: "POST",
      headers: {
        "CLIENT-ID": clientId,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Wrong client id");
      })
      .then((response) => {
        return response.session;
      })
      .catch((error) => {
        console.log("[EVENT] " + error);
      });
  };
  
  useEffect(() => {
    
    const startLens = async () => {
      const session = await fetchSessionId(CLIENT_ID)
      veryfiLens.setUserAgent(navigator.userAgent);
      veryfiLens.init(session);
      veryfiLens.startCamera();
    };
    startLens();
    return () => {
    };
  }, []);

  const takePhoto = () => {
    veryfiLens.capture(setImage, setIsEditing);
  };

  return (
    <div className="h-screen overflow-hidden">
    <div className="h-full sm:mt-6" >
      <div
        className="relative flex justify-center w-full h-full overflow-hidden"
        id="veryfi-container"
      ></div>
      <button
        className="absolute bottom-8 sm:bottom-16 left-0 right-0 ml-auto mr-auto border-4 border-white-600 hover:bg-white/50 rounded-full w-16 h-16 z-30"
        onClick={takePhoto}
      />
    </div>
    </div>
  );
};

export default Lens;
