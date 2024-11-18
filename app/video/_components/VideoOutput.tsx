import { Button } from "@/components/ui/button";
import {
  bytesToSize,
  calculateBlobSize,
  reduceSize,
} from "@/utils/bytesToSize";
import { formatTime } from "@/utils/convert";
import { FileActions } from "@/utils/types";
import { motion } from "framer-motion";
import { HiBadgeCheck } from "react-icons/hi";

export default function VideoOutput({
  videoFile,
  timeTaken,
}: {
  videoFile: FileActions;
  timeTaken: number;
}) {
  const outputFileSize = calculateBlobSize(videoFile?.outputBlob);
  const { sizeReduced, percentage } = reduceSize(
    videoFile?.fileSize,
    videoFile?.outputBlob
  );

  const download = () => {
    if (!videoFile.url) return;

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = videoFile.url!;
    a.download = videoFile.output;
    document.body.appendChild(a);
    sizeReduced;
    a.click();
    URL.revokeObjectURL(videoFile.url!);
    document.body.removeChild(a);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      key={"output"}
      transition={{ type: "tween" }}
      className="bg-gray-100 dark:bg-black border-gray-200 rounded-2xl p-3 h-fit"
    >
      <div className="text-sm">
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <div className="flex items-center gap-1">
            <p>Output File</p>
            <HiBadgeCheck />
          </div>
          <Button onClick={download}>Download</Button>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">New File Size</p>
          <p className="font-semibold">{outputFileSize}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">Size Reduced %</p>
          <p className="font-semibold">{percentage}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">Original file size</p>
          <p className="font-semibold">{bytesToSize(videoFile?.fileSize)}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">Size Reduced</p>
          <p className="font-semibold">{sizeReduced}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">Time taken</p>
          <p className="font-semibold">{timeTaken ? formatTime(timeTaken / 1000) : "-"}</p>
        </div>
      </div>
    </motion.div>
  );
}
