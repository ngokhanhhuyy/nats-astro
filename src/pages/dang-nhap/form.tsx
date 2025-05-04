import React, { useState, useMemo, createContext, useContext } from "react";
import { createSignInModel } from "@/models/signInModels";
import {  
  ModelErrorMessagesStoreContext,
  useModelErrorMessagesStore } from "@/hooks/modelErrorMessagesStoreHook";
import { compute } from "@/utils/computeUtils";

const FieldContext = createContext<{ name: string } | null>({ name: "" });

export default function Form() {
  // Dependencies.
  const modelErrorMessagesStore = useModelErrorMessagesStore();

  // States.
  const [model, setModel] = useState<SignInModel>(() => createSignInModel());

  // Callbacks.
  const handleSubmit = async () => {
    
  }

  // Template.
  return (
    <ModelErrorMessagesStoreContext.Provider value={modelErrorMessagesStore}>
      <form method="POST" className="bg-white p-3 w-100">
        {/* UserName */}
        <Field name="userName" displayName="Tên tài khoản" className="mb-3" floating>
          <Input
            type="text"
            value={model.userName}
            onChange={(event) => {
              setModel(model => ({ ...model, userName: event.target.value }));
            }}
          />
        </Field>

        {/* Password */}
        <Field name="password" displayName="Mật khẩu" className="mb-3" floating>
          <Input
            type="password"
            value={model.userName}
            onChange={(event) => {
              setModel(model => ({ ...model, password: event.target.value }));
            }}
          />
        </Field>

        {/* SubmitButton */}
        <button type="submit" className="btn btn-success">
          Đăng nhập
        </button>
      </form>
    </ModelErrorMessagesStoreContext.Provider>

  );
}

type FieldProps = {
  name: string;
  displayName: string;
  children: React.ReactNode;
  floating?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

function Field(props: FieldProps) {
  // Dependencies.
  const modelErrorMessagesStore = useContext(ModelErrorMessagesStoreContext);

  // Computed.
  const className = compute<string | undefined>(() => {
    const names = [
      props.className,
      (props.floating ?? true) ? "form-floating" : undefined
    ].filter(cn => cn);

    return names.length ? names.join(" ") : undefined;
  });

  // Template.
  return (
    <div className={className}>
      <FieldContext.Provider value={{ name: props.name }}>
        {!props.floating && (
          <label htmlFor={props.name} className="form-label fw-bold small">
            {props.displayName}
          </label>
        )}

        {props.children}

        {props.floating && (
          <label htmlFor={props.name} className="form-label fw-bold small">
            {props.displayName}
          </label>
        )}

        {modelErrorMessagesStore?.hasError(props.name) && (
          <span className="text-danger">
            {modelErrorMessagesStore.getMessage(props.name)}
          </span>
        )}
      </FieldContext.Provider>
    </div>
  )
}

function Input(props: React.ComponentPropsWithoutRef<"input">) {
  // Dependencies.
  const modelErrorMessagesStore = useContext(ModelErrorMessagesStoreContext);
  const fieldContext = useContext(FieldContext);

  // Computed.
  const className = compute<string>(() => {
    return [
      "form-control",
      fieldContext?.name && modelErrorMessagesStore?.getInputClassName(fieldContext.name)
    ].filter(cn => cn).join(" ");
  });

  return <input {...props} className={className} placeholder={props.placeholder ?? ""} />
}