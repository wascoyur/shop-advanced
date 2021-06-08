import React from 'react';

const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
  };
  return (
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
  );
};

export default FileUpload;
