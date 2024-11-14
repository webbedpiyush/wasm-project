import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { QualityType, VideoFormats, VideoInputSettings } from "@/utils/types";
import { motion } from "framer-motion";

interface VideoInputProps {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disable: boolean;
}

export default function VideoInput({
  videoSettings,
  onVideoSettingsChange,
  disable,
}: VideoInputProps) {
  return (
    <motion.div className="rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200">
      <div className="text-sm flex justify-between items-center border-b mb-2 pb-2">
        <p>Remove Audio</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({ ...videoSettings, removeAudio: value })
          }
          checked={videoSettings.removeAudio}
        />
      </div>
      <div className="flex justify-between items-center border-b mb-2 pb-2 text-sm">
        <p>Condense for Twitter</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({
              ...videoSettings,
              twitterCompressionCommand: value,
            })
          }
          checked={videoSettings.twitterCompressionCommand}
        />
      </div>
      <div className="flex justify-between items-center border-b mb-2 pb-2 text-sm">
        <p>Condense for Whatsapp Status</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({
              ...videoSettings,
              whatsappStatusCompressionCommand: value,
            })
          }
          checked={videoSettings.whatsappStatusCompressionCommand}
        />
      </div>
      {!videoSettings.whatsappStatusCompressionCommand &&
        !videoSettings.twitterCompressionCommand && (
          <>
            <div className="flex justify-between items-center border-b mb-2 pb-2 text-sm">
              <p>Quality</p>
              <Select
                disabled={disable}
                value={videoSettings.quality}
                onValueChange={(value: string) => {
                  const quality = value as QualityType;
                  onVideoSettingsChange({ ...videoSettings, quality });
                }}
              >
                <SelectTrigger className="w-[100px] text-sm">
                  <SelectValue placeholder="Select Quality" />
                </SelectTrigger>
                <SelectContent>
                  {quality.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center border-b mb-2 pb-2 text-sm">
              <p>Format</p>
              <Select
                disabled={disable}
                value={videoSettings.videoType}
                onValueChange={(value: string) => {
                  const videoType = value as VideoFormats;
                  onVideoSettingsChange({ ...videoSettings,videoType });
                }}
              >
                <SelectTrigger className="w-[150px] text-sm">
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  {format.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
    </motion.div>
  );
}

const quality: { label: string; value: QualityType }[] = [
  { label: "High", value: QualityType.High },
  { label: "Medium", value: QualityType.Medium },
  { label: "Low", value: QualityType.Low },
];

const format: { label: string; value: VideoFormats }[] = [
  { label: "MP4 (.mp4)", value: VideoFormats.MP4 },
  { label: "MOV (.mov)", value: VideoFormats.MOV },
  { label: "AVI (.avi)", value: VideoFormats.AVI },
  { label: "FLV (.flv)", value: VideoFormats.FLV },
  { label: "WEBM (.webm)", value: VideoFormats.WEBM },
  { label: "MKV (.mkv)", value: VideoFormats.MKV },
];
