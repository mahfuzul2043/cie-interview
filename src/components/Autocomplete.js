import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HttpClient from "../HttpClient";
import { selectActor } from "../redux/actions";

export default function Autocomplete() {
    const actors = useSelector(state => state.actors);
    const [timeoutId, setTimeoutId] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hideDropdown, setHideDropdown] = useState(true);
    const dispatch = useDispatch();
    const client = new HttpClient(process.env.REACT_APP_TMDB_API_URL, process.env.REACT_APP_TMDB_API_KEY);

    const inputChanged = e => {
        if (setTimeoutId) {
            clearTimeout(timeoutId);
        }

        if (e.target.value) {
            const id = setTimeout(async () => {
                setLoading(true);
                try {
                    const response = await client.get(`search/person?query=${e.target.value}`)
                    setLoading(false);
                    setData(response);
                } catch (e) {
                    setLoading(false);
                    console.log(e);
                }
            }, 500);
            setTimeoutId(id);
        }
    }

    const actorClicked = async actor => {
        if (actors.findIndex(item => item.id === actor.id) > -1) return;
        setLoading(true);
        try {
            const response = await client.get(`person/${actor.id}?append_to_response=images,movie_credits`);
            dispatch(selectActor(response));
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const mapDropdownItems = entry => <div onClick={() => actorClicked(entry)} key={entry.id} className='dropdown-item'>{entry.name}</div>

    return (
        <div style={{ position: 'relative' }}>
            <input onFocus={() => setHideDropdown(false)} onChange={inputChanged} placeholder="ENTER ACTOR'S NAME..." />
            <br />
            {loading && <div style={{ textAlign: 'center' }}>Loading...</div>}
            {!hideDropdown && !loading && (
                <div className='dropdown-container'>
                    {data?.results.length > 10 && data.results.slice(10).map(mapDropdownItems)}
                    {data?.results.length < 11 && data.results.length > 0 && data.results.map(mapDropdownItems)}
                    {data?.results.length > 0 && <div onClick={() => setHideDropdown(true)} className='collapse-dropdown'>^Collapse^</div>}
                </div>
            )}

        </div >
    )
}