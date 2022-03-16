import React, { useEffect, useState } from "react";
import { Table, Row, Col, Card,Popconfirm, Spin, message, Drawer } from "antd";
import axios from "axios";
import "./Admin.css";
import AdminEditModal from "./adminEditModal/adminEditModal";
const AdminMain = () => {
  const [orderData, setorderData] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalNoOfOrdersState, settotalNoOfOrdersState] = useState(0);
  const [totalAmountSalesState, settotalAmountSalesState] = useState(0);
  const [pendingOrdersState, setpendingOrdersState] = useState(0);
  const [recordEdit, setrecordEdit] = useState([]);
const [showDrawer, setShowDrawer]= useState(false);

const getOrders =()=> { 
  axios.get("/orders")
.then((res) => {
  setorderData(() => res.data.result);
})
.catch((err) => {
  console.log(err,"Something went wrong")
});
}
  useEffect(() => {
    getOrders()
  }, []);

  useEffect(() => {
    let data = orderData;
    let totalNoOfOrders = 0;
    let totalAmountSales = 0;
    let pendingOrders = 0;
    data.map((item) => {
      totalNoOfOrders++;
        totalAmountSales += item?.totalAmount;
      if (item?.orderStatus !== "DELIVERED") {
        pendingOrders++;
      }
    });
    settotalNoOfOrdersState(totalNoOfOrders);
    settotalAmountSalesState(totalAmountSales);
    setpendingOrdersState(pendingOrders);
  }, [orderData]);

  const editClickFunc = (record) => {
    console.log(record, "id in edit");
    setShowDrawer(true);
    setrecordEdit(record)

  };
    const editActiveToggle = () => {
		setShowDrawer(!showDrawer);
	};
  const deleteClickFunc = (id) => {
    console.log(id, "id in delete");
    setloading(true)
    axios.post("/deleteOrder",{
        id
      }).then(res =>{ message.info('ORDER DELETED');
      }).catch(err => console.log(err,"error in calling users"));
      getOrders();
      setloading(false)
  };
  const submitWithData = (values) => {
    setloading(true)
    editActiveToggle()
    console.log(values, "values");
    const payload ={
        _id:recordEdit._id,            
    paymentStatus: values?.paymentStatus,
    orderStatus: values?.orderStatus,
    deliveryDate: values?.deliveryDateState
    }
    axios.post("/editOrder",{
        payload
      }).then(res =>{ message.info('ORDER UPDATED');
      }).catch(err => console.log(err,"error in calling users"));
      getOrders();
      setloading(false)
};
  console.log(orderData, "orderData");
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: 'Mike',
  //     age: 32,
  //     address: '10 Downing Street',
  //   },
  //   {
  //     key: '2',
  //     name: 'John',
  //     age: 42,
  //     address: '10 Downing Street',
  //   },
  // ];

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => (
        <h3
          className="orderIdAdminPage"
          onClick={() => {
            navigator.clipboard.writeText(text);
          }}
        >
          {text}
        </h3>
      ),
    },
    {
      title: "PRODUCT ID",
      dataIndex: "productId",
      key: "productId",
      render: (texts) => (
        <ol>
          {texts.map((text) => (
            <li
              className="orderIdAdminPage"
              onClick={() => {
                navigator.clipboard.writeText(text);
              }}
            >
              {text}
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "PRODUCT NAME",
      dataIndex: "productName",
      key: "productName",
      width:'250px',
      render: (texts,record) => (
        <ol>
          {
          texts.map((text) => (
            <li >
              {text}
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: (texts) => (
        <ol>
          {texts.map((text) => (
            <li >
              {text}
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (texts) => (
        <ol>
          {texts.map((text) => (
            <li >
              {text}
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "SELECTED SIZE",
      dataIndex: "selectedSize",
      key: "selectedSize",
      render: (texts) => (
        <ol>
          {texts.map((text) => (
            <li >
              {text}
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "USER ID",
      dataIndex: "userId",
      key: "userId",
      render: (text) => (
        <h3
          className="orderIdAdminPage"
          onClick={() => {
            navigator.clipboard.writeText(text);
          }}
        >
          {text}
        </h3>
      ),
    },
    {
      title: "USER NAME",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "USER NUMBER",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
    },
    {
      title: "USER ADDRESS",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
      render: (text) => (
        <h5>
          {text?.addressLine1}, {text?.addressLine2}, {text?.city},{" "}
          {text?.pinCode}
          <br />
          {text?.phoneNumberAddress}
        </h5>
      ),
    },
    {
      title: "ONLINE PAYMENT",
      dataIndex: "onlinePayment",
      key: "onlinePayment",
      render: (text) => {
        if (text) {
          return <>✅</>;
        } else {
          return <>❌</>;
        }
      },
    },
    {
      title: "PAYMENT",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "TOTAL PRICE",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "STATUS",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text) => {
        if (text === "PENDING") {
          return <h3 className="adminStatusPending">{text}</h3>;
        } else if (text === "SHIPPED") {
          return <h3 className="adminStatusShipped">{text}</h3>;
        } else if (text === "DELIVERED") {
          return <h3 className="adminStatusDelivered">{text}</h3>;
        } else {
          return <h5>ERROR</h5>;
        }
      },
    },
    {
      title: "ORDER DATE",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (texts) => {
        let text = new Date(texts);
        var datestring =
          ("0" + text?.getDate()).slice(-2) +
          "-" +
          ("0" + (text?.getMonth() + 1)).slice(-2) +
          "-" +
          text?.getFullYear() +
          " " +
          ("0" + text?.getHours()).slice(-2) +
          ":" +
          ("0" + text?.getMinutes()).slice(-2);
        return <>{datestring}</>;
      },
    },
    {
      title: "DELIVERED DATE",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (texts) => {
        if (texts) {
          let text = new Date(texts);
          var datestring =
            ("0" + text?.getDate()).slice(-2) +
            "-" +
            ("0" + (text?.getMonth() + 1)).slice(-2) +
            "-" +
            text?.getFullYear() +
            " " +
            ("0" + text?.getHours()).slice(-2) +
            ":" +
            ("0" + text?.getMinutes()).slice(-2);
          return <>{datestring}</>;
        } else {
          return <h3>NO DATE SELECTED</h3>;
        }
      },
    },
    {
      title: "EDIT",
      dataIndex: "",
      key: "_id",
      render: (text, record) => (
        <h3
          className="orderIdAdminPage"
          onClick={editClickFunc.bind(this, record)}
        >
          ✏️
        </h3>
      ),
    },
    {
      title: "DELETE",
      dataIndex: "",
      key: "_id",
      render: (text, record) => (
        <Popconfirm
        title="Are you sure to delete this order?"
        onConfirm={deleteClickFunc.bind(this, record._id)}
        okText="Yes"
        cancelText="No"
      >
        <h3
          className="orderIdAdminPage"
          >
          🗑️
        </h3>
          </Popconfirm>
      ),
    },
  ];

  console.log(orderData, "ordereData");
  const drawerHeader = () => {
		return (
			<Row>
				<Col>
      <h3>Edit Order</h3>
				</Col>
			</Row>
		);
	};
	const closeDrawer = () => {
		editActiveToggle();
	};
  return (
    <div>
      <h2 className="adminPageh2Header">WELCOME TO THE ADMIN PAGE</h2>
          <Spin size="large" spinning={loading}>
      <Row className="adminPageMainRow">
        <Col xs={24} md={8}>
          {" "}
          <Card title="PENDING ORDERS" bordered>
            <h2>{pendingOrdersState}</h2>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          {" "}
          <Card title="TOTAL ORDERS" bordered>
            <h2>{totalNoOfOrdersState}</h2>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          {" "}
          <Card title="TOTAL SALES" bordered>
            <h2>{totalAmountSalesState}</h2>
          </Card>
        </Col>
      </Row>
      <Table
        dataSource={orderData}
        columns={columns}
        scroll={{ x: 2300, y: 1400 }}
      />
      	{showDrawer ? (
							<Drawer
								title={drawerHeader()}
								width={'85%'}
								onClose={closeDrawer}
								visible={showDrawer}
							>
								<AdminEditModal
                  record={recordEdit}
                  submitWithData={submitWithData}
              />
							</Drawer>
						) : null}
            </Spin>
    </div>
  );
};

export default AdminMain;
