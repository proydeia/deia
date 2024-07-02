// import { getPatient } from "@/app/api/patient";
// import { useRouter, useSearchParams } from "next/navigation"; // Import both useRouter and useSearchParams

// type typeProps = {
//   patient: Patient; // Replace with your patient data structure
// };

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { id } = context.params;
//   const patient = await getPatient(id); // Fetch patient data on the server

//   return {
//     props: { patient }, // Pass patient data as props to Id_paciente
//   };
// }

// export default function Id_paciente({ patient }: typeProps) {
//   const router = useRouter();
//   const [searchParams, setSearchParams] = useSearchParams(); // Use useSearchParams to handle any query parameters

//   // Conditionally render the route only on the client-side using useEffect
//   useEffect(() => {
//     if (router.isReady) {
//       const route = router.asPath;
//       const currentSearchParams = searchParams.toString(); // Get current query parameters as a string if needed

//       // Use the route and searchParams (if applicable) here
//       console.log(`Route: ${route}`); // Example usage
//       console.log(`Current search parameters: ${currentSearchParams}`); // Example usage
//     }
//   }, [router.isReady]);

//   return (
//     <div>
//       {/* Display patient data */}
//     </div>
//   );
// }
