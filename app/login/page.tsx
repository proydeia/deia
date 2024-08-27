'use client';
import { useFormState } from "react-dom";
import { authenticate } from "../api/authentication";
import FormButton from "../componenetes/form_button";

export default function LoginPage() {

    const [state, formAction] = useFormState(authenticate, undefined);

    return (
        <>
        
        <div className="flex min-h-full flex-1 flex-col justify-center items-center  px-6 py-12 lg:px-8">
          <div className="bg-primary shadow-md rounded-lg p-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Ingresa tu cuenta
              </h2>
            </div>
      
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action={formAction}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Correo Electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="user"
                      name="user"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {state?.errors?.user && <p>{state.errors.user}</p>}
                  </div>
                </div>
      
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Contraseña
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      {state?.errors?.password && <p>{state.errors.password}</p>}
                  </div>
                </div>
                <FormButton/>
                {state?.message && <p className="p-2 text-red rounded-sm border-1 border-red">{state.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </>
    );
}