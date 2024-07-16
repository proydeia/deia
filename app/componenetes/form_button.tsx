import { useFormStatus } from 'react-dom';
export default function FormButton() {
    
    const { pending } = useFormStatus()
   
    return (
      <button aria-disabled={pending} type="submit" className="bg-secondary rounded-md mb-4 px-4 py-2 w-1/2">
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    )
  }