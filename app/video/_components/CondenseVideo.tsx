"use client";
import { motion } from "framer-motion";
import { CustomDropZone } from "./CustomDropzone";
import { acceptedVideoFiles } from "@/utils/formats";

export default function CondenseVideo() {
  const handleUpload = (files: File) => {};
  return (
    <>
      <motion.div className="border rounded-3xl flex col-span-5 w-full md:h-full bg-gray-50/35">
        <CustomDropZone
          handleUpload={handleUpload}
          acceptedFiles={acceptedVideoFiles}
        />
      </motion.div>
    </>
  );
}
