import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ImageView() {
  const [imageData, setImageData] = useState(null);
  const { fileId } = useParams();
  const [prevFileId, setPrevFileId] = useState(null); // To store the previous fileId

  useEffect(() => {
    // Prevent API call if fileId hasn't changed
    if (prevFileId === fileId) return;

    const fetchImageData = async () => {
      const response = await fetch(`http://167.172.103.104:3000/files/image-click/${fileId}`);
      const data = await response.json();
      setImageData(data);
      setPrevFileId(fileId); // Update the previous fileId
    };

    fetchImageData();
  }, [fileId, prevFileId]); // Now `prevFileId` is a dependency

  return (
    <div>
    {imageData && (imageData.type === "image/jpeg" || imageData.type === "image/png" || imageData.type === "image/gif") ? (
      <div>
        <img src={imageData.imageUrl} alt="Shared File" style={{ width: '100%', height: 'auto' }} />
      </div>
    ) : imageData && imageData.type === "video/mp4" ? (
      <div>
        <video width="100%" height="auto" controls>
          <source src={imageData.imageUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  
  );
}
