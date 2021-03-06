import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Navigation from '../Navigation/Navigation';
import { UserContext } from '../../context/contexts/UserContext';

const Footer = () => {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const getCopyrightYears = () => {
        return `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`;
    };

    return (
        <div>
            {user.loggedIn && <Navigation />}
            <footer
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    backgroundColor: '#5f27cd',
                    color: '#fff',
                    padding: '5px 30px'
                }}>
                <div>
                    <Typography
                        variant="h2"
                        style={{ fontFamily: "'Amatic SC', cursive", fontSize: '5em' }}>
                        Dewey
                    </Typography>
                </div>
                <div>
                    <img
                        src={require('../../assets/images/dewey_sick.png')}
                        height="50"
                        width="50"
                        className="dewey"
                        alt="writing dino"
                    />
                    <div style={{ display: 'inline-block' }}>
                        <Typography variant="body2" display="block" gutterBottom>
                            The boring legal stuff...not even Dewey enjoys this...
                        </Typography>
                        <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{ color: 'rgba(255,255,255,0.7' }}>
                            Icons made by <em>Freepik</em> from{' '}
                            <a
                                style={{ color: 'rgba(255,255,255,0.7' }}
                                href="https://www.flaticon.com">
                                www.flaticon.com
                            </a>
                            .
                        </Typography>
                        <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{ color: 'rgba(255,255,255,0.7' }}>
                            &copy; {getCopyrightYears()} | Terrence Mahnken, Pete Wanca, Alec Down.
                            All Rights Reserved.
                        </Typography>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
