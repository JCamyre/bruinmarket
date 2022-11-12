import React from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD

function Post() {
  const { id } = useParams();
  return <div>Post {id}</div>;
=======
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Container, Box } from "chakra-ui";

function Post() {
  const { id } = useParams();
  return (
    <div>
      <h1>Post {id}</h1>
      <div>
        <Carousel showArrows={true} infiniteLoop={true}>
          <div>
            <img src="https://imgs.search.brave.com/iDWBRAOg5OxWbGv_P4lkcXBZQ6__WvX4XEljLG9FP_A/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zYmx5/LXdlYi1wcm9kLXNo/YXJlYWJseS5uZXRk/bmEtc3NsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/Ny8xNTIwNTMxOC9z/aWQtYmFsYWNoYW5k/cmFuLV85YS0zTk81/S0pFLXVuc3BsYXNo/LmpwZw" />
            <p>Panda 1</p>
          </div>
          <div>
            <img src="https://imgs.search.brave.com/Dghzc_7RTRGKdeVmWN5zRL0tV24jSh8-1XXp9SvSveg/rs:fit:1200:900:1/g:ce/aHR0cHM6Ly9hc2tn/YW1lci5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDQv/QnJlZWQtUGFuZGFz/LmpwZw" />
            <p>Minecraft Panda</p>
          </div>
          <div>
            <img src="https://imgs.search.brave.com/Us-94VJX9bkGOxLCqzLhUYllfI9NMAs0IUj9dbpd_TM/rs:fit:1158:693:1/g:ce/aHR0cHM6Ly9zdGF0/aWMucGxhbmV0bWlu/ZWNyYWZ0LmNvbS9m/aWxlcy9yZXNvdXJj/ZV9tZWRpYS9zY3Jl/ZW5zaG90LzE5MjMv/My0xNTU5NzkwMzg2/X2xyZy5wbmc" />
            <p>Cursed Panda</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
>>>>>>> 7855b5d421288bd0c568ae22d8cacfe865727294
}

export default Post;
