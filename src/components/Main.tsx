import * as React from "react";
// import { render } from "react-dom";
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popup from '../components/Popup'
import {
  changePopup,
} from '../store/mainSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks'






type Fraction = {
  corporation_id: number;
  description: string;
  name: string;
  solar_system_id: number;
  [key: string]: any,
}

type Sistem = {
  name: string;
}


type MyState = {
  fractions: Fraction[] // like this
  popup: boolean
};

class Main extends React.Component<{}, MyState> {
  // constructor(prop) {
  //   super(this.props);
  //   this.getSolarSistem = this.getSolarSistem.bind(this);
  // }
  state: MyState = {
    fractions: [],
    popup: false,
  };
  componentDidMount() {
    axios.get<Fraction[]>('https://esi.evetech.net/legacy/universe/factions/')
      .then(response => {
        const arr = response.data.filter((item) => item.corporation_id !== 0)
        this.setState({
          fractions: arr
        })
        this.addField(`https://esi.evetech.net/legacy/universe/systems/`, `solar_system_id`, `sistemName`)
        this.addField(`https://esi.evetech.net/legacy/corporations/`, `corporation_id`, `corporationName`)
      });
  }
 
  addField = (url: string, param: string, fieldName: string) => {
    const arrayId: string[] = this.state.fractions.map((item: any) => item[param].toString())
    const arrayNames: string[] = []
    arrayId.forEach((item, index) => {
      axios.get<Sistem>(`${url}${item}`)
        .then(response => {
          arrayNames[index] = response.data.name;
          if (this.state.fractions.length === arrayNames.length) {
            const arr = this.state.fractions
            arr.forEach((item, index) => item[fieldName] = arrayNames[index])
            this.setState({
              fractions: arr
            })
          }
        })
    })
  }
  // handleClickcorp =(event: React.MouseEvent<HTMLDivElement>) => {
  handleClickcorp = () => {
    this.setState({
      popup: true,
    })
    console.log(this.state.popup)
  }

  render() {
    const listItems = this.state.fractions.map((item) =>
      <li className="itemFraction" key={item.corporation_id}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>{item.name}</h4>
          </AccordionSummary>
          <AccordionDetails>
            <div className="contentBox">
              <div className="descBox">
                <p className="description">{item.description}</p>
                <p className="sistem">Solar sistem: <span className="sistemName">{item.sistemName ? item.sistemName : null}</span></p>
              </div>
              <Popup>
                {<p className="corporation">Corporation: <span className="corporationName">{item.corporationName ? item.corporationName : null}</span></p>}
              </Popup>
            </div>
          </AccordionDetails>
        </Accordion>
      </li>
    );
    return (
      <div>
        <ul className="listFractions">
          {listItems}
        </ul>
      </div>

    );
  }
}
export default Main