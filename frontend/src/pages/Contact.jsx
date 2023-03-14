import { AiFillPhone, AiFillMail } from 'react-icons/ai';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="content">
      <h1>Hi there!</h1>
      <p>I'm Liz and I'm a web developer,</p>
      <p>Welcome to my project!</p>
      <section className="contact-cards">
        <article className="contact-card">
          <AiFillMail />
          <p>Email Address</p>
          <p>liz.cz91@gmail.com</p>
        </article>
        <article className="contact-card">
          <AiFillPhone />
          <p>Phone Number</p>
          liz.cz91@gmail.com
        </article>
        <article className="contact-card">
          <FaLinkedin />
          <a
            href="https://linkedin.com/in/elizabeth-czarny"
            rel="noreferrer"
            target={'_blank'}
          >
            LinkedIn Profile
          </a>
        </article>
        <article className="contact-card">
          <FaGithubSquare />
          <a
            href="https://github.com/Elizabeth-Cz"
            rel="noreferrer"
            target={'_blank'}
          >
            GitHub Page
          </a>
        </article>
      </section>
    </div>
  );
};

export default Contact;
