'use client'
import { useState } from 'react';
import { XMarkIcon } from '../components/icons';
import LensComponent from '../components/LensComponent';
import EditScreen from '../components/Edit';

export interface LensScreenProps {
  sessionToken: string;
  clientId: string;
  username: string;
  apiKey: string;
}

const LensScreen = ({
  sessionToken,
  clientId,
  username,
  apiKey,
}: LensScreenProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState('');
  const [coordinates, setCoordinates] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  return (
    <>
      {!isEditing ? (
        <div className='h-screen overflow-hidden'>
          <a
            href='/'
            className='absolute z-30 m-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            <XMarkIcon width={18} height={18} color='fill-white' />
          </a>
          <LensComponent
            sessionToken={sessionToken}
            setImage={setImage}
            setIsEditing={setIsEditing}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
          />
        </div>
      ) : (
        <EditScreen
          image={image}
          clientId={clientId}
          username={username}
          apiKey={apiKey}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default LensScreen;