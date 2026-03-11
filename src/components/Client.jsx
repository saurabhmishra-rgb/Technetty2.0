import React from "react";
import "./Client.css";

const clients = [
  { name: "Serrineton Bank", icon: "🏦" },
  { name: "Crowd Zero", icon: "◯" },
  { name: "Diamanda Furniture", icon: "⬡" },
  { name: "OddNest", icon: "👥" },
  { name: "The Spoon & Cup", icon: "👁" },
  { name: "Warrenshire Inc.", icon: "◎" },
];

const Clients = () => {
  return (
    <section className="clients-section">
      <div className="clients-container">
        
        <div className="clients-header">
          <h2 className="clients-title">Clients</h2>
          <p className="clients-subtitle">
            No fancy clients, all just like you <span className="wink">;)</span>
          </p>
        </div>

        <div className="clients-grid">
          {clients.map((client, index) => (
            <div key={index} className="client-card">
              <div className="client-icon-wrapper">
                <span className="client-icon">{client.icon}</span>
              </div>
              <span className="client-name">{client.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Clients;