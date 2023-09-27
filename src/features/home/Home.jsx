import Feature from "../../components/feature/Feature";

import "./Home.css";
import iconChat from "../../assets/icon-chat.png";
import iconMoney from "../../assets/icon-money.png";
import iconSecurity from "../../assets/icon-security.png";

export default function Home() {
  const features = [
    {
      imageSource: iconChat,
      title: "You are our #1 priority",
      description:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      imageSource: iconMoney,
      title: "More savings means higher rates",
      description: "The more you save with us, the higher your interest rate will be!",
    },
    {
      imageSource: iconSecurity,
      title: "Security you can trust",
      description: "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map(feature => (
          <Feature
            key={feature.title}
            imageSource={feature.imageSource}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </main>
  );
}
