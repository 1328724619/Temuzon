import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="Home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://cdn.prod.website-files.com/6282023139e6f54144ddf26a/673f4fceecf09279775c24a5_673f32f5b5817321757cf6fd_image.webp"
          alt=""
        />

        <div className="home_row">
          <Product
            id="1"
            title="JavaScript Full Stack Developer: Capture the Job Offer and Advance Your Career (Interview Prodigy - Enabling Technology, Finance and Management professionals ... the job offer of their dreams Book 3)"
            price={9.99}
            image="https://m.media-amazon.com/images/I/71nuCsDcA-L._UF1000,1000_QL80_.jpg"
            rating={4}
          />
          <Product
            id="2"
            title="Apple iPhone 16 Pro Max - 256 GB - Black Titanium"
            price={1099.99}
            image="https://m.media-amazon.com/images/I/71jL8s68fjL.jpg"
            rating={5}
          />
        </div>

        <div className="home_row">
          <Product
            id="3"
            title="Apple iPad Pro 13-Inch (M4): Built for Apple Intelligence, Ultra Retina XDR Display, 256GB, 12MP Front/Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life — Space Black"
            price={1199.99}
            image="https://m.media-amazon.com/images/I/7147JzEtrqL._AC_UF1000,1000_QL80_.jpg"
            rating={5}
          />
          <Product
            id="4"
            title="MageGee Portable 60% Mechanical Gaming Keyboard, MK-Box LED Backlit Compact 68 Keys Mini Wired Office Keyboard with Red Switch for Windows Laptop PC Mac - Black/Grey"
            price={49.99}
            image="https://m.media-amazon.com/images/I/61Q56A7UfNL._AC_UF894,1000_QL80_.jpg"
            rating={5}
          />
          <Product
            id="5"
            title="27 Inch Monitor, 1080P Ultra Wide FHD Frameless Computer Monitor 100Hz, 1ms, 99% sRGB, Low Blue Light, HDMI VGA Home Office Gamer Monitor, Desk Wall Mouted VESA, Dual Speakers, Tilt Adjustable, Black"
            price={95.99}
            image="https://m.media-amazon.com/images/I/718AqVXIM+L._AC_UF894,1000_QL80_.jpg"
            rating={5}
          />
        </div>

        <div className="home_row">
          <Product
            id="6"
            title="Panorama Gaming PC Desktop (NVD GeForce RTX 5080, Intel 24-Core i9-14900KF Processor, 96GB DDR5 RAM, 2x2TB Gen4 NVMe SSD, WiFi 6E, HDMI, Windows 11 Pro) Best 2025 Prebuilt Tower RGB Gamer Computer"
            price={3799.99}
            image="https://m.media-amazon.com/images/I/615NnXM3alL._AC_UF894,1000_QL80_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
