import React, { useState, useEffect } from "react";
import { fetchFiles } from "../utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box, Link, Button,
} from "@mui/material";

export default function FilesList() {
  const [files, setFiles] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    const fetchFileList = async () => {
      const result = await fetchFiles();
      setFiles(result || []);
    };
    fetchFileList();
  }, []);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleShare = (fileId) => {
    // Generate the shareable URL
    const shareUrl = `http://167.172.103.104/image/${fileId}`;
    navigator.clipboard.writeText(shareUrl);
    alert(`Share URL copied to clipboard: ${shareUrl}`);
  };

  const handleDrop = (index) => {
    const reorderedFiles = [...files];
    const [removed] = reorderedFiles.splice(draggedItem, 1);
    reorderedFiles.splice(index, 0, removed);
    setFiles(reorderedFiles);
    setDraggedItem(null);
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Uploaded Files
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="file list table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>File Path</TableCell>
              <TableCell>File Type</TableCell>
              <TableCell>click Count</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.length > 0 ? (
              files.map((file, index) => (
                <TableRow
                  key={file.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  sx={{
                    cursor: "move",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{file.id}</TableCell>
                  <TableCell>
                    {/* <a href={file.filePath} target="_blank" rel="noopener noreferrer">
                      {file.name || 'N/A'}
                    </a> */}
                    <Link href={`http://167.172.103.104:3000/${file.filePath}`} target="_blank">
                      {file.name || "Untitled"}
                    </Link>
                  </TableCell>
                  <TableCell>{file.filePath}</TableCell>
                  <TableCell>{file.fileType || 'N/A'}</TableCell>
                  <TableCell>{file.clickCount || '0'}</TableCell>
                  <TableCell>{formatDate(file.createdAt)}</TableCell>
                  <TableCell>{formatDate(file.updatedAt)}</TableCell>
                  <TableCell>
                    {file.fileTags && file.fileTags.length > 0
                      ? file.fileTags.map((tag) => tag.tag_name).join(", ")
                      : 'N/A'}
                  </TableCell>
                  {/* <TableCell>
                    <Button variant="contained" onClick={() => handleShare(file.id)}>
                      Share
                    </Button>
                  </TableCell> */}
                   <TableCell>
                    {/* File Link */}
                    <Link
                      href={`http://167.172.103.104/image/${file.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name || "Untitled"}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No files uploaded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
