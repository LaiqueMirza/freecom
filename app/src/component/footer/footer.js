import React from "react";
import "./footer.css";
import { Row, Col } from "antd";
import logoNav from "../../img/CompanyLogo.jpeg";

const Footer = () => {
  return (
    <Row gutter={16} className="footer-main-div" justify="center">
      <Col xs={24} sm={24} lg={12} className="responsive-margin">
        <Row>
          <Col style={{'margin-right':'50px'}}>
            <img width="130" height="100" src={logoNav} alt="nav-logo" />
          </Col>
          <Col>
            <Row>
              <h3>
                <bold className="orange">AMRUTTAM </bold>
                <bold className="green"> TATTVA PVT. LTD.</bold>
              </h3>
            </Row>
            <Row>
              {" "}
              <h5>(IN ASSOCIATION WITH</h5>
            </Row>
            <Row>
              {" "}
              <h5>SHREE SWAMINARAYAN GURUKUL</h5>
            </Row>
            <Row>
              {" "}
              <h5>HERBAL AUSHADHAM - RAJKOT)</h5>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={12} lg={6} className="responsive-margin">
        <Row>
          <h4>CORPORATE OFFICE</h4>
        </Row>
        <Row>
          <h5>203, Shivram Square,</h5>
        </Row>
        <Row>
          <h5>Sahar road, Adheri (East)</h5>
        </Row>
        <Row>
          <h5>Mumbai - 400 099,</h5>
        </Row>
        <Row>
          <h5>Maharastra.</h5>
        </Row>
        <Row>
          <h4>Customer Care No. :</h4>
        </Row>
        <Row>
          <h4>+91 98 53 49 75 34</h4>
        </Row>
      </Col>
      <Col xs={24} sm={12} lg={6} className="responsive-margin">
        <Row>
          <h4>BRANCH OFFICE</h4>
        </Row>
        <Row>
          <h5>B-104, Popular Center,</h5>
        </Row>
        <Row>
          <h5>Opp. Brand Factory,</h5>
        </Row>
        <Row>
          <h5>Near Shyamal Junction,</h5>
        </Row>
        <Row>
          <h5>Satelite Ahmedabad,</h5>
        </Row>
        <Row>
          <h5>Gujarat - 380 015.</h5>
        </Row>

        <Row>
          <h4>Customer Care No. :</h4>
        </Row>
        <Row>
          <h4>+91 93 28 20 99 98</h4>
        </Row>
      </Col>
    </Row>
  );
};

export default Footer;
