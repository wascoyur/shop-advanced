import React from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log('uri', uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                { headers: { authtoken: user ? user.token : '' } },
              )
              .then((res) => {
                // console.log('image upload', res);
                setLoading(true);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log('cloud error', err);
              });
          },
          'base64',
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    console.log('remove image', public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimages`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        },
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log('err', err);
      });
  };
  return (
    <div>
      <div className='row'>
        {values.images &&
          values.images.map((image) => (
            <Badge
              count='X'
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: 'pointer' }}>
              <Avatar src={image.url} size={100} className='m-3' />
            </Badge>
          ))}
      </div>
      <div className='row'>
        <label className='btn btn-primary btn-raised'>
          Выберите изображение товара
          <input
            type='file'
            multiple
            hidden
            accept='images/*'
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
