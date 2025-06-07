const InputField = ({
  register,
  label,
  type = "text",
  name,
  error,
  trigger,
}) => (
  <div className="text-start w-full mb-3">
    <label htmlFor="username" className="text-black text-sm font-semibold">
      {label}
    </label>
    <input
      placeholder={name}
      id="username"
      {...register(name)}
      onBlur={() => trigger(name)}
      type={type}
      className={`${
        error ? "border-red-400" : "border-gray-300"
      } border bg-blue-100 text-input-text w-full p-2 rounded-md mt-2 focus:outline-none`}
    />
    {error && (
      <p className="mt-1 text-red-400 text-xs tracking-wide">{error}</p>
    )}
  </div>
);

export default InputField;
