import { useEffect, useState } from "react";
import type { JSX } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../generics/button/Button";
import Link from "next/link";

interface Field {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  showVerifyButton?: boolean;
  onVerifyClick?: () => void;
  isVerifying?: boolean;
  min?: number;
  max?: number;
  render?: (props: { field: UseFormRegisterReturn }) => JSX.Element;
  disabled?: boolean;
}

interface BaseFormProps<T = any> {
  fields: Field[];
  schema: import("zod").ZodSchema<T>;
  submitText?: string;
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: Partial<T>;
  isSuccess?: boolean;
  successMessage?: string;
  resetOnSuccess?: boolean;
  formMethods?: ReturnType<typeof useForm<any>>;
  showTermsCheckbox?: boolean;
}

export default function BaseForm<T = any>({
  fields,
  schema,
  submitText = "Submit",
  onSubmit,
  defaultValues = {},
  isSuccess = false,
  successMessage,
  resetOnSuccess,
  showTermsCheckbox = true,
}: BaseFormProps<T>): JSX.Element {
  const { register, handleSubmit, watch, setValue, reset } = useForm<any>({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  useEffect(() => {
    for (const key in defaultValues) {
      setValue(
        key as any,
        defaultValues[key]!
      );
    }
  }, [defaultValues, setValue]);

  useEffect(() => {
    if (resetOnSuccess && isSuccess) {
      const currentChecked = isChecked;
      setIsChecked(currentChecked);
      reset();
    }
  }, [isSuccess, resetOnSuccess, reset, isChecked]);

  const internalSubmit = async (data: T) => {
    if (showTermsCheckbox && !isChecked) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await onSubmit(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(internalSubmit)}
      className="space-y-4 w-full max-w-md mx-auto"
    >
      {fields.map(
        ({
          name,
          label,
          type = "text",
          defaultValue,
          min,
          max,
          showVerifyButton,
          onVerifyClick,
          isVerifying,
          render,
          disabled,
        }) => {
          const value = watch(name as any);
          const isFilled = value?.toString().length > 0;
          const fieldProps = register(
            name as any
          );

          if (type === "hidden") {
            return (
              <input
                key={name}
                {...fieldProps}
                type="hidden"
                defaultValue={defaultValue}
              />
            );
          }

          return (
            <div
              key={name}
              className="relative w-full h-[40px]"
              onClick={(e) => {
                if (disabled) {
                  e.preventDefault();
                  alert("You can't change verified email");
                }
              }}
            >
              {render ? (
                render({ field: fieldProps })
              ) : (
                <>
                  <input
                    {...fieldProps}
                    type={showPassword[name] ? "text" : type}
                    id={name}
                    defaultValue={defaultValue}
                    min={min}
                    max={max}
                    disabled={disabled}
                    className={`peer w-full h-full px-4 px-3 border ${
                      disabled
                        ? "border-green-400 text-gray-400 bg-[#1E1E1E]"
                        : "border-white"
                    } rounded-[3px] text-[#E5E5E5] text-base placeholder-transparent`}
                  />
                  <label
                    htmlFor={name}
                    className={`absolute left-4 text-[#E5E5E5] text-sm transition-all duration-150 pointer-events-none
                    ${
                      isFilled
                        ? "-top-2 text-xs bg-[#1E1E1E] rounded-xs px-1"
                        : "top-1/2 -translate-y-1/2"
                    }
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-[#1E1E1E] peer-focus:px-1 peer-focus:translate-y-0`}
                  >
                    {label}
                  </label>
                </>
              )}

              {disabled && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-xs">
                  Verified
                </span>
              )}

              {type === "password" && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      [name]: !prev[name],
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm"
                >
                  {showPassword[name] ? "🙈" : "👁️"}
                </button>
              )}

              {showVerifyButton && (
                <div className="absolute bottom-1 -right-29">
                  <Button
                    type="button"
                    onClick={onVerifyClick}
                    className="text-xs font-semibold text-white px-4 py-2 bg-orange-500 rounded-full transition-colors cursor-none"
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Sending..." : "Verify email"}
                  </Button>
                </div>
              )}
            </div>
          );
        }
      )}

      {showTermsCheckbox && (
        <div className="flex items-start space-x-2 pt-3">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-[16px] h-[16px] cursor-pointer accent-[#F2890F] mt-1"
          />
          <label
            htmlFor="terms"
            className="text-[#E5E5E5] text-sm font-medium leading-[144%]"
          >
            I agree with the{" "}
            <Link href="/privacy-policy" className="underline">
              personal data processing policy
            </Link>{" "}
            and{" "}
            <Link href="/user-agreement" className="underline">
              user agreement
            </Link>
          </label>
        </div>
      )}

      <Button
        type="submit"
        className={`w-[219px] h-[47px] p-3 mt-5 rounded-[47px] font-extrabold text-sm leading-[0.42px] mx-auto block ${
          (!showTermsCheckbox || isChecked) && !isSuccess
            ? "bg-[#F28A0F] text-white cursor-none"
            : "bg-[#B8B8B8] text-white cursor-none"
        }`}
        disabled={(showTermsCheckbox && !isChecked) || isSuccess}
      >
        {isLoading ? "Submitting..." : submitText}
      </Button>

      {errorMessage && (
        <p className="text-red-500 text-xs mt-2 text-center">{errorMessage}</p>
      )}
      {successMessage && isSuccess && (
        <p className="text-green-500 text-xs mt-2 text-center">
          {successMessage}
        </p>
      )}
    </form>
  );
}

