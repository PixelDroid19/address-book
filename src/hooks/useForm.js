import { useState } from "react";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useForm(initialForm);
  const [errors, setErrors] = useForm([]);
  const [loading, setLoandig] = useForm(initialForm);
  const [reponse, setResponse] = useForm(initialForm);

  const HandleChange = (e) => {};

  const HandleBlur = (e) => {};

  const HandleSubmit = (e) => {};

  return {
    form,
    errors,
    loading,
    reponse,
    HandleBlur,
    HandleChange,
    HandleSubmit,
  };
};
