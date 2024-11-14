"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CustomDropZone } from "./CustomDropzone";
import { acceptedVideoFiles } from "@/utils/formats";
import { useState } from "react";
import {
  FileActions,
  QualityType,
  VideoFormats,
  VideoInputSettings,
} from "@/utils/types";
import VideoDisplay from "./VideoDisplay";
import VideoDetails from "./VideoDetails";
import VideoTrim from "./VideoTrim";
import VideoInput from "./VideoInput";

export default function CondenseVideo() {
  const [videoFile, setVideoFile] = useState<FileActions>();
  const [videoSettings, setVideoSettings] = useState<VideoInputSettings>({
    quality: QualityType.High,
    videoType: VideoFormats.MP4,
    customEndTime: 0,
    customStartTime: 0,
    removeAudio: false,
    twitterCompressionCommand: false,
    whatsappStatusCompressionCommand: false,
  });
  const handleUpload = (file: File) => {
    setVideoFile({
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(file.name.lastIndexOf(".") + 1),
      fileType: file.type,
      file,
      isError: false,
    });
  };
  return (
    <>
      <motion.div className="border rounded-3xl flex col-span-5 w-full md:h-full bg-gray-50/35">
        {videoFile ? (
          <VideoDisplay videoUrl={URL.createObjectURL(videoFile.file)} />
        ) : (
          <CustomDropZone
            handleUpload={handleUpload}
            acceptedFiles={acceptedVideoFiles}
          />
        )}
      </motion.div>
      <AnimatePresence mode="popLayout">
        <motion.div className="border rounded-3xl flex col-span-3 w-full md:h-full bg-gray-50/35 p-4 relative">
          <div className="flex flex-col gap-4 w-full">
            {videoFile && (
              <>
                <VideoDetails videoFile={videoFile} onClear={() => {}} />
                <VideoTrim
                  disabled={false}
                  onVideoSettingsChange={setVideoSettings}
                  videoSettings={videoSettings}
                />
              </>
            )}
            <VideoInput disable={false} onVideoSettingsChange={setVideoSettings} videoSettings={videoSettings}/>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
