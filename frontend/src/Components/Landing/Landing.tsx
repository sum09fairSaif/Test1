import "./Landing.css";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import mainLogo from "../Assets/connecther-logo.png";
import textLogo from "../Assets/text-logo.png";
import heroImage from "../Assets/doctor-consultation.png";
import womanYoga from "../Assets/woman-yoga.png";

function Landing() {
  const { user, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navWrapRef = useRef<HTMLDivElement | null>(null);
  const missionSectionRef = useRef<HTMLElement | null>(null);
  const missionLiftRef = useRef(0);
  const prevScrollRef = useRef(0);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const transitionRef = useRef<HTMLElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const displayName = user?.name || "Guest";
    document.title = `ConnectHER - Welcome, ${displayName}`;

    const rates = {
      bg: 0.2,
      about: 0.14,
      transition: 0.45,
      heroCard: 0.16,
      heroImage: 0.32,
    };

    const onScroll = () => {
      const scrollDistance = window.scrollY;
      const scrollDelta = scrollDistance - prevScrollRef.current;
      prevScrollRef.current = scrollDistance;
      const progress = Math.min(scrollDistance / 700, 1);
      document.documentElement.style.setProperty(
        "--parallax-y",
        `${scrollDistance * rates.bg}px`,
      );
      document.documentElement.style.setProperty(
        "--parallax-progress",
        `${progress}`,
      );

      if (aboutRef.current) {
        aboutRef.current.style.transform = `translateY(${
          scrollDistance * -rates.about
        }px)`;
        aboutRef.current.style.opacity = `${Math.max(0.42, 1 - progress * 0.48)}`;
      }

      if (missionSectionRef.current) {
        const section = missionSectionRef.current;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight || 1;
        const inSectionBand =
          scrollDistance + window.innerHeight > sectionTop &&
          scrollDistance < sectionTop + sectionHeight;

        const sectionProgress = Math.max(
          0,
          Math.min(1, (scrollDistance - sectionTop) / sectionHeight),
        );
        const baseShift = sectionProgress * 320;

        if (inSectionBand) {
          if (scrollDelta < 0) {
            missionLiftRef.current = Math.min(
              90,
              missionLiftRef.current + Math.abs(scrollDelta) * 0.45,
            );
          } else if (scrollDelta > 0) {
            missionLiftRef.current = Math.max(
              0,
              missionLiftRef.current - scrollDelta * 0.25,
            );
          }
        } else {
          missionLiftRef.current = Math.max(0, missionLiftRef.current - 4);
        }

        missionSectionRef.current.style.setProperty(
          "--mission-shift",
          `${Math.min(500, baseShift + missionLiftRef.current)}px`,
        );
      }

      if (transitionRef.current) {
        transitionRef.current.style.transform = `translateY(${
          scrollDistance * rates.transition
        }px)`;
      }

      if (heroCardRef.current) {
        heroCardRef.current.style.transform = `translateY(${Math.max(
          0,
          70 - scrollDistance * rates.heroCard,
        )}px)`;
      }

      if (heroImageRef.current) {
        heroImageRef.current.style.transform = `translateY(${Math.max(
          0,
          100 - scrollDistance * rates.heroImage,
        )}px)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [user?.name]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!menuOpen) return;
      if (!navWrapRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const section = missionSectionRef.current;
    if (!section) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const offsetX =
        (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const offsetY =
        (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      section.style.setProperty("--mission-pointer-x", `${offsetX * 16}px`);
      section.style.setProperty("--mission-pointer-y", `${offsetY * 20}px`);
    };

    const onPointerLeave = () => {
      section.style.setProperty("--mission-pointer-x", "0px");
      section.style.setProperty("--mission-pointer-y", "0px");
    };

    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="landing-root">
      <div className="parallax-bg" aria-hidden="true" />

      <header>
        <h1 className="logo">
          <img src={mainLogo} alt="" className="logo-img logo-main" />
          <img src={textLogo} alt="ConnectHER" className="logo-img logo-text" />
        </h1>
        <div className="container" ref={navWrapRef}>
          <button
            type="button"
            className="hamburger"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={menuOpen ? "nav open" : "nav"}>
            <ul className="nav-links">
              <li>
                <Link
                  to={isAuthenticated ? "/your-profile" : "/login"}
                  onClick={() => setMenuOpen(false)}
                >
                  {isAuthenticated ? "Logged In" : "Login"}
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/your-profile"
                  onClick={() => setMenuOpen(false)}
                >
                  Your Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="about" className="about-section" ref={missionSectionRef}>
        <div className="container about-shell" ref={aboutRef}>
          <article className="about-card">
            <div className="about-media" aria-hidden="true">
              <img src={womanYoga} alt="" className="about-media-image" />
            </div>
            <div className="about-content">
              <p className="about-eyebrow">Our Mission</p>
              <h3>
                ConnectHer empowers women with accessible healthcare guidance,
                trusted resources, and faster paths to care.
              </h3>
              <p className="about-body">
                We built this platform to reduce uncertainty, improve health
                literacy, and help every user move from symptoms to informed
                care decisions with confidence.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section
        className="parallax-transition"
        aria-hidden="true"
        ref={transitionRef}
      >
        <div className="transition-shape transition-shape-a" />
        <div className="transition-shape transition-shape-b" />
      </section>

      <section id="hero">
        <div className="container" ref={heroCardRef}>
          <div className="hero-layout">
            <div className="hero-content">
              <h2>Accessible Women's Healthcare, Anytime</h2>
              <h3>Understand your symptoms. Find the right care.</h3>
              <div className="hero-actions">
                <Link to="/symptom-checker" className="service-button">
                  Symptom Checker
                </Link>
                <Link to="/find-a-provider" className="service-button">
                  Find a Provider
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src={heroImage}
                alt="Doctor consultation illustration"
                className="hero-image"
                ref={heroImageRef}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="spacer" aria-hidden="true" />

      <div className="footer-container">
        <ul className="important-info">
          <li>
            <strong>Disclaimer:</strong> ConnectHER is an informational tool and
            not a substitute for professional medical advice. Always consult a
            healthcare provider for medical concerns.
          </li>
          <li>
            <strong>Privacy:</strong> We prioritize your privacy. Your data is
            securely stored and never shared without your consent.
          </li>
          <li>
            <strong>Inclusive:</strong> We are committed to providing accessible
            and inclusive healthcare information for all women.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Landing;
