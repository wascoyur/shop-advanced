import { Col } from 'antd';
import React from 'react';
import AdminNav from '../../components/nav/AdminNav';

const AdminDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <Col>
          <h4>Панель администратора</h4>
        </Col>
      </div>
    </div>
  );
};

export default AdminDashboard;
