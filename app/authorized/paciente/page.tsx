// 'use server'
// import NavbarA from "../Components/NavBar"
// import useMultistepForm from "../MultiStep_form/multistep_form"

// export default function ingresoPaciente() {
//     const { steps, currentStepIndex } = useMultistepForm([
//         <div>One</div>,
//         <div>Two</div>,
//     ])
//     return (
//         <>
//             <NavbarA />
//             <div className="flex justify-center items-center h-screen">
//                 <div className=" w-1/2 h-1/2 bg-primary rounded-lg">
//                     <form>
//                         <div className="absolute top-0 right-0">
//                             {currentStepIndex + 1}/{steps.length}
//                         </div>
//                         {steps}
//                     </form>
//                 </div>

//             </div>
//         </>
//     )
// }