import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

const footerStyles = {
  marginTop: '1rem',
  padding: '1rem',
  /* background-color: rgb(235, 195, 64); */
  textAlign: 'center',
  // position: 'fixed',
  bottom: '0',
  left: '0',
  width: '96%',
}

const CommonLink = ({ link, title, icon }) => (
  <a
    target="__blank
    "
    href={link}
    style={{ textDecoration: 'none', color: 'black' }}
  >
    {title && title}
    {icon && icon}
  </a>
)

const Socials = ({ size, color }) => (
  <React.Fragment>
    <CommonLink
      link="https://github.com/pratham82"
      icon={<FontAwesomeIcon icon={faGithub} size={size} color={color} />}
    />
    &nbsp; &nbsp;
    <CommonLink
      link="https://www.linkedin.com/in/prathameshmali/"
      icon={<FontAwesomeIcon icon={faLinkedin} size={size} color={color} />}
    />
    &nbsp; &nbsp;
    <CommonLink
      link="https://twitter.com/Pratham_82"
      icon={<FontAwesomeIcon icon={faTwitter} size={size} color={color} />}
    />
  </React.Fragment>
)

const CustomFooter = ({ size, color, author, url }) => (
  <div style={footerStyles}>
    <span style={{ color: color }}>
      created with ❤️ by &nbsp;
      <a href={url} style={{ color: color }}>
        {author}
      </a>
    </span>
    <br />
    <br />
    <Socials color={color} size={size} />
  </div>
)

export default CustomFooter
