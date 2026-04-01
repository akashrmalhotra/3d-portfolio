import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import WorkPlaceholder from "./WorkPlaceholder";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  placeholderIndex?: number;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [imgError, setImgError] = useState(false);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const showPlaceholder = imgError && props.placeholderIndex !== undefined;

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {showPlaceholder ? (
          <WorkPlaceholder index={props.placeholderIndex!} />
        ) : (
          <img
            src={props.image}
            alt={props.alt}
            onError={() => setImgError(true)}
          />
        )}
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
