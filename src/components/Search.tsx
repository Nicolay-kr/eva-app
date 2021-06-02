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
    name: number;
}
type DataI = Record<string, number[]>
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
    const [category, setCategory] = React.useState('none');
    const [errorCategory, setErrorCategory] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [errorsearchText, setErrorsearchText] = React.useState(false);
    const [data, setData] = React.useState<number[]>([])
    const [request, setRequest] = React.useState(`https://esi.evetech.net/legacy/search?categories=inventory_type&search=Shi`);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory((state) => event.target.value);
        console.log(category)
        // setRequest(`https://esi.evetech.net/legacy/search?categories=${category}&search=${searchText}`)
    };
    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        // setRequest(`https://esi.evetech.net/legacy/search?categories=${category}&search=${searchText}`)
    };
    const search = () => {
        setErrorsearchText(false);
        setErrorCategory(false)
        if (category === "none") {
            console.log('error',)
            setErrorCategory((state) => true)
            if (searchText.length < 3) {
                setErrorsearchText((state) => true);
            }
        }
        else if (searchText.length < 3) {
            console.log('error')
            setErrorsearchText((state) => true);
            if (category === "none") {
                setErrorCategory((state) => true)
            }
        } else {
            console.log(request)
            getRequest(request)
        }

    };
    useEffect(() => {
        setRequest(`https://esi.evetech.net/legacy/search?categories=${category}&search=${searchText}`)
        // console.log(request)
    }, [category, searchText])



    const getRequest = (url: string) => {
        axios.get<DataI>(`${url}`)
            .then(response => {
                console.log(response.data)
                const arr = response.data[category];
                setData(arr)
                console.log(data)
            })
    }


    // const items = data.map((item, index) => {
    //     <li key={item} className="item">
    //         <div className="line">{item.toString()}</div>
    //         <div className="line">{index}</div>
    //     </li>
    // })
    const listItems = data.map((number, index) =>
        <li className="item" key={number.toString()}>
            <div className="line">{index}</div>
            <div className="line lineActive">{number.toString()}</div>

            {/* {number} */}
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

                    {/* {number} */}
                </li>
                {listItems}
            </ul>
        </div>
    );
}
