import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/utils/convert";
import { RiLoader2Fill } from "react-icons/ri";

export default function VideoProgress({
  progress,
  seconds,
}: {
  progress: number;
  seconds: number;
}) {
  return (
    <div className="mb-2">
      <div className="flex justify-between p-0.5 text-sm gap-2">
        <div className="flex items-center gap-2 mb-2">
          {progress ? <p>Condensing</p> : <p>Loading Video</p>}
          <RiLoader2Fill className="animate-spin w-4 h-4" />
        </div>
        <p>{formatTime(seconds / 1000)}</p>
      </div>
      <Progress value={progress} />
    </div>
  );
}
