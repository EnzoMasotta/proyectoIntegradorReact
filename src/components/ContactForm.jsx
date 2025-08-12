import React, { useState } from "react";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.nombre) errors.nombre = "Requerido";
  if (!values.apellido) errors.apellido = "Requerido";
  if (!values.email) {
    errors.email = "Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }
  if (!values.asunto) errors.asunto = "Requerido";
  return errors;
};

export function ContactForm() {
  const [enviado, setEnviado] = useState(false);

  const formik = useFormik({
    initialValues: { nombre: "", apellido: "", email: "", asunto: "" },
    validate,
    onSubmit: (values, { resetForm }) => {
      setEnviado(true);
      resetForm();
      setTimeout(() => setEnviado(false), 4000);
    },
  });

  return (
    <section className="w-full bg-[#2d6a4f] py-10 px-6">
      <div className="max-w-5xl mx-auto text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Contactános</h2>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="flex flex-wrap gap-6 justify-center"
        >
          {[
            { name: "nombre", label: "Nombre" },
            { name: "apellido", label: "Apellido" },
            { name: "email", label: "Email", type: "email" },
            { name: "asunto", label: "Asunto" },
          ].map(({ name, label, type = "text" }) => (
            <div
              key={name}
              className="flex flex-col flex-[1_1_45%] min-w-[280px]"
            >
              <label htmlFor={name} className="mb-2 font-semibold capitalize">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={`Ingresá tu ${label.toLowerCase()}`}
                className={`rounded-md bg-white px-4 py-3 text-[#2a2a2a] placeholder:text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#ad6771] border ${
                  formik.touched[name] && formik.errors[name]
                    ? "border-[#ad6771]"
                    : "border-transparent"
                }`}
              />
              {formik.touched[name] && formik.errors[name] && (
                <span className="text-[#ad6771] mt-1 text-sm">
                  {formik.errors[name]}
                </span>
              )}
            </div>
          ))}

          <div className="flex justify-center w-full mt-4">
            <button
              type="submit"
              className="bg-[#ad6771] hover:bg-[#8b4f58] text-white font-bold px-10 py-3 rounded-md transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>

        {enviado && (
          <p className="mt-8 text-center text-white font-semibold text-lg">
            ¡Formulario enviado correctamente!
          </p>
        )}
      </div>
    </section>
  );
}
