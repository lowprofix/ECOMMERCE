interface TextDescriptionProps {
  description: string;
}

const TextDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <div className="flex items-center justify-center h-full w-full text-neutral-700 text-center whitespace-pre-line">
      {description}
    </div>
  );
};

export default TextDescription;
