import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/home.css";

function Home() {
  const isLoggedIn = !!localStorage.getItem("access");

  const features = [
    {
      title: "🚦 Live Traffic",
      desc: "Real-time traffic monitoring using APIs & WebSockets",
    },
    {
      title: "🚨 Incident Management",
      desc: "Report, track, and resolve traffic incidents",
    },
    {
      title: "📄 Violations & Fines",
      desc: "Manage traffic violations with role-based access",
    },
    {
      title: "🔐 Secure System",
      desc: "JWT authentication with Admin, Officer & User roles",
    },
  ];

  return (
    <div className="home-container">
      {/* HERO */}
      <motion.section
        className="home-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Smart Traffic Management System</h1>
        <p>
          A premium MCA Major Project using
          <strong> React, Django & Cloud</strong>
        </p>

        <motion.div
          className="home-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn primary">
                Login
              </Link>
              <Link to="/register" className="btn outline">
                Register
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn primary">
              Go to Dashboard
            </Link>
          )}
        </motion.div>
      </motion.section>

      {/* FEATURES */}
      <section className="home-features">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <motion.section
        className="home-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Ready to manage smart traffic?</h2>
        <p>Login now and access the dashboard</p>

        {!isLoggedIn && (
          <Link to="/login" className="btn primary">
            Get Started
          </Link>
        )}
      </motion.section>
    </div>
  );
}

export default Home;
