"use client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Icon } from "./icon";
import ReactDropzone from "react-dropzone";

interface CustomDropZoneProps {
  handleUpload: (files: File) => void;
  acceptedFiles: { [key: string]: string[] };
  disabled?: boolean;
}

export const CustomDropZone = ({
  handleUpload,
  acceptedFiles,
  disabled,
}: CustomDropZoneProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { toast } = useToast();

  const handleHover = (): void => {
    setIsHover(true);
  };

  const handleExitHover = (): void => {
    setIsHover(false);
  };

  const onError = (): void => {
    handleExitHover();
    toast({
      title: "Error uploading your file(s)",
      description: "Allowed files: Audio , Video and Images",
      variant: "destructive",
      duration: 5000,
    });
  };

  const onDropRejected = () => {
    handleExitHover();
    toast({
      title: "Error uploading your file(s)",
      description: "Allowed files: Audio , Video and Images",
      variant: "destructive",
      duration: 5000,
    });
  };
  const onDrop = (files: File[]) => {
    handleUpload(files[0]);
    handleExitHover();
  };

  return (
    <ReactDropzone
      disabled={disabled}
      onDrop={onDrop}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={acceptedFiles}
      multiple={false}
      onError={onError}
      onDropRejected={onDropRejected}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`
          ${
            isHover ? "border-black bg-gray-100/80" : "border-default-gray"
          } flex justify-center items-center flex-col cursor-pointer w-full py-6 ${
            disabled ? "cursor-not-allowed" : ""
          }`}
        >
          <input {...getInputProps()} />
          <Icon />
          <h3 className="text-center mt-5">
            Click to Select Video <br />
            or <br />
            drag video and drop
          </h3>
        </div>
      )}
    </ReactDropzone>
  );
};
