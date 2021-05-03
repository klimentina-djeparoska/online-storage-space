import React from 'react';

const Footer = () => {

    const footerStyle = {
        width: '100%',
        height: '100px',
        borderTop: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <footer style={footerStyle}>
            Powered by <b style={{marginLeft: '5px'}}>Online Storage Space</b>
        </footer>
    );
};

export default Footer;
