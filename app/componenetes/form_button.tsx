import { useFormStatus } from 'react-dom';
export default function FormButton() {
    
    const { pending } = useFormStatus()
   
    return (
      <button aria-disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    )
  }