import * as React from "react";
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popup from '../components/Popup';

export type Corporation = {
  alliance_id: number;
  ceo_id: number;
  creator_id: number;
  date_founded: string;
  description: string;
  member_count: number;
  name: string;
  tax_rate: string;
  ticker: string;
  url: string;
  ceo: Ceo;
}
export type Race = {
  race_id: number;
  name: string;
  description: string;
}
type Sistem = {
  name: string;
}
type Ceo = {
  ancestry_id: number;
  birthday: string;
  bloodline_id: number;
  corporation_id: number;
  description: string;
  gender: string;
  name: string;
  race_id: number;
  title: string;
  race: Race;
}


type Fraction = {
  corporation_id: number;
  description: string;
  name: string;
  solar_system_id: number;
  corporation: Corporation;
  sistem: Sistem;
}

export type Universe = {
  fractions: Fraction[];
  races: Race[];
};

class Main extends React.Component<{}, Universe> {
  state: Universe = {
    fractions: [],
    races: [],
  };
  componentDidMount() {
    axios.get<Fraction[]>('https://esi.evetech.net/legacy/universe/factions/')
      .then(response => {
        const arr = response.data.filter((item) => item.corporation_id !== 0)
        this.setState({
          fractions: arr
        })
        this.getRaces(`https://esi.evetech.net/legacy/universe/races/`)
        this.addField(`https://esi.evetech.net/legacy/corporations/`, `corporation_id`, `corporation`)
        this.addField(`https://esi.evetech.net/legacy/universe/systems/`, `solar_system_id`, `sistem`,)
      });
  }

  addField = (url: string, id: string, field: string) => {

    if (field === 'corporation') {
      const arrayId: string[] = this.state.fractions.map((item: any) => item[id].toString())
      const arrayNames: Corporation[] = []
      arrayId.forEach((item, index) => {
        axios.get<Corporation>(`${url}${item}`)
          .then(response => {
            arrayNames[index] = response.data;
            if (this.state.fractions.length === arrayNames.length) {
              const arr = this.state.fractions
              arr.forEach((item, index) => item.corporation = arrayNames[index])
              this.setState({
                fractions: arr
              })
              this.addFieldtoCorporation(`https://esi.evetech.net/legacy/characters/`, `ceo_id`, `ceo`)
            }
          })
      })
    } else if (field === 'sistem') {
      const arrayId: string[] = this.state.fractions.map((item: any) => item[id].toString())
      const arrayNames: Sistem[] = []
      arrayId.forEach((item, index) => {
        axios.get<Sistem>(`${url}${item}`)
          .then(response => {
            arrayNames[index] = response.data;
            if (this.state.fractions.length === arrayNames.length) {
              const arr = this.state.fractions
              arr.forEach((item, index) => item.sistem = arrayNames[index])
              this.setState({
                fractions: arr
              })
            }
          })
      })
    }
  }

  addFieldtoCorporation = (url: string, id: string, field: string) => {
    const arrayId: string[] = this.state.fractions.map((item: any) => item.corporation ? item.corporation[id].toString() : [])
    const arrayNames: Ceo[] = []
    arrayId.forEach((item, index) => {
      axios.get<Ceo>(`${url}${item}`)
        .then(response => {
          arrayNames[index] = response.data;
          if (this.state.fractions.length === arrayNames.length) {
            const arr = this.state.fractions
            arr.forEach((item, index) => item.corporation.ceo = arrayNames[index])
            this.setState({
              fractions: arr
            })
          }
        })
        .catch((error) => {
          console.error('error');
        });
    })
  }
  getRaces = (url: string) => {
    axios.get<Race[]>(`${url}`)
      .then(response => {
        const arr = response.data;
        this.setState({
          races: arr
        })
        console.log(this.state.fractions)
        console.log(this.state.races)
      })
  }

  render() {
    const listItems = this.state.fractions.map((item) =>
    (
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
                <p className="sistem">Solar sistem: <span className="sistemName">{item.sistem ? item.sistem.name : null}</span></p>
              </div>
              <Popup corporation={item.corporation ? item.corporation : null}
                universe={this.state ? this.state : null}>
                {<p className="corporation">Corporation: <span className="corporationName">{item.corporation ? item.corporation.name : null}</span></p>}
              </Popup>
            </div>
          </AccordionDetails>
        </Accordion>
      </li>
    )
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