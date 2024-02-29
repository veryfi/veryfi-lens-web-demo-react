import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
// import GoHomeButton from "../GoHomeButton";

export interface ReceiptProps {
  sessionToken: string;
  image: string;
  deviceData: any;
  setDeviceData: React.Dispatch<React.SetStateAction<any>>;
  setImage: Dispatch<SetStateAction<string>>;
  setIsUpload: Dispatch<SetStateAction<boolean>>;
  setIsDocument: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const UploadDocument = ({
  sessionToken,
  setImage,
  image,
  deviceData,
  setIsUpload,
  setDeviceData,
  setIsEditing,
  setIsDocument,
}: ReceiptProps) => {
  const [imageFile, setImageFile] = useState(null);
  const [veryfiLens, setVeryfiLens] = useState<{
    getDeviceData(): any;
    setUserAgent: (arg0: string) => void;
    initUploadWasm: (arg0: string) => void;
    captureUploaded: (arg0: Blob) => any;
    captureWasm: () => Promise<string>;
  } | null>(null);
  const [imageData, setImageData] = useState("");
  const fileInputRef = useRef(null);
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

  useEffect(() => {
    const startWasm = async () => {
      if (typeof window !== "undefined") {
        const lens = require("veryfi-lens-wasm").default;
        console.log(await lens.getDeviceData());
        lens.setUserAgent(navigator.userAgent);
        await lens.initUploadWasm(sessionToken, CLIENT_ID);
        setVeryfiLens(lens);
      }
    };
    startWasm();
  }, []);

  const processFile = (file: any) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setImageData(imageData);
      const finalImage = imageData.split(",")[1];
      setImage(finalImage);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Handling");
    const file = e.target.files && e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleAreaClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const handleCrop = async () => {
    const data = await veryfiLens?.captureUploaded(
      imageFile as unknown as Blob
    );
    setImage(data);
    setIsEditing(true);
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-full w-full">
      <div className="absolute right-5 top-0">
        {/* <GoHomeButton setter={setIsUpload} /> */}
      </div>
      {image && (
        <div className="absolute top-5 flex flex-col h-full">
          <img
            className="rounded-md bg-slate-200 shadow-md p-4 m-2 max-h-[65vh] max-w-[400px] overflow-auto"
            src={imageData}
            alt="Receipt"
          />
          <button
            className="submitButton text-white font-bold p-1 m-1 z-50 bg-green-500 rounded-sm"
            onClick={handleCrop}
          >
            Submit
          </button>
        </div>
      )}
      <div className="absolute bottom-28 flex bg-slate-200 rounded-md shadow-md p-4 m-2 gap-1 justify-center items-center h-[70px] mt-4 border-dashed border-[2px] border-green-500">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleAreaClick}
          className="drop-area p-4 m-2 text-center cursor-pointer"
        >
          <p>Drag and drop your image here, or click to select a file</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
