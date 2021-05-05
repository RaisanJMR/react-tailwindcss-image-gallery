import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) =>
        // console.log(data)
        {
          setImages(data.hits);
          setIsLoading(false);
        }
      )
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto px-4">
      <ImageSearch searchText={(text)=>setTerm(text)}/>
      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }
      {isLoading? <h1 className="text-6xl text-center mx-auto mt-32">loading...</h1> : <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 md:gap-2">
        {images.map((image) => (
          <ImageCard key={image.id} image={image}/>
        ))}
      </div>}
    </div>
  );
}

export default App;
