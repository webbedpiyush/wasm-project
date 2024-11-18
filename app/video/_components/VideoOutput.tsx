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
  const outputFileSize = calculateBlobSize(videoFile.outputBlob);
  const { sizeReduced, percentage } = reduceSize(
    videoFile.fileSize,
    videoFile.outputBlob
  );

  const download = () => {
    if (videoFile.url) return;

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
        <div>
          <p>Output File</p>
          <HiBadgeCheck />
          <Button onClick={download}>Download</Button>
        </div>
        <div>
          <p>New File Size</p>
          <p>{outputFileSize}</p>
        </div>
        <div>
          <p>Size Reduced %</p>
          <p>{percentage}</p>
        </div>
        <div>
          <p>Original file size</p>
          <p>{bytesToSize(videoFile.fileSize)}</p>
        </div>
        <div>
          <p>Size Reduced</p>
          <p>{sizeReduced}</p>
        </div>
        <div>
          <p>Time taken</p>
          <p>{timeTaken ? formatTime(timeTaken / 1000) : "-"}</p>
        </div>
      </div>
    </motion.div>
  );
}
