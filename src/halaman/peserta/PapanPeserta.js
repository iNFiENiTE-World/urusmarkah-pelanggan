import { useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function PapanPeserta () {

    const { pertandingan, peserta: _idp } = useParams()

    const { peserta } = useFetchProtected(`http://localhost:5000/api/v1/peserta/${pertandingan}/peserta/${_idp}`, {});
    const { _id, namaPenuh, namaAkaun } = peserta || '';

    return (
        <>
        <h2>{namaPenuh}</h2>
        <h4>{namaAkaun}</h4>
        <h6>#{_id}</h6>
        </>
    )
}