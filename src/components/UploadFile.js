// import React, { useState } from "react";
// import { uploadFile } from "../utils/api";

// export default function UploadFile() {
//   const [file, setFile] = useState(null);

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select a file first.");
//       return;
//     }

//     const result = await uploadFile(file);
//     alert(result.message || "File uploaded successfully!");
//   };

//   return (
//     <div className="form-container">
//       <h2>Upload File</h2>
//       <form onSubmit={handleUpload}>
//         <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { uploadFile } from "../utils/api";

export default function UploadFile({ refreshFileList }) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileSelection = (selectedFile) => {

        console.log(selectedFile);
        if (!selectedFile) {
            alert("No file selected.");
            return;
        }

        const fileType = selectedFile.type.split("/")[0];
        if (fileType !== "image" && fileType !== "video") {
            alert("Only image or video files are allowed.");
            return;
        }

        setFile(selectedFile);
        setFileName(selectedFile.name.split(".")[0]); // Default file name
        setShowPopup(true); // Show popup for details
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true); // Add visual feedback
    };

    const handleDragLeave = () => {
        setIsDragOver(false); // Remove visual feedback
    };


    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false); // Remove visual feedback

        const droppedFile = e.dataTransfer.files[0]; // Get the file from the drag event
        if (droppedFile) {
            console.log(droppedFile);
            handleFileSelection(droppedFile); // Call the selection handler
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() !== "") {
            setTags((prev) => [...prev, tagInput.trim()]);
            setTagInput("");
        }
    };

    // const handleUpload = async (e) => {
    //     e.preventDefault();
    
    //     if (!file) {
    //         alert("Please select a file first.");
    //         return;
    //     }
    
    //     const formData = new FormData();
    //     formData.append("fileName", fileName);
    //     formData.append("tags", JSON.stringify(tags));  // Convert tags array to JSON string
    //     formData.append('file', file); // Make sure the file is appended correctly
    
    //     try {
    //         const result = await uploadFile(formData);  // Ensure this is calling the correct API function
    //         alert(result.message || "File uploaded successfully!");
    //         setFile(null);
    //         setFileName("");
    //         setTags([]);
    //         setShowPopup(false);
    //         refreshFileList(); // Refresh the file list after upload
    //     } catch (error) {
    //         console.error("Upload Error: ", error);
    //         alert("There was an error uploading the file.");
    //     }
    // };   

    const handleUpload = async (e) => {
        e.preventDefault();
    
        if (!file) {
            alert("Please select a file first.");
            return;
        }
    
        // Get the file type (MIME type)
        const fileType = file.type;
    
        const formData = new FormData();
        formData.append("fileName", fileName);
        formData.append("tags", JSON.stringify(tags));  // Convert tags array to JSON string
        formData.append('file', file); // Make sure the file is appended correctly
        formData.append('fileType', fileType); // Append the file type to the form data
    
        try {
            const result = await uploadFile(formData);  // Ensure this is calling the correct API function
            // alert(result.message || "File uploaded successfully!");
            setFile(null);
            setFileName("");
            setTags([]);
            setShowPopup(false);
            refreshFileList(); // Refresh the file list after upload
        } catch (error) {
            console.error("Upload Error: ", error);
            // alert("There was an error uploading the file.");
        }
    };
    
    return (
        <div className="upload-container">
            <h2>Upload File</h2>

            {/* Drag-and-Drop Area */}
            <div
                className={`drag-drop-area ${isDragOver ? "drag-over" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {isDragOver ? "Drop your file here" : "Drag and drop files here"}
            </div>

            {/* File Upload Button */}
            <input
                type="file"
                accept="image/*,video/*"
                id="fileUpload"
                style={{ display: "none" }}
                onChange={(e) => handleFileSelection(e.target.files[0])}
            />
            <button onClick={() => document.getElementById("fileUpload").click()}>
                Upload File
            </button>

            {/* File Details Popup */}
            {showPopup && (
                <div className="popup">
                    <h3>File Details</h3>
                    <p>Selected File: {file.name}</p>
                    <label>
                        File Name:
                        <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                    </label>
                    <label>
                        Add Tag:
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                        />
                        <button type="button" onClick={handleAddTag}>
                            Add
                        </button>
                    </label>
                    <div>
                        <p>Tags: {tags.join(", ")}</p>
                    </div>
                    <button onClick={handleUpload}>Submit</button>
                    <button onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
