const FormLink = ({ text, actionText, onActionClick }) => (
  <div className="w-full flex items-center justify-center gap-1">
    <p className="text-gray-500 font-semibold">{text}</p>
    <span
      className="text-blue-500 font-semibold cursor-pointer"
      onClick={onActionClick}
    >
      {actionText}
    </span>
  </div>
);

export default FormLink;
