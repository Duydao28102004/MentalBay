
import MoodTracker from '../components/MoodTracker';
import { useSession } from '../components/IsLoggedIn';
import { useCheckAuth } from '../components/checkauth';
import DoctorIncomingMess from '../components/DoctorIncomingMess';


import React, { useEffect} from 'react';
import DoctorButton from '../components/DoctorButton';
import ArticleComponent from '../components/ArticleComponent';
import PodcastComponent from '../components/PodcastComponent';

import mentalHealthBanner from '../assets/home-banner.png';
import mentalHealthBanner2 from '../assets/home-banner2.png';
import academicIcon from '../assets/academic-icon.png';
import chatbotIcon from '../assets/chatbot-icon.png';
import doctorIcon from '../assets/doctor-icon.png';
import consultationIcon from '../assets/consultation-icon.png';
import nurseIcon from '../assets/nurse-icon.png';
import phonecallIcon from '../assets/phonecall-icon.png';
import ideaIcon from '../assets/idea-icon.png';


const Home = () => {
  const {userData} = useSession();


  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  return (
    <>
    <div className="p-4 w-full md:w-3/4 mx-auto">
      
      {userData.userType === 'doctor' ? (
        <>
        
        <div className="md:w-3/4 w-full flex items-center align-center mb-10">
          <DoctorButton />
        </div>
        <div className='flex flex-col mx-auto w-5/6 md:w-full md:flex-row'>
          <ArticleComponent></ArticleComponent>
          <div className='flex flex-col w-full mx-auto md:w-1/4'>
            <DoctorIncomingMess />
            <PodcastComponent></PodcastComponent>
          </div>
        </div>
        </>
      ) : (
        <>
        <div className="md:flex items-center justify-between mb-10">
        <div className="text-center mb-4 md:w-1/2">
          <h1 className="text-4xl font-bold">Empowering <span className='text-pink-500'>Minds</span>, <span className='text-green-500'>Anytime</span>, <span className='text-blue-500'>Anywhere</span>: Your Path to Premier Mental Health Services.</h1>

        </div>
        <img src={mentalHealthBanner} alt="Mental Health Banner" className="md:w-1/2 rounded" />
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-100 p-4 rounded">
          <img src={academicIcon} alt='academic icon' className='w-10'></img>
          <h2 className='font-bold text-2xl mb-4'>Academic resources</h2>
          <p>Explore our curated collection of academic resources on mental health, providing insightful perspectives and evidence-based insights to enhance your understanding and promote well-informed discussions.</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
        <img src={chatbotIcon} alt='chatbot icon' className='w-10'></img>
          <h2 className='font-bold text-2xl mb-4'>Chatbot</h2>
          <p>Engage in personalized and confidential conversations with our mental health chatbot, designed to provide support, information, and guidance. </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <img src={doctorIcon} alt='doctor icon' className='w-10'></img>
          <h2 className='font-bold text-2xl mb-4'>Chat with our doctors</h2>
          <p>Connect with licensed professionals through our "Chat with Our Doctor" feature, ensuring confidential and expert guidance for your mental health concerns. </p>
        </div>
      </div>
        <MoodTracker />
        <ArticleComponent></ArticleComponent>
        <PodcastComponent></PodcastComponent>
        <div className="flex flex-wrap justify-center items-cente w-full mx-auto mb-10">
      <div className="w-full md:w-1/2 bg-gray-200 text-white p-8">
        <h2 className="text-2xl text-blue-300 font-bold mb-4 mt-20">WHY CHOOSE US</h2>
        <p className="text-4xl font-bold mb-4 text-black">
          Where Compassion Meets Innovation for a Healthier Mind
        </p>
        <p className="mb-4 text-black">
        Choose us for your mental health journey because we prioritize your well-being, offering personalized support from licensed professionals. Our platform provides a confidential and empathetic space, ensuring your comfort and fostering a positive environment for growth.
        </p>
        <ul className="list-disc mb-4">
          <div className="mb-2 flex items-center">
            <div className='w-16 h-16 my-2 bg-green-700 rounded-full flex items-center justify-center'>
              <img src={consultationIcon} alt="consultaionicon" className="w-10"></img>
            </div>
            <span className="text-lg text-green-700 font-bold ml-2">Satisfied Patient Services</span>
          </div>
          <div className="mb-2 flex items-center">
            <div className='w-16 h-16 my-2 bg-green-700 rounded-full flex items-center justify-center'>
              <img src={phonecallIcon} alt="phonecallicon" className="w-10"></img>
            </div>
            <span className="text-lg text-green-700 font-bold ml-2">Support Customer Manager</span>
          </div>
          <div className="mb-2 flex items-center">
            <div className='w-16 h-16 my-2 bg-green-700 rounded-full flex items-center justify-center'>
              <img src={nurseIcon} alt="nurseicon" className="w-10"></img>
            </div>
            <span className="text-lg text-green-700 font-bold ml-2">Dedicated & Expert Doctors</span>
          </div>
          <div className="mb-2 flex items-center">
            <div className='w-16 h-16 my-2 bg-green-700 rounded-full flex items-center justify-center'>
              <img src={ideaIcon} alt="ideaicon" className="w-10"></img>
            </div>
            <span className="text-lg text-green-700 font-bold ml-2">Regularly Patients Inspection</span>
          </div>
        </ul>
      </div>
      <div className="w-full md:w-1/2">
        <img
          src={mentalHealthBanner2}
          alt="Doctor holding clipboard and pen while interacting with patient"
          className="w-full"
        />
      </div>
    </div>
        </>
      )}
    </div>
    </>
  );
};


export default Home;