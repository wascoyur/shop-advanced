import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => (
  
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>Наименование категории</label>
      <input
        type='text'
        className='form-control'
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />
      <button className='btn btn-outline-primary'>Сохранить</button>
    </div>
  </form>
);

export default CategoryForm;
