interface ProgressProps {
  value: number;
  text: string;
}

export default function Progress(props: ProgressProps) {
  return (
    <div className="relative">
      <svg
        className="w-full h-auto"
        height="120"
        width="120"
        viewBox="0 0 120 120"
      >
        <circle
          className="circle-inner"
          r="54"
          cx="60"
          cy="60"
          style={{ strokeDashoffset: `${props.value * 340}` }}
        />
      </svg>
      <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center text-4xl">
        {props.text}
      </div>
    </div>
  );
}
