import Actions from '../Actions';
import useGlobal from '../store';

const React = require('react');
const { useState, useEffect, useRef } = require("react");

function Profile() {
    const [profile, setProfile] = useState();
    const [error, setError] = useState();
    const [globalState] = useGlobal();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        !profile && Actions.getProfile(globalState.security.accessToken).then(
            ({data}) => componentIsMounted.current && setProfile(data),
            error => setError(error.message),
        );
        return () => {
            componentIsMounted.current = false;
        }
    }, [profile, globalState.security.accessToken])
    
    if (error) {
        return (
            <div className="alert alert-danger">{error}</div>
        )
    }
    if (profile) return (
        <div className="jumbotron">
            <h1>Profile</h1>
            <table className="table">
                <tr>
                    <th>Username</th>
                    <td>{profile.user.username}</td>
                </tr>
                <tr>
                    <th>ID</th>
                    <td>{profile.user.id}</td>
                </tr>
                <tr>
                    <th>Client</th>
                    <td>{profile.client.name}</td>
                </tr>
            </table>
        </div>
    )
    return (
        <div className="alert alert-info">Loading...</div>
    )
}

export default Profile;
