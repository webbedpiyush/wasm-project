import { Button } from "@/components/ui/button";
import { bytesToSize } from "@/utils/bytesToSize";
import { FileActions } from "@/utils/types";
import { motion } from "framer-motion";

export default function VideoDetails({
  videoFile,
  onClear,
}: {
  videoFile: FileActions;
  onClear: () => void;
}) {
  return (
    <motion.div className="rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200">
      <div className="flex justify-between items-center border-b mb-2 pb-2 text-sm">
        <p>Title : File Input</p>
        <Button>Clear</Button>
      </div>
      <p className="border-b mb-2 pb-2">{videoFile?.fileName}</p>
      <div className="flex justify-between items-center">
        <p>File Size</p>
        <p>{bytesToSize(videoFile.fileSize)}</p>
      </div>
    </motion.div>
  );
}
