import React, { useEffect, useState } from "react";
import { Table, Row, Col, Select, Card, Input, Button, DatePicker, InputNumber, Form } from "antd";
import "./adminEditModal.css";
import moment from 'moment';
import axios from "axios";
const AdminEditModal = ({ record, submitWithData }) => {
    const { Option } = Select;
  const [deliveryDateState, setdeliveryDateState] = useState("");
  const [form] = Form.useForm();
    const dateFormatList = 'DD/MM/YY';
    let text = new Date(record.orderDate);
    var datestringBig =
        ("0" + text?.getDate()).slice(-2) +
        "-" +
        ("0" + (text?.getMonth() + 1)).slice(-2) +
        "-" +
        text?.getFullYear();
    var datestring = datestringBig.split('').splice(0, 10).join('');
    const onInputChange = (e) => {

    }

    const submitForm =(val)=>{
        let values = {
            ...val,
            deliveryDateState
        }
        submitWithData(values)
    }
    const funcDeliveryDate =(e)=>{
const date = new Date(e.target.value);
    setdeliveryDateState(date)
    }
  
    return (
        <Form
            form={form}
            initialValues={record}
            layout="vertical"
            name="ue-filter"
            onFinish={submitForm}
        >
            <Row align="bottom" gutter={[16, 16]}>
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="USER NAME" name="userName">
                        <Input

                        />

                    </Form.Item>
                </Col>
                <Col xs={24} sm={16} xl={12}>
                    <Form.Item label="USER ADDRESS 1" name="addressLine1">
                        <Input
                            defaultValue={record.deliveryAddress.addressLine1}

                            id={"addressLine1"}
                            onChange={onInputChange}
                        />

                    </Form.Item>
                </Col>
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="USER ADDRESS 2" name="addressLine2">
                        <Input
                            defaultValue={record.deliveryAddress.addressLine2}
                            id={"addressLine2"}
                            onChange={onInputChange}
                        />

                    </Form.Item>
                </Col>
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="USER NUMBER" name="userPhoneNumber">
                        <Input
                            id={"userPhoneNumber"}
                            onChange={onInputChange}
                        />

                    </Form.Item>
                </Col>
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="USER ADDRESS NUMBER" name="phoneNumberAddress">
                        <Input
                            defaultValue={record.deliveryAddress.phoneNumberAddress}
                            id={"phoneNumberAddress"}
                            onChange={onInputChange}
                        />

                    </Form.Item>
                </Col>
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="USER CITY" name="city">
                        <Input
                            defaultValue={record.deliveryAddress.city}
                            id={"city"}
                            onChange={onInputChange}
                        />

                    </Form.Item>
                </Col>
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="USER PINCODE" name="pinCode">
                        <Input
                            defaultValue={record.deliveryAddress.pinCode}
                            id={"pinCode"}
                            onChange={onInputChange}
                        />

                    </Form.Item>
                </Col>
            </Row >
            <hr />
            <h2>
                Product ordered
            </h2>
            <hr />
            <Row align="bottom" gutter={[16, 16]}>
                <br />
                {
                    record.productName.map((item, i) => (

                        <>



                            <Col xs={12} sm={8} xl={6}>
                                <Form.Item label="PRODUCT NAME" name={"productName" + [i]}>
                                    <Input
                                        defaultValue={item}
                                        id={"productName" + [i]}
                                        onChange={onInputChange}
                                    />

                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={8} xl={6}>
                                <Form.Item label="PRODUCT SIZE" name={"selectedSize" + [i]}>
                                    <Input
                                        defaultValue={record.selectedSize[i]}

                                        id={"selectedSize" + [i]}
                                        onChange={onInputChange}
                                    />

                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={8} xl={6}>
                                <Form.Item label="PRODUCT QUANTITY" name={"quantity" + [i]}>
                                    <Input
                                        defaultValue={record.quantity[i]}

                                        id={"quantity" + [i]}
                                        onChange={onInputChange}
                                    />

                                </Form.Item>
                            </Col>

                            <Col xs={12} sm={8} xl={6}>
                                <Form.Item label="PRODUCT PRICE" name={"price" + [i]}>
                                    <Input
                                        defaultValue={record.price[i]}

                                        id={"price" + [i]}
                                        onChange={onInputChange}
                                    />

                                </Form.Item>
                            </Col>
                        </>
                    ))
                }
            </Row>
            <hr />
            <h2>
                STATUS
            </h2>
            <hr />
            <Row align="bottom" gutter={[16, 16]}>
                <br />
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="ONLINE PAYMENT" name="onlinePayment">
                        <Input
                        />

                    </Form.Item>
                </Col>
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="PAYMENT STATUS *" name="paymentStatus">
                        <Select>
                            <Option value="DONE">DONE</Option>
                            <Option value=" NOT DONE">NOT DONE</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="TOTAL AMOUNT" name="totalAmount">
                        <Input

                        />

                    </Form.Item>
                </Col>  <Col xs={12} sm={8} xl={6}>
                    <Form.Item label="ORDER STATUS *" name="orderStatus">
                        <Select>
                            <Option value="PENDING">PENDING</Option>
                            <Option value="SHIPPED">SHIPPED</Option>
                            <Option value="DELIVERED">DELIVERED</Option>
                        </Select>

                    </Form.Item>
                </Col>
            </Row>
            <Row align="bottom" gutter={[16, 16]}>
                <Col xs={12} sm={8} xl={6}>
                    <label >
                        ORDER DATE 
                    </label>
           <DatePicker
                                className="datePickerFormEdit"
                                defaultValue={moment(new Date(record.orderDate), dateFormatList)} format={dateFormatList} />
                </Col>
                <Col xs={12} sm={8} xl={6}>
                    <label >
                        DELIVERY DATE *
                    </label>
                        {record.deliveryDate ?
                            <DatePicker
                                className="datePickerFormEdit"
                                onBlur={funcDeliveryDate}
                                defaultValue={moment(new Date(record.deliveryDate), dateFormatList)} format={dateFormatList} />
                            :
                            <DatePicker
                                className="datePickerFormEdit"
                                onBlur={funcDeliveryDate}
                            />
                        }
                </Col>
            </Row>
            <Col xs={12} sm={8} xl={4} className="adminEditSubmitLastCol">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Col>
        </Form>
    )
}
export default AdminEditModal;
