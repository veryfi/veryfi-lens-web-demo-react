import { Dispatch, SetStateAction, useState } from 'react';
import { AngleLeftIcon } from '../components/icons';
import veryfiLens from 'veryfi-lens-sdk'

export interface EditScreenProps {
  image: string;
  clientId: string;
  username: string;
  apiKey: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const EditScreen = ({
  image,
  setIsEditing,
}: EditScreenProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const getBlur = () => console.log(veryfiLens.getBlurStatus())
  const exit = () => {
    setIsEditing(false)
    veryfiLens.cleanCanvases()
  }

  return (
    <>
      {!isProcessing ? (
        <div id='blur-detector' className='flex flex-col h-screen min items-center bg-zinc-100'>
          <div className='flex w-full bg-white justify-center'>
            <div className='flex w-full bg-white max-w-lg'>
              <button
                className='mx-4 my-2'
                onClick={exit}
              >
                <AngleLeftIcon
                  width={20}
                  height={20}
                  color='fill-gray-800'
                  additionalCss='hover:text-blue-600'
                />
              </button>
            </div>
          </div>
          {image ? (
            <img 
              className='h-4/6 m-4 grow'
              src={`data:image/png;base64,${image}`}
              onLoad={getBlur}
            />
          ) : (
            ''
          )}
          <div className='flex flex-col w-full justify-start items-center bg-white rounded-t-2xl p-4'>
            <button
              className='bg-blue-500 text-white font-medium rounded-md py-2 hover:bg-blue-700 w-full max-w-lg mb-28 sm:mb-0'
            >
              {'Submit'}
            </button>
          </div>
        </div>
      ) : (
        <>
    
        </>
      )}
    </>
  );
};

export default EditScreen;
