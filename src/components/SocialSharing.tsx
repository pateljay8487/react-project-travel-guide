import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./SocialSharing.css";

const SocialSharing: React.FC = () => {
  const shareOnFacebook = () => {
    // Replace "YOUR_URL" with the actual URL you want to share
    const url = "YOUR_URL";
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookShareUrl, "_blank");
  };

  const shareOnTwitter = () => {
    // Replace "YOUR_URL" with the actual URL you want to share
    const url = "YOUR_URL";
    const text = "Check out this amazing travel guide!";
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterShareUrl, "_blank");
  };

  const shareOnInstagram = () => {
    // Replace "YOUR_TEXT" with the actual text you want to share
    const text = "Check out this amazing travel guide!";
    const instagramShareUrl = `https://www.instagram.com/share?text=${encodeURIComponent(text)}`;
    window.open(instagramShareUrl, "_blank");
  };

  return (
    <div className="social-sharing-page">
      <h1>Social Sharing</h1>
      <div className="share-buttons">
        <button className="btn btn-facebook" onClick={shareOnFacebook}>
          <FontAwesomeIcon icon={faFacebook} className="icon" />
          Share on Facebook
        </button>
        <button className="btn btn-twitter" onClick={shareOnTwitter}>
          <FontAwesomeIcon icon={faTwitter} className="icon" />
          Share on Twitter
        </button>
        <button className="btn btn-instagram" onClick={shareOnInstagram}>
          <FontAwesomeIcon icon={faInstagram} className="icon" />
          Share on Instagram
        </button>
      </div>
    </div>
  );
};

export default SocialSharing;
