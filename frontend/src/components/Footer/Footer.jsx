import { Link } from 'react-router-dom';
import './Footer.css';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <p>&copy; Elizabeth Czarny 2023</p>
      <ul>
        <li>
          <a
            title="My GitHub page"
            href="https://github.com/Elizabeth-Cz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithubSquare />
          </a>
        </li>
        <li>
          <a
            title="My LinkedIn page"
            href="https://www.linkedin.com/in/elizabeth-czarny/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
