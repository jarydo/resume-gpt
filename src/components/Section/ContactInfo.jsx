import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Github } from '../../assets/iconmonstr-github-1.svg';
import { ReactComponent as Linkedin } from '../../assets/iconmonstr-linkedin-3.svg';

export const ContactInfo = ({email, number, linkedin, github}) => {
    return (
      <div className="flex justify-around">
        {email && <div className="flex gap-2"><FontAwesomeIcon size="xl" icon={faEnvelope}/>{email}</div>}
        {number && <div className="flex gap-2"><FontAwesomeIcon size="xl" icon={faPhone}/>{number}</div>}
        {linkedin && <div className="flex gap-2"><Linkedin />{linkedin}</div>}
        {github && <div className="flex gap-2"><Github />{github}</div>}
      </div>
    );
}