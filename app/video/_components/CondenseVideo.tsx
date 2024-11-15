"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CustomDropZone } from "./CustomDropzone";
import { acceptedVideoFiles } from "@/utils/formats";
import { useRef, useState } from "react";
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
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Button } from "@/components/ui/button";

export default function CondenseVideo() {
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: number;
    elapsedSeconds?: number;
  }>({ elapsedSeconds: 0 });
  const [status, setStatus] = useState<
    "notStarted" | "converted" | "condensing"
  >("notStarted");

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

  const ffmpegRef = useRef(new FFmpeg());

  const disableDuringCompression = status === "condensing";

  return (
    <>
      <motion.div
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        key={"drag"}
        transition={{ type: "tween" }}
        className="border rounded-3xl flex col-span-5 w-full md:h-full bg-gray-50/35 dark:bg-zinc-700/35"
      >
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
        <motion.div className="border rounded-3xl flex col-span-3 w-full md:h-full bg-gray-50/35 dark:bg-zinc-700/35 p-4 relative">
          <div className="flex flex-col gap-4 w-full">
            {videoFile && (
              <>
                <VideoDetails videoFile={videoFile} onClear={() => {}} />
                <VideoTrim
                  disabled={disableDuringCompression}
                  onVideoSettingsChange={setVideoSettings}
                  videoSettings={videoSettings}
                />
              </>
            )}
            <VideoInput
              disable={disableDuringCompression}
              onVideoSettingsChange={setVideoSettings}
              videoSettings={videoSettings}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={"button"}
              transition={{ type: "tween" }}
              className="bg-gray-100 dark:bg-black border-gray-200 rounded-2xl p-3 h-fit"
            >
              {(status === "notStarted" || status === "converted") && (
                <Button>Condense</Button>
              )}
             
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
