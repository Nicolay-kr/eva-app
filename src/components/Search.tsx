import React, { useEffect } from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';


// corporation: /corporations/{corporation_id}/
// faction: /universe/factions/ (Это неизменный список фракций, id нужно сопоставлять с результатом, который приходит в API)
// region: /universe/regions/{region_id}/
// solar_system: /universe/systems/{system_id}/
// station: /universe/stations/{station_id}/
// inventory_type: /universe/ids/ (Возвращает коллекции разных типов, содержащие имена соответствующие искомым ids)

interface ItemI {
    name: number[];
}
type DataI = Record<string, number[]>
type Names = {
    name: number;
  }
const categories = [
    {
        value: 'none',
        label: 'none',
    },
    {
        value: 'corporation',
        label: 'corporation',
    },
    {
        value: 'faction',
        label: 'faction',
    },
    {
        value: 'region',
        label: 'region',
    },
    {
        value: 'solar_system',
        label: 'solar system',
    },
    {
        value: 'station',
        label: 'station',
    },
    {
        value: 'inventory_type',
        label: 'inventory_type',
    },
];

export default function Search() {
    const [category, setCategory] = React.useState<Category>('none');
    const [errorCategory, setErrorCategory] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [errorsearchText, setErrorsearchText] = React.useState(false);
    const [data, setData] = React.useState<number[]>([])
    const [request, setRequest] = React.useState(`https://esi.evetech.net/legacy/search?categories=inventory_type&search=Shi`);
    const [names, setNames] = React.useState<number[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory((state) => event.target.value as Category);
        console.log(category)
    };
    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const search = () => {
        setErrorsearchText(false);
        setErrorCategory(false)
        if (!category) {
            console.log('error',)
            setErrorCategory((state) => true)
            if (searchText.length < 3) {
                setErrorsearchText((state) => true);
            }
        }
        else if (searchText.length < 3) {
            console.log('error')
            setErrorsearchText((state) => true);
            if (!category) {
                setErrorCategory((state) => true)
            }
        } else {
            console.log(request)
            getRequest(request)
        }

    };
    useEffect(() => {
        setRequest(`https://esi.evetech.net/legacy/search?categories=${category}&search=${searchText}`)
    }, [category, searchText])


    type Category = 'corporation' | 'faction' | 'region' | 'solar_system' | 'station' | 'inventory_type' | 'none';

    const requests: Record<Category, string> = {
        none: `none`,
        corporation: `https://esi.evetech.net/legacy/corporations/`,
        faction: `https://esi.evetech.net/legacy/universe/factions/`, //-
        region: `https://esi.evetech.net/legacy/universe/regions/`,
        solar_system: `https://esi.evetech.net/legacy/universe/systems/`,
        station: `https://esi.evetech.net/legacy/universe/stations/`,
        inventory_type: `https://esi.evetech.net/legacy/universe/ids/`,//
    }

    const getRequest = (url: string) => {
        setNames([])
        if (category === null) { return; }
        axios.get<DataI>(`${url}`)
            .then(response => {
                console.log(response.data)
                const arr = response.data[category];
                setData(arr)
                // console.log(data)
                if (category !== 'inventory_type' && category !== 'faction') {
                    arr.forEach((item) => getRequestFromId(`${requests[category]}${item}`))
                }
            }
            )
    }

    const getRequestFromId = (url: string) => {
        axios.get<Names>(`${url}`)
            .then(response => {
                const name = response.data.name
                console.log(name)
                setNames((state)=>[...state,name])
                // console.log(names)
            })
    }


    const listItems = data.map((item, index) =>
        <li className="item" key={item.toString()}>
            <div className="line">
                {names[index]}
                {/* {getRequest(`https://esi.evetech.net/legacy/corporations/${item}`)} */}
            </div>
            <div className="line lineActive">{item}</div>

        </li>
    );

    return (
        <div className="search">
            <form className="searchForm" noValidate autoComplete="off">
                <TextField
                    className={"categoryField"}
                    id="outlined-select-currency"
                    select
                    label="Category"
                    value={category}
                    onChange={handleChange}
                    helperText="Please select category"
                    variant="outlined"
                    error={errorCategory ? true : false}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField helperText={errorsearchText ? (<p className={"helpText"}>Min length shoud be more than 2</p>) : null} error={errorsearchText ? true : false} value={searchText} onChange={handleChangeSearch} className="searchField" id="outlined-basic" label="Search" variant="outlined" />
                <Button onClick={search} className="button" variant="contained" color="primary">
                    Search
                </Button>
            </form>
            <div>
                <p>{request}</p>
                {data.length > 0 ? (<h2>Найдено: {data.length}</h2>) : <h2>По вашему запросу ничего не найдено...</h2>}
            </div>
            <ul className="result" >
                <li className="item" key="0">
                    <div className="line">Name</div>
                    <div className="line lineActive">ID</div>
                </li>
                {listItems}
            </ul>
        </div>
    );
}
// https://esi.evetech.net/legacy/corporations/{coorp_id}