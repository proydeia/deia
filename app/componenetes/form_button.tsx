import { useFormStatus } from 'react-dom';
export default function FormButton() {
    
    const { pending } = useFormStatus()
   
    return (
      <button aria-disabled={pending} type="submit" className="bg-secondary rounded-md mb-4 px-4 py-2 w-1/2  hover:bg-custom-vanilla text-custom-black hover:text-custom-blue hover:shadow-custom-pale hover:shadow-sm transform transition-transform duration-200 hover:scale-105">
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    )
  }