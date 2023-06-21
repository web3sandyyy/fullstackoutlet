import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { VideoPlayerModal } from '../VideoPlayerModal';
import axios from 'axios';
import Header from '../header';


export default function ShowInfo() {
  const [modalShow, setModalShow] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [imageData, setImageData] = useState([]);


  
  const fetchAllData = async () => {
     
    const response = await axios.get(`${baseUrl}/outlets/${id}`);
    setData(response.data)
    console.log(response.data)

    const imageres = await axios.get(`${baseUrl}/outlet/images/${id}`);
    setImageData(imageres.data)
    console.log(imageres.data)
    
  };



  useEffect(() => {

    fetchAllData();
  }, []);



  return (
    <div>
        <Header />
      <Container>
        <div className="wrapper my-4">
          <div className="showinfo-div">
            <img
              src={`../../bannerimages/${Data.bannerimage}`}
              alt="movie thumnail"
            />
            <div className="mt-4">
              <h3 className="fw-bold">{Data.title}</h3>
              <p className="mt-3">{Data.description}</p>
              <p className="mt-3">
                Open Time : {Data.opentiming} Close Time : {Data.closetiming}
              </p>
              <p className="mt-3">
                Address :
                <a
                  href={`http://maps.google.com/?q=${Data.location}`}
                  className="text-decoration-none fs-5"
                  style={{color:'#393646'}}
                >
                  {" "}
                  {Data.address}
                </a>
              </p>
              <button
                onClick={() => setModalShow(true)}
                className="btn fw-bold border border-dark mt-3 shadow"
              >
                Play video
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h2>Image</h2>

            <div className="d-flex flex-wrap gap-5 mt-4 mini-img">
              {imageData.map((imageUrl, index) => (
                <div key={index} >
                  <LazyLoadImage
                    width={200}
                    height={200}
                    style={{
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                    src={`../../bannerimages/${imageUrl.images}`}
                    alt="user"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
      <VideoPlayerModal
        videoid={Data.youtubeLink}
        title={Data.title}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
