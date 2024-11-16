import { Button } from "@/components/ui/button";
import { calculateBlobSize } from "@/utils/bytesToSize";
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

  const outputFileSize = calculateBlobSize(videoFile.outputBlob)

  return (
    <motion.div>
      <div>
        <div>
          <p>Output File</p>
          <HiBadgeCheck />
          <Button>Download</Button>
        </div>
        <div>
          <p>New File Size</p>
          <p>{}</p>
        </div>
      </div>
    </motion.div>
  );
}
