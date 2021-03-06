import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import './Pertandingan.css'
import formatTarikh from "../../util/formatTarikh";
import statusPertandingan from "../../util/statusPertandingan";
import { useEffect, useState } from "react";
import fetchLifecycle from '../../util/fetchLifecycle'

export default function SenaraiPertandingan () {

    const [ query, setQuery ] = useState('');
    const [ pertandingan, setPertandingan ] = useState([])

    const nav = useNavigate()
    
    useEffect(() => {
        const refetch = async () => {
            const maklumat = await fetchLifecycle(nav, `http://localhost:5000/api/v1/pertandingan?nama=${query}`, {});

            setPertandingan(maklumat)
        }

        refetch()
    }, [nav, query])

    return (
        <>
        <span style={{ display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'left'}}>
            <div className="w3-margin" style={{
                width: '100%'
            }}>
                <span style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <FontAwesomeIcon icon={faSearch} color='gray' size='xl' style={{
                    position: 'relative',
                    top: '8px'
                }} />
                <input type={'text'} placeholder='Carian Pertandingan' className="w3-border-dark-gray w3-round w3-animate-input w3-input w3-border w3-text-deep-orange" style={{
                width: '33.5%',
                position: 'relative',
                left: '12px'
            }} onChange={(e) => setQuery(e.target.value)} />
                </span>
            </div>
            <label />
            <Link className='w3-margin w3-large' to='cipta'>
                <button className='w3-btn w3-deep-orange w3-round-medium w3-serif'>
                <FontAwesomeIcon icon={faPlusCircle} size='xl' style={{ marginRight: '6px'}} />
                    Anjur Pertandingan
                </button>
            </Link>
        </span>
        <div className='grid-container w3-margin w3-serif'>
        { (pertandingan && pertandingan.map((p) => (
            <div className='w3-large grid-item w3-center w3-round-jumbo w3-deep-orange w3-round-xlarge'>
                <Link to={p._id} style={{
                    textDecoration: 'none'
                }}><h2 className="w3-deep-orange w3-xxlarge" style={{
                    fontFamily: 'BlackJack'
                }}>{p.nama}</h2></Link>
                <div className="w3-large">
                <label className="w3-large w3-left w3-serif">
                    Dicipta pada: {formatTarikh(p.tarikhMasa.cipta)}
                    </label>
                    <br />
                <label className="w3-large w3-medium w3-left w3-serif">Bil. Peserta: {p.bilPeserta}</label>
                <br />
                <label className="w3-large w3-medium w3-left w3-serif"> Status: { statusPertandingan(p.status)}</label>

                <br />
                </div>
            </div>
        ))) || 'Loading'}
        </div>
        </>
    )
}