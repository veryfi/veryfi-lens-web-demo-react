"use client";
import { useState } from "react";
import EditScreen from "./_screens/EditScreen";
import LensScreen from "./_screens/LensScreen";

export default function Home() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  return (
    <main>
      {isEditing ? (
        <EditScreen image={image} setIsEditing={setIsEditing} />
      ) : (
        <LensScreen setImage={setImage} setIsEditing={setIsEditing} />
      )}
    </main>
  );
}
