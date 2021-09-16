import { Col } from 'antd';
import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../components/orders/Orders';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    await getOrders(user.token).then((res) => {
      // console.log('adminDash res:', JSON.stringify(res, null, 4));
      setOrders(res.data);
    });
  };
  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('Статус заказа обновлен.');
      loadOrders();
    });
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <Col>
          <h4>Панель администратора</h4>
          {/* {JSON.stringify(orders)} */}
          <Orders handleStatusChange={handleStatusChange} orders={orders} />
        </Col>
      </div>
    </div>
  );
};

export default AdminDashboard;
