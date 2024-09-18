import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import notFoundImage from '../../assets/images/notfound.png';


const NotFound = () => {
    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-md-12">
                    <img
                        src={notFoundImage}
                        alt="Not Found"
                        className="img-fluid mb-4"
                        style={{ width: '60%' }}
                    />
                    <h1 className="display-1 text-danger">404</h1>
                    <h2>Page Not Found</h2>
                    <p>Sorry, we couldn't find the page you're looking for.</p>
                    <a href="/" className="btn btn-primary">Go Back Home</a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
