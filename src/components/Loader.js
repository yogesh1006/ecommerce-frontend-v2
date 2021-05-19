import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      variant="success"
      role='status'
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader