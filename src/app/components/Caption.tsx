interface Props {
  text: string;
  className?: string;
}

const Caption = ({ text, className }: Props) => {
  return (
    <h2 className={`text-base text-black font-bold ${className || ""}`}>
      {text && text}{" "}
    </h2>
  );
};

export default Caption;
