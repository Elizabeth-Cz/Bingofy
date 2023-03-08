import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="content">
      <h1>Hi there!</h1>
      <p>I'm Liz and I'm a web developer,</p>
      <p>Welcome to my project!</p>
      <section className="contact-cards">
        <article className="contact-card">
          <a href="mailto:liz.cz91@gmail.com">
            <AiOutlineMail />
            <p>Email</p>
          </a>
          liz.cz91@gmail.com
        </article>
        <article className="contact-card">
          <a href="mailto:liz.cz91@gmail.com">
            <AiOutlineMail />
            <p>Email</p>
          </a>
          liz.cz91@gmail.com
        </article>
        <article className="contact-card">
          <FaLinkedin />
          linkedin.com/in/elizabeth-czarny
        </article>
        <article className="contact-card">
          <FaGithubSquare />
          github.com/Elizabeth-Cz
        </article>
      </section>
    </div>
  );
};

export default Contact;
