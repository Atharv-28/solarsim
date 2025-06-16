import '../styles/loader.css'
import logo from '../assets/logo_trans.png'

const Loader = () => {
  return (
    <div className='loader-container'>
        {/* logo image which will rotate for loading animation */}
        <img 
            src={logo}
            alt='Loading...'
            className='loader'
        />
        <p>Loading...</p>
        <h2 className='loader-text'>Solar-Sim</h2>
    </div>
  )
}

export default Loader;