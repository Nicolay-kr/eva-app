import * as React from "react";
import { render } from "react-dom";
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';






type Fraction = {
  corporation_id: number;
  description: string;
  // faction_id:number,
  // is_unique:	boolean,
  // militia_corporation_id:	number,
  name: string;
  // size_factor:	number,
  solar_system_id: number;
  // station_count: number,
  // station_system_count:	number,.
  [key: string]: any,
  // solar_system_name: string;
}

type Sistem = {
  name: string;
  system_id: number;
}


type MyState = {
  fractions: Fraction[] // like this
};
class Main extends React.Component<{}, MyState> {

  // constructor(prop) {
  //   super(this.props);
  //   this.getSolarSistem = this.getSolarSistem.bind(this);
  // }
  state: MyState = {
    fractions: [],
  };
  componentDidMount() {
    axios.get<Fraction[]>('https://esi.evetech.net/legacy/universe/factions/')
      .then(response => {
        const arr = response.data
        this.setState({
          fractions: arr
        })
        this.getSolarSistem()
      });
  }
  // getSolarSistem(event: React.MouseEvent<HTMLDivElement>,id:string) {
  //   axios.get<Sistem>(`https://esi.evetech.net/legacy/universe/systems/${id}`)
  //     .then(response => {
  //       return console.log(response.data.name)
  //     });
  // }
  getSolarSistem = () => {
    const sistemsId: string[] = this.state.fractions.map((item: any) => item.solar_system_id.toString())
    const sistemsNames: string[] = []
    sistemsId.forEach((item) => {
      axios.get<Sistem>(`https://esi.evetech.net/legacy/universe/systems/${item}`)
        .then(response => {
          sistemsNames.push(response.data.name)
          if (this.state.fractions.length === sistemsNames.length) {
            const arr = this.state.fractions
            arr.forEach((item, index) => item["sistemName"] = sistemsNames[index])
            this.setState({
              fractions: arr
            })
          }
        })
    })
  }

  render() {
    const listItems = this.state.fractions.map((item) =>
      <li className="itemFraction" key={item.corporation_id}>
        {/* <div onClick={(e)=>this.getSolarSistem(e,item.solar_system_id.toString())}> */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>{item.name}</h4>
          </AccordionSummary>
          <AccordionDetails>
            <div className="descBox">
              <p className="description">{item.description}</p>
              <p className="sistem">Solar sistem: <span className="sistemName">{item.sistemName ? item.sistemName : null}</span></p>
            </div>
          </AccordionDetails>
        </Accordion>
        {/* </div> */}
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