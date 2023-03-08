import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="content">
      <h1>Hi there!</h1>
      <p>
        I'm Liz and I'm a web developer, I'm passionate about front end web
        development and design.
      </p>
      <p>Stay in touch!</p>
      <section className="contact-cards">
        <article className="contact-card">
          <a href="mailto:liz.cz91@gmail.com">
            <AiOutlineMail size={'2rem'} />
          </a>
          <p>Email Address</p>
          <p>liz.cz91@gmail.com</p>
        </article>
        <article className="contact-card">
          <a href="tel:+33744530109">
            <AiFillPhone size={'2rem'} />
          </a>
          <p>Phone Number</p>
          <p>+33 0744530109</p>
        </article>
        <article className="contact-card">
          <a
            href="https://linkedin.com/in/elizabeth-czarny"
            rel="noreferrer"
            target="_blank"
          >
            <FaLinkedin size={'2rem'} />
          </a>
          <p>LinkedIn</p>
        </article>
        <article className="contact-card">
          <a
            href="https://github.com/Elizabeth-Cz"
            rel="noreferrer"
            target="_blank"
          >
            <FaGithubSquare size={'2rem'} />
          </a>
          <p>GitHub</p>
        </article>
      </section>
    </div>
  );
};

export default Contact;
