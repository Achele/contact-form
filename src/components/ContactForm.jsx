import Avatar from "../assets/contact-us.jpeg";
import { useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [emailErr, setEmailErr] = useState(null);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  function isValidEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

  const handleEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setEmailErr("Email is invalid");
    } else {
      setEmailErr("Email is valid");
    }
    setEmail(event.target.value);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const FORM_DETAILS = {
      id: nanoid(),
      name: firstName + " " + lastName,
      email: email,
      message: message,
    };

    axios
      .post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        {
          FORM_DETAILS,
        }
      )
      .then((response) => {
        setError(<p className="success">Form Submitted!</p>);
        console.log("Form submitted");
        console.log(response, response.data);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response, FORM_DETAILS);
          setError(
            <p className="error">There was an error submitting your form</p>
          );
          setLoading(true);
        } else if (error.request) {
          setError(<p className="error">Check network connection</p>);
          setLoading(true);
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };
  return (
    <>
      <div className="contact_hero">
        <h1>GET IN TOUCH</h1>
        <p>let's answer your queries</p>
      </div>

      <div className="form-container">
        <div className="contact-img">
          <img src={Avatar} alt="Contact us Image" />
        </div>
        {error}
        <form action="#" onSubmit={handleSubmit}>
          <label className="label">
            <span className="span">First Name</span>
            <input
              type="text"
              value={firstName}
              required
              onChange={handleFirstName}
            />
          </label>

          <label className="label">
            <span className="span">Last Name</span>
            <input
              type="text"
              value={lastName}
              required
              onChange={handleLastName}
            />
          </label>

          <label className="label">
            <span className="span">Email</span>
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              // className={emailErr.includes("invalid") ? "eRed" : ""}
              required
            />
            {emailErr && (
              <span className={emailErr.includes("invalid") ? "red" : "green"}>
                {emailErr}
              </span>
            )}
          </label>

          {/* <label className="label">
            <span className="span">Subject</span>
            <input type="text" />
          </label> */}

          <label className="label">
            <span className="span">Message</span>
            <textarea
              cols="30"
              rows="10"
              placeholder="leave a message"
              value={message}
              onChange={handleMessage}
              required
            ></textarea>
          </label>

          <input type="submit" value="SUBMIT" className="submit" />
        </form>
      </div>
    </>
  );
};

export default ContactForm;
