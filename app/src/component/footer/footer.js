import React from "react";
import "./footer.css";
import { Row, Col,Space,Card } from "antd";
import logoNav from "../../img/CompanyLogo.jpeg";

const Footer = () => {
  return (
    <div className="footerMainDiv">
<hr/>
    <Space className="footerMainSpace">

    <Card  bordered={false} className="footerCards">

            <img width="130" height="100" src={logoNav} alt="nav-logo" />
             </Card>
    <Card  bordered={false} className="footerCards">

              <h3>
                <span className="orange">AMRUTTAM </span>
                <span className="green"> TATTVA PVT. LTD.</span>
              
              </h3>
              {" "}
              <h5>(IN ASSOCIATION WITH</h5>
              {" "}
              <h5>SHREE SWAMINARAYAN GURUKUL</h5>
              {" "}
              <h5>HERBAL AUSHADHAM - RAJKOT)</h5>
</Card>
<Card  bordered={false} className="footerCards">

          <h4>CORPORATE OFFICE</h4>
          <h5>203, Shivram Square,</h5>
          <h5>Sahar road, Adheri (East)</h5>
          <h5>Mumbai - 400 099,</h5>
          <h5>Maharastra.</h5>
          <h4>Customer Care No. :</h4>
          <h4>+91 98 53 49 75 34</h4>
</Card>
<Card  bordered={false} className="footerCards">

          <h4>BRANCH OFFICE</h4>
          <h5>B-104, Popular Center,</h5>
          <h5>Opp. Brand Factory,</h5>
          <h5>Near Shyamal Junction,</h5>
          <h5>Satelite Ahmedabad,</h5>
          <h5>Gujarat - 380 015.</h5>

          <h4>Customer Care No. :</h4>
          <h4>+91 93 28 20 99 98</h4>
</Card>
    </Space>
    </div>
  );
};

export default Footer;
