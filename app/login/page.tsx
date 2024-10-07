import { signIn } from "@/auth";
import Form from "./form";

export default function LoginPage() {


    return (
        <>
        
        <div className="flex h-screen flex-1 flex-col justify-center items-center  px-6 py-12 lg:px-8">
          <div className="bg-primary shadow-md rounded-lg p-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Ingresa tu cuenta
              </h2>
            </div>
      
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form></Form>
            </div>
              <div>
                <form className="flex items-center justify-center m-5" action={async () => {
                  "use server"
                  await signIn('google')
                }}
                >
                <button type="submit" className=" p-1 bg-white rounded-lg hover:bg-custom-vanilla text-custom-black hover:text-custom-blue hover:shadow-custom-pale hover:shadow-sm transform transition-transform duration-200 hover:scale-105">
                  <span className="m-8 select-none pointer-events-none">Sign in with Google</span>
                </button>
                </form>
                
            </div>
          </div>
        </div>
      </>
    );
}