import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <div className='container-footer'>
            <div className='container-links'>
                <a  
                    href='https://github.com/germankern' 
                    target='blank'>
                        <img className='icon-footer' 
                            src='/assets/github.png'
                            alt='logo de github' />GitHub
                </a>
                <a  
                    href='https://www.linkedin.com/in/germ%C3%A1n-kern-810830252/' 
                    target='blank'>
                        <img className='icon-footer' 
                            src='/assets/linkedin.png'
                            alt='logo de linkedin' />LinkedIn
                </a>
            </div>
            <h5 className='dev-h5'>Germán Kern Developer</h5>
            <h6>Copyright ©2022 | Todos los derechos reservados |</h6>
        </div>
    )
}

export default Footer