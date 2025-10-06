import React, { useState, useRef, useEffect } from 'react';
import Typed from "typed.js";
import axios from "axios";
import { motion } from 'framer-motion';
import { Menu, X, Users, CheckCircle } from 'lucide-react';
import { FaInstagram, FaTiktok, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export default function AsiliCampaignSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const el = useRef<HTMLSpanElement | null>(null);
  const [voters, setVoters] = useState<number>(0);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState('');
  const [activeSection, setActiveSection] = useState('candidates');
  const [showHeader, setShowHeader] = useState(true);
  const [count, setCount] = useState(0);
  const [regNumber, setRegNumber] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openArticle, setOpenArticle] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    axios.get("https://lupp.live/api/auth/asili/count").then((res) => {
      setVoters(res.data.count);
    });
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setRegNumber("");
    setName("");

    try {
      const res = await axios.post("https://lupp.live/api/auth/asili/register", {
        regNumber,
        name,
      });
      setMessage(res.data.message);
      setVoters(res.data.count);
      setLoading(false);
      setRegNumber("");
      setName("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error occurred");
      setLoading(false);
    }
  };

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((sec) => {
        const section = sec as HTMLElement; 
        const top = window.scrollY;
        const offset = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (top >= offset && top < offset + height && id) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sticky header on scroll up
  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY) setShowHeader(false);
      else setShowHeader(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

      useEffect(() => {
    // Typed.js effect
    const typed = new Typed(el.current!, {
      strings: [
        "Integrity in Leadership.",
        "Justice in Representation.",
        "Accountability in Governance.",
        "Service to All Students.",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        let start = 0;
        const interval = setInterval(() => {
          start += Math.ceil(voters / 50); // smooth increment
          if (start >= voters) {
            start = voters;
            clearInterval(interval);
          }
          setCount(start);
        }, 20);
        setHasAnimated(true);
      }
    },
    { threshold: 0.5 }
  );

  if (counterRef.current) observer.observe(counterRef.current);

  return () => observer.disconnect();
}, [hasAnimated, voters]);


const articles = [
  {
    id: 1,
    title: "Advancing Student Rights Through Representation",
    excerpt:
      "Our campaign stands for lawful, equitable, and transparent student governance that upholds every learner’s right to fair representation.",
    content:
      "Team Asili envisions a faculty where the principles of representation and due process are not mere ideals but daily practice. We seek to institutionalize student participation in decision-making, ensuring every voice counts in matters that shape our academic and professional futures. Through advocacy, consultation, and policy-oriented leadership, we shall entrench a culture of inclusivity and justice within the Faculty of Law.",
  },
  {
    id: 2,
    title: "Innovation and Leadership Anchored in Justice",
    excerpt:
      "Leadership rooted in service, creativity, and fidelity to the rule of law for a progressive academic community.",
    content:
      "We believe true leadership lies in stewardship guided by integrity and sound judgment. Team Asili seeks to foster a climate of innovation where legal scholarship meets action ,supporting research forums, mentorship programs, and student initiatives that reflect the legal profession’s ethical standards. Together, we shall build a dynamic, informed, and justice-driven student body ready to influence the future of the legal field.",
  },
  {
    id: 3,
    title: "Accountability and Integrity in Student Governance",
    excerpt:
      "Our mission is to restore transparency, fairness, and public trust in student leadership through lawful and ethical conduct.",
    content:
      "Integrity remains the cornerstone of Team Asili’s philosophy. We pledge to uphold accountability mechanisms that ensure every student leader remains answerable to the electorate. Financial disclosures, open forums, and clear communication channels will define our tenure. By anchoring our administration on legal ethics and transparency, we aim to foster governance that mirrors the standards of professional legal practice.",
  },
  {
    id: 4,
    title: "Equity, Inclusion, and the Pursuit of Justice for All",
    excerpt:
      "We are committed to a faculty environment where fairness and inclusivity guide every policy and decision.",
    content:
      "Team Asili recognizes diversity as a legal and moral imperative. We intend to champion equal opportunities across all departments, ensuring that no student is marginalized in matters of representation, welfare, or participation. Guided by the spirit of Article 27 of the Constitution the right to equality and freedom from discrimination our leadership shall embody fairness, impartiality, and unity in purpose for the entire Faculty of Law.",
  },
];

  return (
    <div className="min-h-screen bg-red-50 text-gray-900">
      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 w-full bg-red-700 text-white flex justify-between items-center px-6 py-4 shadow-md z-50 transition-transform duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="University Logo" className="h-10 w-10 rounded-full" />
          <h1 className="font-bold text-xl">Team Asili</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {['candidates', 'vision', 'articles', 'vote'].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={`relative hover:text-yellow-200 transition ${
                activeSection === link ? 'after:w-full text-yellow-200' : ''
              } after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-yellow-200 after:w-0 after:transition-all`}
            >
              {link === 'candidates'
                ? 'Our Candidates'
                : link === 'vision'
                ? 'Our Vision'
                : link === 'articles'
                ? 'Campaign Articles'
                : 'Vote Asili'}
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.header>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white flex flex-col space-y-4 p-4 md:hidden mt-[72px]"
        >
          {['Our Candidates', 'Our Vision', 'Campaign Articles', 'Vote Asili'].map((link, idx) => (
            <a key={idx} href={`#${link.toLowerCase().split(' ')[1]}`} onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
        </motion.nav>
      )}

      {/* Hero Section */}
      <section className="bg-red-600 text-white text-center py-20 px-4 mt-[72px]">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl md:text-5xl font-bold mb-4">
          Together for a Better Law School
        </motion.h2>
        <p className="text-lg md:text-xl">Vote for leadership, integrity, and progress.</p>
      </section>

            {/* Candidates */}
      <section id="candidates" className="py-16 px-6 bg-white text-center">
        <h3 className="text-2xl font-bold mb-10 text-red-700">Our Candidates</h3>
      
        <div className="grid md:grid-cols-3 gap-8">
          {/* Candidate 1: President */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition group"
          >
            <img
              src="/president.jpg"
              alt="President"
              className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 flex flex-col justify-end text-white p-4 bg-gradient-to-t from-black/40 via-transparent">
              <h4 className="font-semibold text-xl">President</h4>
              <p className="text-sm">Visionary leader committed to progress.</p>
            </div>
          </motion.div>
      
          {/* Candidate 2: Vice President */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition group"
          >
            <img
              src="/vp.jpg"
              alt="Vice President"
              className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 flex flex-col justify-end text-white p-4 bg-gradient-to-t from-black/40 via-transparent">
              <h4 className="font-semibold text-xl">Vice President</h4>
              <p className="text-sm">Dedicated to teamwork and excellence.</p>
            </div>
          </motion.div>
      
          {/* Candidate 3: Secretary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition group"
          >
            <img
              src="/sec.jpg"
              alt="Secretary"
              className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 flex flex-col justify-end text-white p-4 bg-gradient-to-t from-black/40 via-transparent">
              <h4 className="font-semibold text-xl">Secretary</h4>
              <p className="text-sm">Organized, transparent, and service-oriented.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values & Trust Section */}
        <section className="py-16 px-6 bg-gray-50 text-center">
      <h3 className="text-3xl font-bold text-red-700 mb-4">Our Core Values</h3>
      <span
        ref={el}
        className="block text-xl md:text-2xl font-semibold text-gray-800 h-10"
      ></span>

      <div
        ref={counterRef}
        className="mt-10 text-center text-gray-800 text-lg font-medium"
      >
        <p>
          <span className="text-5xl font-bold text-red-700">{count.toLocaleString()}</span> <span className="text-5xl font-bold text-black-600">+</span>
          <br />
          Students Trust Team Asili
        </p>
      </div>
    </section>
          
      {/* Vision */}
      <section id="vision" className="bg-red-50 py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-6 text-red-700">Our Vision</h3>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            A united, transparent, and spiritually grounded Faculty of Law, where mentorship is intentional, integrity is non-negotiable, and collaboration is our daily practice.
        </p>
      </section>

      {/* Articles */}
    <section id="articles" className="py-16 px-6 bg-white">
      <h3 className="text-2xl font-bold text-center mb-8 text-red-700">
        Our Stand
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="p-6 border rounded-2xl hover:shadow-md transition bg-white"
          >
            <h4 className="font-bold text-lg mb-2 text-red-700">
              {article.title}
            </h4>
            <p className="text-gray-700 mb-3">{article.excerpt}</p>

            {openArticle === article.id && (
              <p className="text-gray-600 mt-2 border-t pt-3 text-sm">
                {article.content}
              </p>
            )}

            <button
              onClick={() =>
                setOpenArticle(openArticle === article.id ? null : article.id)
              }
              className="text-red-600 hover:underline mt-2 font-medium"
            >
              {openArticle === article.id ? "Show Less" : "Read More"}
            </button>
          </article>
        ))}
      </div>
    </section>

      {/* YouTube Videos */}
      <section className="py-16 px-6 bg-red-50 text-center">
        <h3 className="text-2xl font-bold mb-6 text-red-700">Watch Our Campaign</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {['EWlC0d7efDg', 'TPJ12NxOnlM', 'EWlC0d7efDg'].map((id) => (
            <div key={id} className="aspect-video">
              <iframe
                className="w-full h-full rounded-2xl shadow-md"
                src={`https://www.youtube.com/embed/${id}`}
                title="Campaign Video"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </section>

      {/* Vote Section */}
    <section id="vote" className="py-16 px-6 bg-white text-center">
      <h3 className="text-2xl font-bold mb-6 text-red-700 flex items-center justify-center gap-2">
        <CheckCircle className="text-red-600" /> Vote for Team Asili
      </h3>
      <p className="text-gray-700 mb-6">Join the movement and amplify your voice.</p>

      <form
        onSubmit={handleRegister}
        className="flex flex-col md:flex-row justify-center items-center gap-4"
      >
        <input
          type="text"
          placeholder="Registration Number"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          required
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-red-600 text-white px-6 py-2 rounded-lg transition flex items-center justify-center ${
            loading ? "cursor-not-allowed opacity-70" : "hover:bg-red-700"
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : (
            "Register"
          )}
        </button>
      </form>

      {message && <p className="mt-4 text-gray-700">{message}</p>}

      <div className="mt-6 flex justify-center items-center gap-2 text-lg text-gray-800">
        <Users className="text-red-600" />
        <span>{voters.toLocaleString()} voters registered</span>
      </div>
    </section>

      {/* Footer */}
      <footer className="bg-red-700 text-white py-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-3 text-xl">
          <FaInstagram className="hover:text-yellow-300 cursor-pointer" />
          <FaTiktok className="hover:text-yellow-300 cursor-pointer" />
          <FaFacebook className="hover:text-yellow-300 cursor-pointer" />
          <FaWhatsapp className="hover:text-yellow-300 cursor-pointer" />
        </div>
        <p>© {new Date().getFullYear()} Team Asili | C.U.E.A Elections</p>
      <p>
        Made with love by{" "}
        <a
          href="https://wa.me/254115661943" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-aqua underline hover:text-aqua-200"
        >
          j3ftey
        </a>
      </p>
      </footer>
    </div>
  );
}
