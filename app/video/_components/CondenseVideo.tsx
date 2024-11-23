"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CustomDropZone } from "./CustomDropzone";
import { acceptedVideoFiles } from "@/utils/formats";
import { useEffect, useRef, useState } from "react";
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
import { toBlobURL } from "@ffmpeg/util";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import convertFile from "@/utils/convert";
import VideoProgress from "./VideoProgress";
import VideoOutput from "./VideoOutput";

export default function CondenseVideo() {
  const { toast } = useToast();
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: Date;
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

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `http://localhost:3000/download/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `http://localhost:3000/download/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  };

  const loadWithToast = async () => {
    try {
      await load();

      toast({
        title: "Download Successfully",
        description:
          "All necessary files have been downloaded for offline use.",
        variant: "default",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error downloading FFmpeg packages",
        description:
          "An issue occured while downloading the necessary packages.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  useEffect(function () {
    loadWithToast();
  }, []);

  const condense = async () => {
    if (!videoFile) return;
    try {
      setTime({ ...time, startTime: new Date() });
      setStatus("condensing");
      ffmpegRef.current.on("progress", ({ progress: completion, time }) => {
        const percentage = completion * 100;
        setProgress(percentage);
      });

      ffmpegRef.current.on("log", ({ message }) => {
        console.log(message);
      });

      const { url, output, outputBlob } = await convertFile(
        ffmpegRef.current,
        videoFile,
        videoSettings
      );

      setVideoFile({
        ...videoFile,
        url,
        output,
        outputBlob,
      });
      setTime((oldTime) => ({ ...oldTime, startTime: undefined }));
      setStatus("converted");
      setProgress(0);
    } catch (error) {
      console.log(error);
      setStatus("notStarted");
      setProgress(0);
      setTime({ elapsedSeconds: 0, startTime: undefined });
      toast({
        title: "Error condensing video",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  useEffect(
    function () {
      let timer: NodeJS.Timeout;

      timer = setInterval(() => {
        const endTime = new Date();
        const TimeDifference = endTime.getTime() - time?.startTime!?.getTime();
        setTime({ ...time, elapsedSeconds: TimeDifference });
      }, 1000);
      return () => clearInterval(timer);
    },
    [time]
  );

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
                <VideoDetails
                  videoFile={videoFile}
                  onClear={() => window.location.reload()}
                />
                <VideoTrim
                  disabled={disableDuringCompression}
                  onVideoSettingsChange={setVideoSettings}
                  videoSettings={videoSettings}
                />
              </>
            )}
            {status === "notStarted" && videoFile && (
              <VideoInput
                disable={disableDuringCompression}
                onVideoSettingsChange={setVideoSettings}
                videoSettings={videoSettings}
              />
            )}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={"button"}
              transition={{ type: "tween" }}
              className="bg-gray-100 dark:bg-black border-gray-200 rounded-2xl p-3 h-fit"
            >
              {status === "condensing" && (
                <VideoProgress
                  progress={progress}
                  seconds={time.elapsedSeconds!}
                />
              )}
              {(status === "notStarted" || status === "converted") && (
                <Button onClick={condense}>Condense</Button>
              )}
            </motion.div>
            {status === "converted" && videoFile && (
              <VideoOutput
                timeTaken={time.elapsedSeconds!}
                videoFile={videoFile!}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
