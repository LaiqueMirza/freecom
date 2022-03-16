import React from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";

const DropDownMenu = ({ handleMenuClick }) => {
  return (
    <Menu onClick={handleMenuClick}>
      <Menu.SubMenu key="1" title={"ARK"}>
        <Menu.Item key="GAUMUTRA ARK">
          <span>GAUMUTRA ARK (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH TULSI">
          <span>GAUMUTRA ARK WITH TULSI (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH GILOY">
          <span>GAUMUTRA ARK WITH GILOY (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH KANCHANAAR">
          <span> GAUMUTRA ARK WITH KANCHANAAR (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH SARPGANDHA">
          <span>GAUMUTRA ARK WITH SARPGANDHA (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH NEEM">
          <span>GAUMUTRA ARK WITH NEEM (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH PARIJAT">
          <span> GAUMUTRA ARK WITH PARIJAT (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH GORAKHMUNDI">
          <span>GAUMUTRA ARK WITH GORAKHMUNDI (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH MEDHASVI">
          <span>GAUMUTRA ARK WITH MEDHASVI (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH GOKHURU">
          <span>GAUMUTRA ARK WITH GOKHURU (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH KALMEGH">
          <span>GAUMUTRA ARK WITH KALMEGH (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH TRIPHALA">
          <span>GAUMUTRA ARK WITH TRIPHALA (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH SAPTHARANGI">
          <span>GAUMUTRA ARK WITH SAPTHARANGI (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH ARJUN">
          <span> GAUMUTRA ARK WITH ARJUN (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH PASHANBHED">
          <span>GAUMUTRA ARK WITH PASHANBHED (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH PUNARNAVA">
          <span>GAUMUTRA ARK WITH PUNARNAVA (200 ml) </span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="2" title={"SYRUP"}>
        <Menu.Item key="ASTHAREN SYRUP">
          <span>ASTHAREN SYRUP (100 ml) </span>
        </Menu.Item>
        <Menu.Item key="COFCARE SYRUP">
          <span> COFCARE SYRUP (100 ml)</span>
        </Menu.Item>
        <Menu.Item key="FEMMAVED SYRUP">
          <span> FEMMAVED SYRUP (200 ml) </span>
        </Menu.Item>
        <Menu.Item key="SRIZER SYRUP">
          <span> SRIZER SYRUP (200 ml) </span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="3" title={"OIL, OINTMENT AND DROPS"}>
        <Menu.Item key="PANCHAGAVYA NASAL DROPS">
          <span> PANCHAGAVYA NASAL DROPS (15 ml)</span>
        </Menu.Item>
        <Menu.Item key="PANCHAGAVYA MAHADRUTH">
          <span>PANCHAGAVYA MAHADRUTH (100 ml) </span>
        </Menu.Item>
        <Menu.Item key="GAUMAY ASSAV">
          <span> GAUMAY ASSAV (100 ml)</span>
        </Menu.Item>
        <Menu.Item key="AMRUTDHARA">
          <span> AMRUTDHARA (6 ml)</span>
        </Menu.Item>
        <Menu.Item key="NETRA AUSHADI">
          <span> NETRA AUSHADI (10 ml)</span>
        </Menu.Item>
        <Menu.Item key="GAVYA PSORASIS OIL">
          <span> GAVYA PSORASIS OIL (100 ml)</span>
        </Menu.Item>
        <Menu.Item key="TULSI DROPS">
          <span> TULSI DROPS (10 ml)</span>
        </Menu.Item>
        <Menu.Item key="GURUKUL PAIN BALM">
          <span> GURUKUL PAIN BALM (25 gm) </span>
        </Menu.Item>
        <Menu.Item key="UMOBACK OIL">
          <span> RUMOBACK OIL (50 ml) </span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="4" title={"POWDER AND CHURNA"}>
        <Menu.Item key="AJMODADI CHURNA">
          <span> AJMODADI CHURNA (100 gm)</span>
        </Menu.Item>
        <Menu.Item key="ASHWAGANDHA CHURNA">
          <span> ASHWAGANDHA CHURNA (100 gm)</span>
        </Menu.Item>
        <Menu.Item key="HARDE CHURNA">
          <span> HARDE CHURNA (100 gm)</span>
        </Menu.Item>
        <Menu.Item key="TRIFLA CHURNA">
          <span> TRIFLA CHURNA (100 gm) </span>
        </Menu.Item>
        <Menu.Item key="DIACARE CHURNA">
          <span> DIACARE CHURNA (100 gm)</span>
        </Menu.Item>
        <Menu.Item key="EASYCALL CHURNA">
          <span> EASYCALL CHURNA (100 gm) </span>
        </Menu.Item>
        <Menu.Item key="UROCARE CHURNA">
          <span> UROCARE CHURNA (100 gm) </span>
        </Menu.Item>
        <Menu.Item key="MADHYARI CHURNA">
          <span> MADHYARI CHURNA ( 100 gm) </span>
        </Menu.Item>
        <Menu.Item key="TOBSOLV CHURNA">
          <span> TOBSOLV CHURNA (100 gm)</span>
        </Menu.Item>
        <Menu.Item key="VYASANMUKTI MUKHVAS">
          <span> VYASANMUKTI MUKHVAS (25 gm) </span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="5" title={"ORAL CARE"}>
        <Menu.Item key="DANTMANJAN POWDER">
          <span> DANTMANJAN POWDER (35 gm)</span>
        </Menu.Item>
        <Menu.Item key="DENTOCLEAN HERBAL TOOTHPASTE">
          <span> DENTOCLEAN HERBAL TOOTHPASTE (100 gm)</span>
        </Menu.Item>
        <Menu.Item key="DENTOCLEAN HERBAL TOOTHPASTE">
          <span> DENTOCLEAN HERBAL TOOTHPASTE (50 gm)</span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="7" title={"SOAP AND OTHERS"}>
        <Menu.Item key="ALOEVERA SOAP">
          <span> ALOEVERA SOAP (75 gm)</span>
        </Menu.Item>
        <Menu.Item key="NEEM SOAP">
          <span> NEEM SOAP (75 gm)</span>
        </Menu.Item>
        <Menu.Item key="SANDAL SOAP">
          <span> SANDAL SOAP (75 gm)</span>
        </Menu.Item>
        <Menu.Item key="RICH HERBAL HAIR OIL">
          <span> RICH HERBAL HAIR OIL (100 ml)</span>
        </Menu.Item>
        <Menu.Item key="RICH HERBAL HAIR OIL">
          <span> </span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="8" title={"FOOD SUPPLEMENTARY"}>
        <Menu.Item key="GAUAMRUTTAM COLOSTRUM CAPS">
          <span> GAUAMRUTTAM COLOSTRUM CAPS (60 caps)</span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="9" title={"ORGANIC HEALTHY FOOD AND OTHER"}>
        <Menu.Item key="HONEY NATURAL">
          <span> HONEY NATURAL (100gm/250gm/500gm) </span>
        </Menu.Item>
        <Menu.Item key="CHAS MASALA">
          <span> CHAS MASALA (115 gm)</span>
        </Menu.Item>
        <Menu.Item key="GURUKUL CHAWANPRASH SPECIAL">
          <span> GURUKUL CHAWANPRASH SPECIAL (500 gm)</span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="10" title={"IMMUNITY AND MEMORY BOOSTERS"}>
        <Menu.Item key="SUVARNAPRASH DROPS">
          <span> SUVARNAPRASH DROPS (5 ml)</span>
        </Menu.Item>
        <Menu.Item key="GURUKUL CHAWANPRASH SPECIAL">
          <span> GURUKUL CHAWANPRASH SPECIAL (500 gm)</span>
        </Menu.Item>
        <Menu.Item key="BRAHMIGHAN VATI TABLET">
          <span> BRAHMIGHAN VATI TABLET (60 pcs)</span>
        </Menu.Item>
        <Menu.Item key="HONEY NATURAL">
          <span> HONEY NATURAL (100gm/250gm/500gm)</span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH TULSI">
          <span> GAUMUTRA ARK WITH TULSI (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH GILOY">
          <span> GAUMUTRA ARK WITH GILOY (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH NEEM">
          <span> GAUMUTRA ARK WITH NEEM (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH GOKHURU">
          <span> GAUMUTRA ARK WITH GOKHURU (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="MAHASUDARSHAN TABLET">
          <span> MAHASUDARSHAN TABLET (60 pcs)</span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="11" title={"CHILDREN HEALTH CARE"}>
        <Menu.Item key="SUVARNAPRASH DROPS">
          <span> SUVARNAPRASH DROPS (5 ml)</span>
        </Menu.Item>
        <Menu.Item key="GURUKUL CHAWANPRASH SPECIAL">
          <span> GURUKUL CHAWANPRASH SPECIAL (500 gm)</span>
        </Menu.Item>
        <Menu.Item key="HONEY NATURAL">
          <span> HONEY NATURAL (100gm/250gm/500gm)</span>
        </Menu.Item>
        <Menu.Item key="SRIZER SYRUP">
          <span> SRIZER SYRUP (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="COFCARE SYRUP">
          <span> COFCARE SYRUP (100 ml)</span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="12" title={"WOMEN HEALTH CARE"}>
        <Menu.Item key="FEMMAVED SYRUP">
          <span> FEMMAVED SYRUP (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="MENSTROREN CAPSULE">
          <span> MENSTROREN CAPSULE (30 pcs)</span>
        </Menu.Item>
        <Menu.Item key="GAUMUTRA ARK WITH MEDHASVI">
          <span> GAUMUTRA ARK WITH MEDHASVI (200 ml)</span>
        </Menu.Item>
        <Menu.Item key="LEUCOREN CAPSULE">
          <span> LEUCOREN CAPSULE (30 pcs)</span>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default DropDownMenu;
