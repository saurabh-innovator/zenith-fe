import axios from 'axios';
import React, { useState } from 'react';
import { useDocTitle } from '../components/CustomHook';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar/NavBar';
// import emailjs from 'emailjs-com';
import Notiflix from 'notiflix';

const Contact = () => {
    useDocTitle('Zenith Techsphere - Send us a message')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([])

    const clearErrors = () => {
        setErrors([])
    }

    const clearInput = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setMessage('')
    }

    const sendEmail = (e) => {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = 'Loading...';
        let fData = new FormData();
        fData.append('first_name', firstName)
        fData.append('last_name', lastName)
        fData.append('email', email)
        fData.append('phone_number', phone)
        fData.append('message', message)

        axios({
            method: "post",
            url: process.env.REACT_APP_CONTACT_API,
            data: fData,
            headers: {
                'Content-Type':  'multipart/form-data'
            }
        })
        .then(function (response) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            clearInput()
            //handle success
            Notiflix.Report.success(
                'Success',
                response.data.message,
                'Okay',
            );
        })
        .catch(function (error) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            //handle error
            const { response } = error;
            if(response.status === 500) {
                Notiflix.Report.failure(
                    'An error occurred',
                    response.data.message,
                    'Okay',
                );
            }
            if(response.data.errors !== null) {
                setErrors(response.data.errors)
            }
            
        });
    }
    return (
      <>
        <div>
          <NavBar />
        </div>
        <div
          id="contact"
          className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24 "
        >
          <div
            className="container mx-auto my-8 px-4 lg:px-20"
            data-aos="zoom-in"
          >
            <form
              onSubmit={sendEmail}
              class="flex flex-col lg:flex-row lg:space-x-8"
            >
              {/* <!-- Form Container --> */}
              <div class="w-full lg:w-9/12 bg-white p-8 my-4 md:px-12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                <div class="flex mb-6">
                  <h1 class="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">
                    Send us a message
                  </h1>
                </div>

                {/* <!-- Grid for Input Fields --> */}
                <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                  <div>
                    <input
                      name="first_name"
                      class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="First Name*"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyUp={clearErrors}
                    />
                    {errors && (
                      <p class="text-red-500 text-sm">{errors.first_name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      name="last_name"
                      class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Last Name*"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyUp={clearErrors}
                    />
                    {errors && (
                      <p class="text-red-500 text-sm">{errors.last_name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      name="email"
                      class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Email*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyUp={clearErrors}
                    />
                    {errors && (
                      <p class="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      name="phone_number"
                      class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Phone*"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyUp={clearErrors}
                    />
                    {errors && (
                      <p class="text-red-500 text-sm">{errors.phone_number}</p>
                    )}
                  </div>
                </div>

                {/* <!-- Message Textarea --> */}
                <div class="my-4">
                  <textarea
                    name="message"
                    placeholder="Message*"
                    class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={clearErrors}
                  ></textarea>
                  {errors && (
                    <p class="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>

                {/* <!-- Submit Button --> */}
                <div class="my-2 w-full lg:w-1/2">
                  <button
                    type="submit"
                    id="submitBtn"
                    class="uppercase text-sm font-bold tracking-wide bg-blue-900 hover:bg-blue-700 text-white p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                  >
                    Send Message
                  </button>
                </div>
              </div>

              {/* <!-- Contact Information Sidebar --> */}
              <div class="w-full lg:w-2/6 px-6 py-6 lg:px-8 lg:py-10 mt-8 lg:mt-0 bg-blue-900 rounded-2xl text-white flex flex-col space-y-4">
                <div class="flex items-start space-x-4">
                  <i class="fas fa-map-marker-alt pt-2"></i>
                  <div>
                    <h2 class="text-xl font-semibold">Office Address</h2>
                    <p class="text-gray-400">
                      Survey No. 64, Building Number 9, 13th Floor, Madhapur,
                      Hyderabad, Telangana 500081
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <i class="fas fa-phone-alt pt-2"></i>
                  <div>
                    {/* <p class="text-gray-400">Tel: 08055384406</p> */}
                    <h2 class="mt-2 text-xl font-semibold">Send an E-mail</h2>
                    <p class="text-gray-400">info@zenith-techsphere.com</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                    <div class="px-4">
                <h2 class="text-xl font-semibold">Also Connnect Us on</h2>
                    {/* <!-- Social Media Links --> */}
                    <div class="flex space-x-4">
                      {/* <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer" class="rounded-full bg-white text-blue-900 p-2 hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
            </a> */}
                      <a
                        href="https://www.linkedin.com/company/enlighteneering-inc-"
                        target="_blank"
                        rel="noreferrer"
                        class="rounded-full bg-white text-blue-900 hover:bg-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          class="fill-current"
                        >
                          <circle cx="4.983" cy="5.009" r="2.188"></circle>
                          <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path>
                        </svg>
                      </a>
                    </div>
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Contact;