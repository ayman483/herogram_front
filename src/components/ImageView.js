// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// export default function ImageView() {
//   const [imageData, setImageData] = useState(null);
//   const { fileId } = useParams(); // Get the file ID from the URL

//   useEffect(() => {
//     const fetchImageData = async () => {
//       const response = await fetch(`http://localhost:3000/files/image-click/${fileId}`);
//       const data = await response.json();
//       setImageData(data);
//     };

//     fetchImageData();
//   }, [fileId]);

//   return (
//         <div>
//         {imageData ? (
//           <div>
//             <img src={imageData.imageUrl} alt="Shared File" style={{ width: '100%', height: 'auto' }} />
//             {imageData.tags && imageData.tags.length > 0 && (
//               <div>
//                 <strong>Tags:</strong>
//                 <ul>
//                   {imageData.tags.map((tag, index) => (
//                     <li key={index}>{tag}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//   );
// }


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
      const response = await fetch(`http://localhost:3000/files/image-click/${fileId}`);
      const data = await response.json();
      setImageData(data);
      setPrevFileId(fileId); // Update the previous fileId
    };

    fetchImageData();
  }, [fileId, prevFileId]); // Now `prevFileId` is a dependency

  return (
    <div>
      {imageData ? (
        <div>
          <img src={imageData.imageUrl} alt="Shared File" style={{ width: '100%', height: 'auto' }} />
          {/* {imageData.tags && imageData.tags.length > 0 && (
            <div>
              <strong>Tags:</strong>
              <ul>
                {imageData.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
